#!/usr/bin/env python3
"""
Script to remove backgrounds from images using Pillow.
Uses color-based masking to remove backgrounds.
"""

import os
from pathlib import Path
from PIL import Image
import numpy as np
import sys

def remove_background_pillow(input_path, output_path=None, threshold=30):
    """
    Remove background from an image using color-based masking.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output (defaults to overwrite input)
        threshold: Color difference threshold for background detection
    """
    if output_path is None:
        output_path = input_path
    
    print(f"Processing: {input_path}")
    
    try:
        # Open image and convert to RGBA
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # Convert to numpy array
        data = np.array(img)
        
        # Get the corner pixels as background color samples
        # Sample from all four corners
        h, w = data.shape[:2]
        corners = [
            data[0, 0],           # top-left
            data[0, w-1],         # top-right
            data[h-1, 0],         # bottom-left
            data[h-1, w-1],       # bottom-right
        ]
        
        # Use the most common corner color as background
        # Or average the corners
        bg_color = np.mean(corners, axis=0).astype(np.uint8)
        
        print(f"  Detected background color: RGB({bg_color[0]}, {bg_color[1]}, {bg_color[2]})")
        
        # Create mask: pixels similar to background become transparent
        # Calculate distance from background color
        diff = np.abs(data[:, :, :3].astype(np.int16) - bg_color[:3].astype(np.int16))
        distance = np.sqrt(np.sum(diff ** 2, axis=2))
        
        # Create alpha channel: 0 (transparent) for background, 255 (opaque) for foreground
        alpha = np.where(distance < threshold, 0, 255).astype(np.uint8)
        
        # Apply alpha channel
        data[:, :, 3] = alpha
        
        # Create new image with transparency
        result = Image.fromarray(data, "RGBA")
        
        # Convert to RGB if original was JPEG, but save as PNG to preserve transparency
        if input_path.suffix.lower() in ['.jpg', '.jpeg']:
            # Save as PNG to preserve transparency
            output_path = output_path.with_suffix('.png')
            print(f"  Note: Converting to PNG format to preserve transparency")
        
        result.save(output_path, "PNG")
        print(f"  ✓ Saved to: {output_path}")
        return True
        
    except Exception as e:
        print(f"  ✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def remove_background_advanced(input_path, output_path=None):
    """
    Advanced background removal using edge detection and flood fill.
    """
    if output_path is None:
        output_path = input_path
    
    print(f"Processing (advanced): {input_path}")
    
    try:
        from PIL import Image, ImageFilter, ImageChops
        
        # Open image
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # Create a mask starting from corners
        mask = Image.new("L", img.size, 255)
        
        # Sample corner colors
        corners = [
            img.getpixel((0, 0)),
            img.getpixel((img.width-1, 0)),
            img.getpixel((0, img.height-1)),
            img.getpixel((img.width-1, img.height-1)),
        ]
        
        # Average corner color
        bg_r = int(sum(c[0] for c in corners) / len(corners))
        bg_g = int(sum(c[1] for c in corners) / len(corners))
        bg_b = int(sum(c[2] for c in corners) / len(corners))
        
        print(f"  Detected background color: RGB({bg_r}, {bg_g}, {bg_b})")
        
        # Create mask by comparing pixels to background
        threshold = 40
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = img.getpixel((x, y))
                dist = ((r - bg_r) ** 2 + (g - bg_g) ** 2 + (b - bg_b) ** 2) ** 0.5
                if dist < threshold:
                    mask.putpixel((x, y), 0)
        
        # Apply some smoothing to the mask
        mask = mask.filter(ImageFilter.MedianFilter(size=3))
        
        # Apply mask as alpha channel
        img.putalpha(mask)
        
        # Save
        if input_path.suffix.lower() in ['.jpg', '.jpeg']:
            output_path = output_path.with_suffix('.png')
        
        img.save(output_path, "PNG")
        print(f"  ✓ Saved to: {output_path}")
        return True
        
    except Exception as e:
        print(f"  ✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    # Get the script directory
    script_dir = Path(__file__).parent
    public_dir = script_dir / "public"
    
    # Images to process
    images = [
        public_dir / "me_2024.jpeg",
        public_dir / "me_2022.jpeg",
    ]
    
    print("Background Removal Script (using Pillow)")
    print("=" * 50)
    
    # Check if PIL is available
    try:
        from PIL import Image
        import numpy as np
    except ImportError as e:
        print(f"ERROR: Required library not installed: {e}")
        print("\nPlease install Pillow and numpy:")
        print("  pip install Pillow numpy")
        sys.exit(1)
    
    # Process each image
    success_count = 0
    for image_path in images:
        if not image_path.exists():
            print(f"✗ File not found: {image_path}")
            continue
        
        # Try advanced method first, fallback to simple method
        if remove_background_advanced(image_path):
            success_count += 1
        elif remove_background_pillow(image_path, threshold=40):
            success_count += 1
    
    print("=" * 50)
    print(f"Processed {success_count}/{len(images)} images successfully.")
    
    if success_count == len(images):
        print("\n✓ All images processed! Backgrounds removed.")
        print("Note: Images saved as PNG to preserve transparency.")
    else:
        print("\n⚠ Some images failed to process.")

if __name__ == "__main__":
    main()
