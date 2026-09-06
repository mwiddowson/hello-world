import datetime
import tempfile
import unittest
from pathlib import Path

from PIL import Image

import generate_background
import generate_home
from workout_data import count_weeks_off, load_workout_dates, workout_summary


class WorkoutDataTests(unittest.TestCase):
    def setUp(self):
        self.today = datetime.date(2026, 9, 4)
        self.dates = load_workout_dates()

    def test_2026_summary_deduplicates_and_counts_weeks_off(self):
        year_dates, month_dates, weeks_off = workout_summary(self.today, self.dates)
        self.assertEqual(len(year_dates), 43)
        self.assertEqual(month_dates, {datetime.date(2026, 9, 3)})
        self.assertEqual(weeks_off, 6)

    def test_future_workouts_are_not_counted(self):
        dates = self.dates | {datetime.date(2026, 12, 31)}
        year_dates, _, weeks_off = workout_summary(self.today, dates)
        self.assertEqual(len(year_dates), 43)
        self.assertEqual(weeks_off, 6)

    def test_weeks_off_skips_the_week_in_progress(self):
        # Thu 2026-01-01 .. Sun 2026-01-04 is the first Mon-Sun week of 2026.
        # A workout on Jan 2 makes that week active; the three whole weeks that
        # follow are empty, and the week containing `today` is still in progress.
        today = datetime.date(2026, 1, 28)  # Wednesday
        weeks_off = count_weeks_off(today, {datetime.date(2026, 1, 2)})
        self.assertEqual(weeks_off, 3)

    def test_a_single_workout_keeps_its_week_off_the_count(self):
        today = datetime.date(2026, 1, 28)
        empty = count_weeks_off(today, set())
        with_one = count_weeks_off(today, {datetime.date(2026, 1, 20)})
        self.assertEqual(empty, 4)
        self.assertEqual(with_one, 3)

    def test_generators_render_native_size_images(self):
        with tempfile.TemporaryDirectory() as directory:
            lock_path = Path(directory) / "lock.png"
            home_path = Path(directory) / "home.png"
            generate_background.generate_image(lock_path, self.today, self.dates)
            generate_home.generate_image(home_path, self.today, self.dates)
            with Image.open(lock_path) as lock_image, Image.open(home_path) as home_image:
                self.assertEqual(lock_image.size, (1206, 2622))
                self.assertEqual(home_image.size, (1206, 2622))


if __name__ == "__main__":
    unittest.main()
