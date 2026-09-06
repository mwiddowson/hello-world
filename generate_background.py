import datetime
import math
import os
from PIL import Image, ImageDraw

from typography import load_font
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
GRID_COLS = 20
DOT_RADIUS = 18
DOT_SPACING = 52
TODAY_RING_WIDTH = 5

# Text. FONT_SIZE 66 puts Inter's cap height at 48px, matching the "Sun 6 Sep"
# date line iOS draws above this on the lock screen (measured off a screenshot).
FONT_SIZE = 66
TEXT_GAP = 72
LINE_HEIGHT = round(FONT_SIZE * 1.42)
GRID_TOP_FRAC = 0.30

OUTPUT_PATH = "docs/background.png"


def get_year_progress(today=None):
    today = today or datetime.date.today()
    year_start = datetime.date(today.year, 1, 1)
    year_end = datetime.date(today.year, 12, 31)
    day_of_year = (today - year_start).days
    days_in_year = (year_end - year_start).days + 1
    days_remaining = days_in_year - day_of_year - 1
    pct = int((day_of_year + 1) / days_in_year * 100)
    return today, day_of_year, days_in_year, days_remaining, pct


def generate_image(output_path=OUTPUT_PATH, today=None, workout_dates=None):
    today, day_of_year, days_in_year, days_remaining, pct = get_year_progress(today)
    workout_dates = workout_dates if workout_dates is not None else load_workout_dates()
    year_workouts, _, weeks_off = workout_summary(today, workout_dates)

    rows = math.ceil(days_in_year / GRID_COLS)
    grid_w = (GRID_COLS - 1) * DOT_SPACING
    grid_h = (rows - 1) * DOT_SPACING
    origin_y = int(CANVAS_HEIGHT * GRID_TOP_FRAC)
    origin_x = (CANVAS_WIDTH - grid_w) // 2

    # Pillow's ellipse() has no antialiasing, so circles drawn straight to the
    # final canvas come out visibly stair-stepped. Draw everything oversized and
    # downsample with LANCZOS instead, which resolves those edges smoothly.
    s = SUPERSAMPLE
    radius = DOT_RADIUS * s
    img = Image.new("RGB", (CANVAS_WIDTH * s, CANVAS_HEIGHT * s), BG_COLOR)
    draw = ImageDraw.Draw(img)

    for i in range(days_in_year):
        date = datetime.date(today.year, 1, 1) + datetime.timedelta(days=i)
        col = i % GRID_COLS
        row = i // GRID_COLS
        cx = (origin_x + col * DOT_SPACING) * s
        cy = (origin_y + row * DOT_SPACING) * s

        is_workout = date in year_workouts
        if is_workout:
            color = DOT_WORKOUT
        elif i < day_of_year:
            color = DOT_PAST
        elif i == day_of_year:
            color = DOT_TODAY
        else:
            color = DOT_FUTURE

        bounds = [cx - radius, cy - radius, cx + radius, cy + radius]
        draw.ellipse(bounds, fill=color)
        # Today must still read as "you are here" on days that were also workouts.
        if i == day_of_year and is_workout:
            draw.ellipse(bounds, outline=DOT_TODAY, width=TODAY_RING_WIDTH * s)

    week_word = "week" if weeks_off == 1 else "weeks"
    lines = [
        f"{days_remaining}d left · {pct}%",
        f"{weeks_off} {week_word} off",
    ]
    font = load_font(FONT_SIZE * s)
    text_y = (origin_y + grid_h + TEXT_GAP) * s
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font)
        text_x = (CANVAS_WIDTH * s - (bbox[2] - bbox[0])) // 2
        draw.text((text_x, text_y), line, fill=TEXT_COLOR, font=font)
        text_y += LINE_HEIGHT * s

    img = img.resize((CANVAS_WIDTH, CANVAS_HEIGHT), Image.LANCZOS)
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    img.save(output_path, "PNG")
    print(
        f"Saved {output_path}  [day {day_of_year + 1}/{days_in_year}, "
        f"{len(year_workouts)} workouts, {weeks_off} {week_word} off]"
    )


if __name__ == "__main__":
    generate_image()
