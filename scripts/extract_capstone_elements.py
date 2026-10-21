import os
from PIL import Image, ImageEnhance

src_path = r"C:\Users\mambo\.gemini\antigravity\brain\92fa0095-08f7-4e9b-ba70-b523ede8d20c\.user_uploaded\media_1792574601476_664d8df0.png"
out_dir = r"c:\Users\mambo\OneDrive - University of Pretoria\Rekula Website\public\assets"
os.makedirs(out_dir, exist_ok=True)

im = Image.open(src_path).convert("RGBA")
w, h = im.size
pixels = im.load()

# Enhancement for clarity, sharpness, and rich color
def enhance_clarity(img):
    enh_col = ImageEnhance.Color(img)
    img = enh_col.enhance(1.08)
    enh_con = ImageEnhance.Contrast(img)
    img = enh_con.enhance(1.06)
    enh_sharp = ImageEnhance.Sharpness(img)
    img = enh_sharp.enhance(1.18)
    return img

# 1. Pure Cap Extraction
# Mathematically proven clean boundary: (y < 350) or (y < 390 and x >= 330)
cap_im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
cap_px = cap_im.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a > 0:
            is_cap = (y < 350) or (y < 390 and x >= 330)
            if is_cap:
                cap_px[x, y] = (r, g, b, a)

cap_pts = [(x, y) for y in range(h) for x in range(w) if cap_px[x, y][3] > 10]
min_x, max_x = min(p[0] for p in cap_pts), max(p[0] for p in cap_pts)
min_y, max_y = min(p[1] for p in cap_pts), max(p[1] for p in cap_pts)

# Crop with clean padding
cap_cropped = cap_im.crop((min_x - 4, min_y - 4, max_x + 5, max_y + 5))
cap_final = enhance_clarity(cap_cropped)
cap_path = os.path.join(out_dir, "rekula-cap-crisp.png")
cap_final.save(cap_path, "PNG")

# 2. Pure Hand Extraction
hand_im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
hand_px = hand_im.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a > 0:
            is_cap = (y < 350) or (y < 390 and x >= 330)
            if not is_cap:
                # Soft taper on the far-right wrist edge so it dissolves into darkroom void
                wrist_fade = 1.0
                if x > w - 45:
                    wrist_fade = max(0.0, (w - x) / 45.0)
                    wrist_fade = wrist_fade * wrist_fade * (3 - 2 * wrist_fade)
                hand_px[x, y] = (r, g, b, int(a * wrist_fade))

hand_pts = [(x, y) for y in range(h) for x in range(w) if hand_px[x, y][3] > 10]
h_min_x, h_max_x = min(p[0] for p in hand_pts), max(p[0] for p in hand_pts)
h_min_y, h_max_y = min(p[1] for p in hand_pts), max(p[1] for p in hand_pts)

hand_cropped = hand_im.crop((h_min_x - 4, h_min_y - 4, h_max_x + 5, h_max_y + 5))
hand_final = enhance_clarity(hand_cropped)
hand_path = os.path.join(out_dir, "rekula-hand-crisp.png")
hand_final.save(hand_path, "PNG")

print(f"Extracted Cap saved: {cap_path} (size: {cap_final.size})")
print(f"Extracted Hand saved: {hand_path} (size: {hand_final.size})")
