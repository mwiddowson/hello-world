import datetime
import math
import os
from PIL import Image, ImageDraw, ImageFont

from workout_data import draw_workout_tick, load_workout_dates, workout_summary

# Canvas (iPhone 16/17 Pro native resolution)
CANVAS_WIDTH = 1206
CANVAS_HEIGHT = 2622

# Colors
BG_COLOR = (18, 24, 36)
DOT_PAST = (249, 249, 249)
DOT_TODAY = (168, 255, 62)
DOT_FUTURE = (50, 65, 88)
TEXT_COLOR = (0, 196, 179)
WORKOUT_TICK = DOT_TODAY

# Grid geometry
GRID_COLS = 20
DOT_RADIUS = 18
DOT_SPACING = 52

# Text
FONT_SIZE = 48
TEXT_GAP = 72
GRID_TOP_FRAC = 0.30

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
]

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


def load_font(size):
    for path in FONT_PATHS:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def generate_image(output_path=OUTPUT_PATH, today=None, workout_dates=None):
    today, day_of_year, days_in_year, days_remaining, pct = get_year_progress(today)
    workout_dates = workout_dates if workout_dates is not None else load_workout_dates()
    year_workouts, _, workout_pct = workout_summary(today, workout_dates)

    rows = math.ceil(days_in_year / GRID_COLS)
    grid_w = (GRID_COLS - 1) * DOT_SPACING
    grid_h = (rows - 1) * DOT_SPACING
    origin_y = int(CANVAS_HEIGHT * GRID_TOP_FRAC)
    origin_x = (CANVAS_WIDTH - grid_w) // 2

    img = Image.new("RGB", (CANVAS_WIDTH, CANVAS_HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    for i in range(days_in_year):
        date = datetime.date(today.year, 1, 1) + datetime.timedelta(days=i)
        col = i % GRID_COLS
        row = i // GRID_COLS
        cx = origin_x + col * DOT_SPACING
        cy = origin_y + row * DOT_SPACING

        if i < day_of_year:
            color = DOT_PAST
        elif i == day_of_year:
            color = DOT_TODAY
        else:
            color = DOT_FUTURE

        draw.ellipse(
            [cx - DOT_RADIUS, cy - DOT_RADIUS, cx + DOT_RADIUS, cy + DOT_RADIUS],
            fill=color,
        )
        if date in year_workouts:
            draw_workout_tick(
                draw, cx, cy, DOT_RADIUS, WORKOUT_TICK, BG_COLOR
            )

    label = f"{days_remaining}d left  ·  {pct}%  ·  {workout_pct}% workout days"
    font = load_font(FONT_SIZE)
    bbox = draw.textbbox((0, 0), label, font=font)
    text_x = (CANVAS_WIDTH - (bbox[2] - bbox[0])) // 2
    text_y = origin_y + grid_h + TEXT_GAP
    draw.text((text_x, text_y), label, fill=TEXT_COLOR, font=font)

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    img.save(output_path, "PNG")
    print(
        f"Saved {output_path}  [day {day_of_year + 1}/{days_in_year}, "
        f"{len(year_workouts)} workouts, {workout_pct}% workout days]"
    )


if __name__ == "__main__":
    generate_image()
