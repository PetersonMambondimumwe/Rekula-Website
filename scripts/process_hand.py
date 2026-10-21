import os
from PIL import Image, ImageFilter, ImageOps, ImageEnhance

src_path = r"C:\Users\mambo\.gemini\antigravity\brain\92fa0095-08f7-4e9b-ba70-b523ede8d20c\.user_uploaded\media_1792573448802_616b1382.png"
out_dir = r"c:\Users\mambo\OneDrive - University of Pretoria\Rekula Website\public\assets"
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "rekula-hand-real.png")

# Load original stock image
im = Image.open(src_path).convert("RGBA")
w, h = im.size
pixels = im.load()

# Step 1: Wipe the watermark area (y >= 208) completely
for y in range(208, h):
    for x in range(w):
        pixels[x, y] = (255, 255, 255, 255)

# Step 2: Extract solid skin mask
# Skin pixels have r > 40, g > 20, and are distinctly not white background
solid_mask = Image.new("L", (w, h), 0)
solid_mask_px = solid_mask.load()

for y in range(h):
    for x in range(w):
        r, g, b, _ = pixels[x, y]
        # Background is white (all channels high and near-equal)
        is_bg = (r > 218 and g > 215 and b > 210) or (min(r, g, b) > 215)
        if not is_bg and y < 208:
            solid_mask_px[x, y] = 255

# Erode by 2 pixels to completely strip away any background-contaminated boundary pixels
eroded_mask = solid_mask.filter(ImageFilter.MinFilter(5))
eroded_px = eroded_mask.load()

# Create pure skin RGB image where non-skin pixels are 0
pure_skin = Image.new("RGB", (w, h), (180, 125, 95)) # default warm skin tone fallback
pure_skin_px = pure_skin.load()

for y in range(h):
    for x in range(w):
        if eroded_px[x, y] == 255:
            r, g, b, _ = pixels[x, y]
            pure_skin_px[x, y] = (r, g, b)

# Dilate pure skin RGB outward so that colors extend past the boundary
dilated_skin = pure_skin.copy()
for _ in range(6):
    dilated_skin = dilated_skin.filter(ImageFilter.BoxBlur(1))
    dilated_px = dilated_skin.load()
    for y in range(h):
        for x in range(w):
            if eroded_px[x, y] == 255:
                r, g, b, _ = pixels[x, y]
                dilated_px[x, y] = (r, g, b)

# Create smooth anti-aliased edge mask
smooth_mask = eroded_mask.filter(ImageFilter.GaussianBlur(radius=0.9))
smooth_px = smooth_mask.load()

# Final clean RGBA
clean_im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
clean_px = clean_im.load()
dilated_px = dilated_skin.load()

for y in range(h):
    for x in range(w):
        alpha = smooth_px[x, y]
        # Ignore very faint fringe
        if alpha < 8:
            continue
            
        r, g, b = dilated_px[x, y]
        
        # Soft wrist fade on the right side
        wrist_fade = 1.0
        if x > w - 45:
            wrist_fade = max(0.0, (w - x) / 45.0)
            wrist_fade = wrist_fade * wrist_fade * (3 - 2 * wrist_fade)
            
        final_alpha = int(alpha * wrist_fade)
        clean_px[x, y] = (r, g, b, final_alpha)

# Upscale 4x with Lanczos to (1304 x 1120)
hires = clean_im.resize((w * 4, h * 4), Image.Resampling.LANCZOS)

# Subtle grading to sit perfectly in the darkroom:
enh_color = ImageEnhance.Color(hires)
hires = enh_color.enhance(1.12)
enh_contrast = ImageEnhance.Contrast(hires)
hires = enh_contrast.enhance(1.05)

hires.save(out_path, "PNG")

# Composite preview
test_bg = Image.new("RGBA", hires.size, (7, 13, 20, 255))
test_comp = Image.alpha_composite(test_bg, hires)
test_comp.save(os.path.join(out_dir, "rekula-hand-preview-dark.png"), "PNG")

print("VFX-perfect matte hand successfully saved with zero white background bleed!")
