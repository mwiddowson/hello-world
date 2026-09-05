import csv
import datetime
from pathlib import Path


WORKOUT_DATA_PATH = Path(__file__).with_name("workout_dates.csv")


def load_workout_dates(path=WORKOUT_DATA_PATH):
    """Load and de-duplicate workout dates from a small CSV file."""
    dates = set()
    with open(path, newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            return dates

        date_column = next(
            (
                name
                for name in ("date", "Date", "Date (yyyy/mm/dd)")
                if name in reader.fieldnames
            ),
            reader.fieldnames[0],
        )
        for row in reader:
            value = (row.get(date_column) or "").strip()
            if not value:
                continue
            dates.add(datetime.datetime.strptime(value, "%Y/%m/%d").date())
    return dates


def workout_summary(today, workout_dates):
    """Return completed workout dates for today\'s year/month and YTD rate."""
    completed = {date for date in workout_dates if date <= today}
    year_dates = {date for date in completed if date.year == today.year}
    month_dates = {
        date
        for date in year_dates
        if date.month == today.month
    }
    elapsed_days = today.timetuple().tm_yday
    workout_pct = round(len(year_dates) / elapsed_days * 100) if elapsed_days else 0
    return year_dates, month_dates, workout_pct


def draw_workout_tick(draw, cx, cy, radius, color, outline_color):
    """Draw a compact, legible check mark centred on a progress dot."""
    points = [
        (cx - int(radius * 0.52), cy),
        (cx - int(radius * 0.12), cy + int(radius * 0.42)),
        (cx + int(radius * 0.60), cy - int(radius * 0.42)),
    ]
    width = max(3, radius // 4)
    draw.line(points, fill=outline_color, width=width + 4, joint="curve")
    draw.line(points, fill=color, width=width, joint="curve")
