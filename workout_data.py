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


def count_weeks_off(today, workout_dates):
    """Count completed Mon-Sun weeks this year that contain no workout.

    Weeks are matched by date containment rather than ISO week numbers, which
    would assign turn-of-year days to the neighbouring ISO year. The week
    currently in progress is excluded — it can still earn a workout.
    """
    completed = {date for date in workout_dates if date <= today}
    jan_first = datetime.date(today.year, 1, 1)
    monday = jan_first - datetime.timedelta(days=jan_first.weekday())
    current_monday = today - datetime.timedelta(days=today.weekday())

    weeks_off = 0
    while monday < current_monday:
        sunday = monday + datetime.timedelta(days=6)
        if not any(monday <= date <= sunday for date in completed):
            weeks_off += 1
        monday += datetime.timedelta(days=7)
    return weeks_off


def workout_summary(today, workout_dates):
    """Return completed workout dates for today\'s year/month and weeks off."""
    completed = {date for date in workout_dates if date <= today}
    year_dates = {date for date in completed if date.year == today.year}
    month_dates = {
        date
        for date in year_dates
        if date.month == today.month
    }
    return year_dates, month_dates, count_weeks_off(today, workout_dates)
