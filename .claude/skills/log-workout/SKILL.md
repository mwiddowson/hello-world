---
name: log-workout
description: Record a gym session and refresh both wallpapers. Use when Mark says he went to the gym or trained, with or without a date ("went to the gym", "trained yesterday", "/log-workout 2026/11/20").
---

# Log a workout

Records one date in `workout_dates.csv` and republishes both wallpapers.

## Steps

1. Make sure the checkout is on `master` and up to date — the daily Action commits there
   several times a week, so pull first:
   ```bash
   git checkout master && git pull --ff-only origin master
   ```

2. Log the date. Pass `YYYY/MM/DD`, or nothing at all for today:
   ```bash
   python3.13 log_workout.py 2026/11/20
   ```
   Resolve a relative date ("yesterday") against today before calling, and say in your
   reply which date you used so a wrong reading is easy to spot. Re-running a date already
   logged is a no-op, and a malformed or future date exits non-zero without writing.

3. Regenerate both images:
   ```bash
   python3.13 generate_background.py && python3.13 generate_home.py
   ```

4. Commit and push:
   ```bash
   git add workout_dates.csv docs/background.png docs/home.png
   git commit -m "Log gym session for <date>"
   git push origin master
   ```
   If the push is rejected because the Action pushed first, rebase and regenerate the PNGs
   from the merged CSV rather than resolving the binary conflict by picking a side.

5. Report the new totals from the generator output, e.g. `54 workouts, 9 weeks off`.

## Notes

- **Use `python3.13`.** The containers here ship `python3` as 3.11 with a broken PIL
  (its binaries are built for 3.12). Check with `python3.13 -c "import PIL"` if unsure;
  CI pins 3.12 with its own install and is unaffected.
- **"Weeks off" not moving is usually correct, not a bug.** Only completed Mon–Sun weeks
  count, so a session in the current week changes nothing until that week ends.
