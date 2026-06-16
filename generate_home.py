import calendar
import datetime
import math
import os
from PIL import Image, ImageDraw, ImageFont

# ── Canvas (iPhone 16/17 Pro native resolution) ───────────────────────────────
CANVAS_WIDTH  = 1206
CANVAS_HEIGHT = 2622

# ── Colors ────────────────────────────────────────────────────────────────────
BG_COLOR    = (18, 24, 36)      # Deep Charcoal   #121824
DOT_PAST    = (249, 249, 249)   # Off-White        #F9F9F9
DOT_TODAY   = (168, 255, 62)    # Bright Lime      #A8FF3E  (the spark)
DOT_FUTURE  = (50, 65, 88)      # dark blue-gray   (charcoal palette)
TEXT_COLOR  = (0, 196, 179)     # Vibrant Teal     #00C4B3

# ── Grid geometry (large dots — ~30 dots vs 365 in the yearly version) ────────
GRID_COLS   = 8      # wider, flatter grid — always 4 rows, no orphan dot row
DOT_RADIUS  = 32     # px
DOT_SPACING = 110    # center-to-center → 46px gap between dot edges
# grid_w = 7 × 110 = 770px → origin_x = (1206 − 770) // 2 = 218px

# ── Typography ────────────────────────────────────────────────────────────────
FONT_SIZE_MONTH = 60   # "JUNE 2026" header above grid
FONT_SIZE_STATS = 60   # "14d left  ·  53%" label below grid
HEADER_GAP      = 44   # px: month text baseline → first dot row centre
TEXT_GAP        = 50   # px: last dot row centre → stats text baseline

# ── Home-screen safe zones ────────────────────────────────────────────────────
# TOP:    status bar only (no lock-screen clock) — 59pt × 3× = 177px
# BOTTOM: dock + home indicator — ~380px from bottom
HOME_SAFE_TOP    = 177
HOME_SAFE_BOTTOM = CANVAS_HEIGHT - 380   # = 2242px

# ── Font search paths (tried in order) ────────────────────────────────────────
FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
]

OUTPUT_PATH = "docs/home.png"


def get_month_progress():
    today          = datetime.date.today()
    days_in_month  = calendar.monthrange(today.year, today.month)[1]
    day_of_month   = today.day                       # 1-indexed
    days_remaining = days_in_month - day_of_month   # excludes today
    pct            = int(day_of_month / days_in_month * 100)
    month_label    = today.strftime("%B %Y").upper()  # "JUNE 2026"
    return today, days_in_month, day_of_month, days_remaining, pct, month_label


def load_font(size):
    for path in FONT_PATHS:
        try:
            return ImageFont.truetype(path, size)
        except (OSError, IOError):
            continue
    return ImageFont.load_default()


def generate_image(output_path=OUTPUT_PATH):
    _, days_in_month, day_of_month, days_remaining, pct, month_label = get_month_progress()

    rows   = math.ceil(days_in_month / GRID_COLS)
    grid_w = (GRID_COLS - 1) * DOT_SPACING   # always 684px
    grid_h = (rows - 1)      * DOT_SPACING   # 456px (5 rows) or 342px (4 rows, Feb)

    # Pin content block to top of icon area (below status bar only)
    block_top = HOME_SAFE_TOP + 20

    header_y  = block_top
    origin_y  = block_top + FONT_SIZE_MONTH + HEADER_GAP
    origin_x  = (CANVAS_WIDTH - grid_w) // 2   # = 261px
    stats_y   = origin_y + grid_h + TEXT_GAP

    img  = Image.new("RGB", (CANVAS_WIDTH, CANVAS_HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)

    # Month name header
    font_month = load_font(FONT_SIZE_MONTH)
    bbox       = draw.textbbox((0, 0), month_label, font=font_month)
    header_x   = (CANVAS_WIDTH - (bbox[2] - bbox[0])) // 2
    draw.text((header_x, header_y), month_label, fill=TEXT_COLOR, font=font_month)

    # Dot grid
    for i in range(days_in_month):
        col = i % GRID_COLS
        row = i // GRID_COLS
        cx  = origin_x + col * DOT_SPACING
        cy  = origin_y + row * DOT_SPACING

        if i < day_of_month - 1:       # days before today
            color = DOT_PAST
        elif i == day_of_month - 1:    # today (convert 1-indexed to 0-indexed)
            color = DOT_TODAY
        else:                          # remaining days
            color = DOT_FUTURE

        draw.ellipse(
            [cx - DOT_RADIUS, cy - DOT_RADIUS,
             cx + DOT_RADIUS, cy + DOT_RADIUS],
            fill=color,
        )

    # Stats label
    stats_label = f"{days_remaining}d left  ·  {pct}%"
    font_stats  = load_font(FONT_SIZE_STATS)
    bbox        = draw.textbbox((0, 0), stats_label, font=font_stats)
    stats_x     = (CANVAS_WIDTH - (bbox[2] - bbox[0])) // 2
    draw.text((stats_x, stats_y), stats_label, fill=TEXT_COLOR, font=font_stats)

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    img.save(output_path, "PNG")
    print(
        f"Saved {output_path}  [{month_label}, day {day_of_month}/{days_in_month}, "
        f"{days_remaining}d left, {pct}%]  "
        f"grid_y={origin_y}–{origin_y + grid_h}  stats_y={stats_y}"
    )


if __name__ == "__main__":
    generate_image()
