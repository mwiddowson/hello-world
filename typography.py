"""Shared text rendering for both wallpaper generators.

Apple's system font is SF Pro, whose licence does not permit redistribution, so
this bundles Inter instead - a UI face designed in the same neo-grotesque space
and the closest freely licensable stand-in. Inter ships as a variable font, so
weight and optical size are dialled in per instance rather than by vendoring
several static cuts.
"""

from pathlib import Path

from PIL import ImageFont

INTER_PATH = Path(__file__).with_name("fonts") / "InterVariable.ttf"

# Inter's axes are 'Weight' (100-900) and 'Optical size' (14-32).
FONT_WEIGHT = 600        # SemiBold - the weight Apple uses for widget stat text
FONT_OPTICAL_SIZE = 32   # the Display end, for text that appears at 48px and up

# Only reached if the vendored font is missing.
FALLBACK_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
]


def _apply_axes(font, weight, optical_size):
    """Set the variation axes by name - the font defines their order, not us."""
    wanted = {"weight": weight, "optical size": optical_size}
    try:
        values = []
        for axis in font.get_variation_axes():
            name = axis["name"]
            if isinstance(name, bytes):
                name = name.decode("utf-8", "replace")
            values.append(wanted.get(name.strip().lower(), axis["default"]))
        font.set_variation_by_axes(values)
    except (AttributeError, OSError):
        # FreeType built without variable-font support still renders the default
        # instance, so a lighter weight is preferable to failing the build.
        pass


def load_font(size, weight=FONT_WEIGHT, optical_size=FONT_OPTICAL_SIZE):
    """Inter at the given weight and optical size, or a system sans if missing.

    `size` is the rasterisation size in pixels, which the generators pass already
    multiplied by their supersample factor. `optical_size` is deliberately
    independent of it: it describes how large the text finally *appears*.
    """
    try:
        font = ImageFont.truetype(str(INTER_PATH), size)
    except (OSError, IOError):
        for path in FALLBACK_PATHS:
            try:
                return ImageFont.truetype(path, size)
            except (OSError, IOError):
                continue
        return ImageFont.load_default()

    _apply_axes(font, weight, optical_size)
    return font
