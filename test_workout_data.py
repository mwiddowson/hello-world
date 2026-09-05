import datetime
import tempfile
import unittest
from pathlib import Path

from PIL import Image

import generate_background
import generate_home
from workout_data import load_workout_dates, workout_summary


class WorkoutDataTests(unittest.TestCase):
    def setUp(self):
        self.today = datetime.date(2026, 9, 4)
        self.dates = load_workout_dates()

    def test_2026_summary_deduplicates_and_uses_elapsed_days(self):
        year_dates, month_dates, pct = workout_summary(self.today, self.dates)
        self.assertEqual(len(year_dates), 43)
        self.assertEqual(month_dates, {datetime.date(2026, 9, 3)})
        self.assertEqual(pct, 17)

    def test_future_workouts_are_not_counted(self):
        dates = self.dates | {datetime.date(2026, 12, 31)}
        year_dates, _, pct = workout_summary(self.today, dates)
        self.assertEqual(len(year_dates), 43)
        self.assertEqual(pct, 17)

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
