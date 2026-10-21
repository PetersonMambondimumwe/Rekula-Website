import os
from PIL import Image, ImageOps, ImageFilter

user_dir = r"C:\Users\mambo\.gemini\antigravity\brain\92fa0095-08f7-4e9b-ba70-b523ede8d20c\.user_uploaded"
logo_src = os.path.join(user_dir, "media_1792597948929_ea27e46d.png")
founder_src = os.path.join(user_dir, "media_1792597949239_17960eda.png")

out_dir = r"c:\Users\mambo\OneDrive - University of Pretoria\Rekula Website\public\assets"
os.makedirs(out_dir, exist_ok=True)

# ─────────────────────────────────────────────────────────────
# 1. PROCESS BUSINESS LOGO
# ─────────────────────────────────────────────────────────────
logo_im = Image.open(logo_src).convert("RGBA")
# Save original high-res logo with white background
logo_im.save(os.path.join(out_dir, "rekula-logo-original.png"), "PNG")

# Create clean transparent version of the logo
# The background is white (r > 240, g > 240, b > 240)
lw, lh = logo_im.size
l_pixels = logo_im.load()
trans_logo = Image.new("RGBA", (lw, lh), (0, 0, 0, 0))
t_pixels = trans_logo.load()

for y in range(lh):
    for x in range(lw):
        r, g, b, a = l_pixels[x, y]
        # Calculate darkness relative to white
        brightness = (r + g + b) / 3.0
        if brightness > 248:
            alpha = 0
        elif brightness > 220:
            alpha = int((248 - brightness) / 28.0 * 255)
        else:
            alpha = 255
        
        if alpha > 0:
            t_pixels[x, y] = (r, g, b, alpha)

trans_logo.save(os.path.join(out_dir, "rekula-logo.png"), "PNG")
trans_logo.save(os.path.join(out_dir, "rekula-logo-transparent.png"), "PNG")

# Also create an inverted / cream version for dark backgrounds
cream_logo = Image.new("RGBA", (lw, lh), (0, 0, 0, 0))
c_pixels = cream_logo.load()
for y in range(lh):
    for x in range(lw):
        r, g, b, a = t_pixels[x, y]
        if a > 0:
            # Check if this pixel is the soft blue colon/leaf or navy text
            # Navy is around (20, 40, 70), soft blue is around (80, 140, 180)
            if b > r + 30 and g > r + 15:
                # Keep soft blue accent
                c_pixels[x, y] = (120, 180, 215, a)
            else:
                # Convert dark navy to warm cream (#F3EADB -> 243, 234, 219)
                c_pixels[x, y] = (243, 234, 219, a)

cream_logo.save(os.path.join(out_dir, "rekula-logo-cream.png"), "PNG")

# Also create a circle badge version with dark background
badge_logo = Image.new("RGBA", (lw, lh), (0, 0, 0, 0))
b_ctx_pixels = badge_logo.load()
# Draw circular dark background
for y in range(lh):
    for x in range(lw):
        dx = x - lw / 2
        dy = y - lh / 2
        dist = (dx*dx + dy*dy) ** 0.5
        if dist <= lw / 2 - 4:
            b_ctx_pixels[x, y] = (17, 29, 42, 255) # surface color #111D2A
        elif dist <= lw / 2:
            fade = (lw / 2 - dist) / 4.0
            b_ctx_pixels[x, y] = (17, 29, 42, int(255 * fade))

# Composite cream logo onto badge
badge_logo = Image.alpha_composite(badge_logo, cream_logo)
badge_logo.save(os.path.join(out_dir, "rekula-logo-badge.png"), "PNG")
print("Logos processed successfully!")

# ─────────────────────────────────────────────────────────────
# 2. PROCESS FOUNDER PORTRAIT
# ─────────────────────────────────────────────────────────────
founder_im = Image.open(founder_src).convert("RGBA")
# Save original high-res portrait
founder_im.save(os.path.join(out_dir, "shawn-maluleke-founder.png"), "PNG")
founder_im.save(os.path.join(out_dir, "shawn-maluleke.png"), "PNG")

# Also create an optimized square/circle portrait for avatar/cards
fw, fh = founder_im.size
# Crop to top 80% with center x for avatar
avatar_size = min(fw, int(fh * 0.75))
left = (fw - avatar_size) // 2
top = 40
right = left + avatar_size
bottom = top + avatar_size
avatar_im = founder_im.crop((left, top, right, bottom))
avatar_im = avatar_im.resize((600, 600), Image.Resampling.LANCZOS)
avatar_im.save(os.path.join(out_dir, "shawn-maluleke-avatar.png"), "PNG")
print("Founder portraits processed successfully!")
