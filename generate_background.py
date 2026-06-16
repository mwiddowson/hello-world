import datetime
import math
import os
from PIL import Image, ImageDraw, ImageFont

# ── Canvas ────────────────────────────────────────────────────────────────────
CANVAS_WIDTH  = 1206
CANVAS_HEIGHT = 2622

# ── Colors ────────────────────────────────────────────────────────────────────
BG_COLOR    = (18, 18, 18)      # near-black background
DOT_PAST    = (255, 255, 255)   # white  — elapsed days
DOT_TODAY   = (255, 165, 0)     # amber  — current day
DOT_FUTURE  = (50, 50, 50)      # dark gray — remaining days
TEXT_COLOR  = (180, 180, 180)   # light gray label

# ── Grid geometry ─────────────────────────────────────────────────────────────
GRID_COLS   = 20
DOT_RADIUS  = 18    # px
DOT_SPACING = 52    # center-to-center, horizontal and vertical

# ── Text ──────────────────────────────────────────────────────────────────────
FONT_SIZE   = 52

# ── Font search paths (tried in order) ────────────────────────────────────────
FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
]

OUTPUT_PATH = "docs/background.png"


def get_year_progress():
    today      = datetime.date.today()
    year_start = datetime.date(today.year, 1, 1)
    year_end   = datetime.date(today.year, 12, 31)
    day_of_year    = (today - year_start).days          # 0-indexed: Jan 1 = 0
    days_in_year   = (year_end - year_start).days + 1  # 365 or 366
    days_remaining = days_in_year - day_of_year - 1
    pct            = int((day_of_year + 1) / days_in_year * 100)
    return day_of_year, days_in_year, days_remaining, pct


def load_font(size):
    for path in FONT_PATHS:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def generate_image(output_path=OUTPUT_PATH):
    day_of_year, days_in_year, days_remaining, pct = get_year_progress()

    rows   = math.ceil(days_in_year / GRID_COLS)
    grid_w = (GRID_COLS - 1) * DOT_SPACING
    grid_h = (rows - 1) * DOT_SPACING

    origin_x = (CANVAS_WIDTH - grid_w) // 2
    origin_y = int(CANVAS_HEIGHT * 0.12)

    img  = Image.new("RGB", (CANVAS_WIDTH, CANVAS_HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    for i in range(days_in_year):
        col = i % GRID_COLS
        row = i // GRID_COLS
        cx  = origin_x + col * DOT_SPACING
        cy  = origin_y + row * DOT_SPACING

        if i < day_of_year:
            color = DOT_PAST
        elif i == day_of_year:
            color = DOT_TODAY
        else:
            color = DOT_FUTURE

        draw.ellipse(
            [cx - DOT_RADIUS, cy - DOT_RADIUS,
             cx + DOT_RADIUS, cy + DOT_RADIUS],
            fill=color,
        )

    label = f"{days_remaining}d left  ·  {pct}%"
    font  = load_font(FONT_SIZE)
    bbox  = draw.textbbox((0, 0), label, font=font)
    text_w = bbox[2] - bbox[0]
    text_x = (CANVAS_WIDTH - text_w) // 2
    text_y = origin_y + grid_h + 80

    draw.text((text_x, text_y), label, fill=TEXT_COLOR, font=font)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}  [day {day_of_year + 1}/{days_in_year}, {days_remaining}d left, {pct}%]")


if __name__ == "__main__":
    generate_image()
