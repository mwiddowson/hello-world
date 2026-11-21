import datetime
import tempfile
import unittest
from pathlib import Path

from PIL import Image

import generate_background
import generate_home
from log_workout import log_workout
from typography import FONT_WEIGHT, load_font
from workout_data import count_weeks_off, load_workout_dates, workout_summary


class LogWorkoutTests(unittest.TestCase):
    def setUp(self):
        self.today = datetime.date(2026, 11, 21)
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.path = Path(self.directory.name) / "workout_dates.csv"
        self.path.write_text("date\n2026/11/10\n2026/11/17\n", encoding="utf-8")

    def test_new_date_is_added(self):
        date, added = log_workout("2026/11/20", self.path, self.today)
        self.assertEqual(date, datetime.date(2026, 11, 20))
        self.assertTrue(added)
        self.assertIn(datetime.date(2026, 11, 20), load_workout_dates(self.path))

    def test_file_stays_sorted_when_back_filling(self):
        # 11/12 belongs before the two dates already in the file.
        log_workout("2026/11/12", self.path, self.today)
        rows = self.path.read_text(encoding="utf-8").splitlines()
        self.assertEqual(rows, ["date", "2026/11/10", "2026/11/12", "2026/11/17"])

    def test_duplicate_is_a_no_op(self):
        before = self.path.read_text(encoding="utf-8")
        date, added = log_workout("2026/11/17", self.path, self.today)
        self.assertFalse(added)
        self.assertEqual(self.path.read_text(encoding="utf-8"), before)

    def test_no_argument_logs_today(self):
        date, added = log_workout(None, self.path, self.today)
        self.assertEqual(date, self.today)
        self.assertTrue(added)

    def test_malformed_date_is_rejected(self):
        for bad in ("20/11/2026", "2026-11-20", "yesterday", "2026/13/01"):
            with self.subTest(bad=bad), self.assertRaises(ValueError):
                log_workout(bad, self.path, self.today)

    def test_future_date_is_rejected(self):
        with self.assertRaises(ValueError):
            log_workout("2026/11/22", self.path, self.today)


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

    def test_bundled_inter_font_is_used(self):
        # A missing or unreadable font file falls back to a system sans, which
        # would silently undo the Apple-style typography. Catch that here.
        family, _ = load_font(48).getname()
        self.assertIn("Inter", family)

    def test_font_weight_axis_is_applied(self):
        # Setting the variation axes is best-effort, so confirm it actually took:
        # semibold must render wider than thin at the same size.
        wide = load_font(96, weight=FONT_WEIGHT).getlength("6 weeks off")
        thin = load_font(96, weight=100).getlength("6 weeks off")
        self.assertGreater(wide, thin)

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
