import calendar
import datetime
import math
import os
from PIL import Image, ImageDraw, ImageFont

from workout_data import load_workout_dates, workout_summary

# Canvas (iPhone 16/17 Pro native resolution)
CANVAS_WIDTH = 1206
CANVAS_HEIGHT = 2622

# Render at this multiple, then downsample - Pillow does not antialias shapes.
SUPERSAMPLE = 4

# Colors
BG_COLOR = (18, 24, 36)
DOT_PAST = (249, 249, 249)
DOT_TODAY = (168, 255, 62)
DOT_FUTURE = (50, 65, 88)
TEXT_COLOR = (0, 196, 179)
DOT_WORKOUT = (255, 122, 26)  # Vivid Orange - workout days

# Grid geometry
GRID_COLS = 8
DOT_RADIUS = 32
DOT_SPACING = 110
TODAY_RING_WIDTH = 8

# Typography and safe zones
FONT_SIZE_STATS = 60
TEXT_GAP = 50
TOP_PADDING = 40
HOME_SAFE_TOP = 177
HOME_SAFE_BOTTOM = CANVAS_HEIGHT - 380

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
]

OUTPUT_PATH = "docs/home.png"


def get_month_progress(today=None):
    today = today or datetime.date.today()
    days_in_month = calendar.monthrange(today.year, today.month)[1]
    day_of_month = today.day
    days_remaining = days_in_month - day_of_month
    pct = int(day_of_month / days_in_month * 100)
    month_label = today.strftime("%B %Y").upper()
    return today, days_in_month, day_of_month, days_remaining, pct, month_label


def load_font(size):
    for path in FONT_PATHS:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def generate_image(output_path=OUTPUT_PATH, today=None, workout_dates=None):
    today, days_in_month, day_of_month, days_remaining, pct, month_label = get_month_progress(today)
    workout_dates = workout_dates if workout_dates is not None else load_workout_dates()
    _, month_workouts, _ = workout_summary(today, workout_dates)

    rows = math.ceil(days_in_month / GRID_COLS)
    grid_w = (GRID_COLS - 1) * DOT_SPACING
    grid_h = (rows - 1) * DOT_SPACING
    origin_y = HOME_SAFE_TOP + TOP_PADDING + DOT_RADIUS
    origin_x = (CANVAS_WIDTH - grid_w) // 2
    stats_y = origin_y + grid_h + TEXT_GAP

    # Pillow's ellipse() has no antialiasing, so circles drawn straight to the
    # final canvas come out visibly stair-stepped. Draw everything oversized and
    # downsample with LANCZOS instead, which resolves those edges smoothly.
    s = SUPERSAMPLE
    radius = DOT_RADIUS * s
    img = Image.new("RGB", (CANVAS_WIDTH * s, CANVAS_HEIGHT * s), BG_COLOR)
    draw = ImageDraw.Draw(img)

    for i in range(days_in_month):
        date = datetime.date(today.year, today.month, i + 1)
        col = i % GRID_COLS
        row = i // GRID_COLS
        cx = (origin_x + col * DOT_SPACING) * s
        cy = (origin_y + row * DOT_SPACING) * s

        is_workout = date in month_workouts
        if is_workout:
            color = DOT_WORKOUT
        elif i < day_of_month - 1:
            color = DOT_PAST
        elif i == day_of_month - 1:
            color = DOT_TODAY
        else:
            color = DOT_FUTURE

        bounds = [cx - radius, cy - radius, cx + radius, cy + radius]
        draw.ellipse(bounds, fill=color)
        # Today must still read as "you are here" on days that were also workouts.
        if i == day_of_month - 1 and is_workout:
            draw.ellipse(bounds, outline=DOT_TODAY, width=TODAY_RING_WIDTH * s)

    stats_label = f"{days_remaining}d left  ·  {pct}%"
    font_stats = load_font(FONT_SIZE_STATS * s)
    bbox = draw.textbbox((0, 0), stats_label, font=font_stats)
    stats_x = (CANVAS_WIDTH * s - (bbox[2] - bbox[0])) // 2
    draw.text((stats_x, stats_y * s), stats_label, fill=TEXT_COLOR, font=font_stats)

    img = img.resize((CANVAS_WIDTH, CANVAS_HEIGHT), Image.LANCZOS)
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    img.save(output_path, "PNG")
    print(
        f"Saved {output_path}  [{month_label}, day {day_of_month}/{days_in_month}, "
        f"{len(month_workouts)} workouts]"
    )


if __name__ == "__main__":
    generate_image()
