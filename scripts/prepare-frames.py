"""Re-export the source JPG frames to public/portrait-frames/{lg,md}.
Usage: python scripts/prepare-frames.py <dir-with-ezgif-frame-*.jpg>
Frames are ordered by filename; adjacent-frame differences were checked to be smooth.
"""
import glob, os, sys
from PIL import Image

src = sys.argv[1]
files = sorted(glob.glob(os.path.join(src, "*.jpg")))
for tier, width, quality in (("lg", 1600, 80), ("md", 1200, 76)):
    out = os.path.join("public", "portrait-frames", tier)
    os.makedirs(out, exist_ok=True)
    for i, f in enumerate(files, 1):
        im = Image.open(f).convert("RGB")
        im = im.resize((width, round(width * im.height / im.width)), Image.LANCZOS)
        im.save(os.path.join(out, f"frame-{i:04d}.webp"), "WEBP", quality=quality, method=4)
