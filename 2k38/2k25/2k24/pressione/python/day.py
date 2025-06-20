from datetime import datetime, timedelta

def fibonacci_up_to(n):
  """
  Calculates Fibonacci numbers up to a given maximum value (n).

  Args:
      n: The maximum value (inclusive).

  Returns:
      A list of Fibonacci numbers up to n.
  """
  a, b = 0, 1
  fibonacci_sequence = []
  while a <= n:
    fibonacci_sequence.append(a)
    a, b = b, a + b
  return fibonacci_sequence


def count_days(start_date, end_date):
  """
  This function calculates the number of days between two given dates, iterates
  through each day, and displays only days that correspond to the Fibonacci sequence.

  Args:
      start_date: The start date in YYYY-MM-DD format (inclusive).
      end_date: The end date in YYYY-MM-DD format (inclusive).

  Returns:
      None
  """

  # Convert strings to datetime objects
  start_date = datetime.strptime(start_date, "%d-%m-%Y")
  end_date = datetime.strptime(end_date, "%d-%m-%Y")

  # Calculate the maximum possible day count within the date range
  max_day_count = (end_date - start_date).days + 1

  # Generate Fibonacci sequence up to the maximum day count
  fibonacci_sequence = fibonacci_up_to(max_day_count)

  # Iterate through each day between start and end date (inclusive)
  for day in range((end_date - start_date).days + 1):
    current_date = start_date + timedelta(days=day)
    day_count = day + 1  # Add 1 to start counting from 1

    # Check if the day count is in the pre-calculated Fibonacci sequence
    if day_count in fibonacci_sequence:
      day_count_str = f"Day {day_count:02d}"
      print(f"{day_count_str}: {current_date.strftime('%d-%m-%Y')}")

# Example usage (assuming today's date is 14-05-2024)
start_date = "20-04-2024"
end_date = "19-01-2026"

count_days(start_date, end_date)
