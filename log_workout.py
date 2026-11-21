"""Record a gym session in workout_dates.csv.

Usage:
    python log_workout.py            # today
    python log_workout.py 2026/11/20 # a specific day

Re-running for a date already logged is a no-op, so this is safe to repeat.
"""

import datetime
import sys

from workout_data import WORKOUT_DATA_PATH, load_workout_dates

DATE_FORMAT = "%Y/%m/%d"
HEADER = "date"


def parse_date(value):
    """Parse YYYY/MM/DD, raising ValueError on anything else."""
    return datetime.datetime.strptime(value.strip(), DATE_FORMAT).date()


def log_workout(value=None, path=WORKOUT_DATA_PATH, today=None):
    """Add one date to the log. Returns (date, added) - added is False if already there."""
    today = today or datetime.date.today()
    date = parse_date(value) if value and value.strip() else today
    if date > today:
        raise ValueError(f"{date:{DATE_FORMAT}} is in the future")

    dates = load_workout_dates(path)
    if date in dates:
        return date, False

    dates.add(date)
    # Rewritten sorted rather than appended, so a back-filled date lands in order.
    lines = [HEADER] + [d.strftime(DATE_FORMAT) for d in sorted(dates)]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return date, True


def main(argv):
    try:
        date, added = log_workout(argv[1] if len(argv) > 1 else None)
    except ValueError as error:
        print(f"Not logged: {error}", file=sys.stderr)
        return 1
    stamp = date.strftime(DATE_FORMAT)
    print(f"Logged {stamp}" if added else f"{stamp} was already logged")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
