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

def count_weeks(start_date, end_date):
    """
    This function calculates the number of weeks between two given dates, iterates
    through each week, and displays only weeks that correspond to the Fibonacci sequence.

    Args:
        start_date: The start date in YYYY-MM-DD format (inclusive).
        end_date: The end date in YYYY-MM-DD format (inclusive).

    Returns:
        None
    """

    # Convert strings to datetime objects
    start_date = datetime.strptime(start_date, "%d-%m-%Y")
    end_date = datetime.strptime(end_date, "%d-%m-%Y")

    # Calculate the maximum possible number of weeks within the date range (assuming 7 days per week)
    max_week_count = (end_date - start_date).days // 7 + 1

    # Generate Fibonacci sequence up to the maximum week count
    fibonacci_sequence = fibonacci_up_to(max_week_count)

    # Get the first and last day of each week in the Fibonacci sequence
    for week_number in fibonacci_sequence:
        first_day_of_week = start_date + timedelta(weeks=week_number - 1)
        last_day_of_week = first_day_of_week + timedelta(days=6)
        print(f"Week {week_number:02d}: {first_day_of_week.strftime('%d-%m-%Y')} - {last_day_of_week.strftime('%d-%m-%Y')}")

# Example usage (assuming today's date is 14-05-2024)
start_date = "20-04-2024"
end_date = "19-01-2026"

count_weeks(start_date, end_date)


'''''
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


def count_weeks(start_date, end_date):
  """
  This function calculates the number of weeks between two given dates, iterates
  through each week, and displays only weeks that correspond to the Fibonacci sequence.

  Args:
      start_date: The start date in YYYY-MM-DD format (inclusive).
      end_date: The end date in YYYY-MM-DD format (inclusive).

  Returns:
      None
  """

  # Convert strings to datetime objects
  start_date = datetime.strptime(start_date, "%d-%m-%Y")
  end_date = datetime.strptime(end_date, "%d-%m-%Y")

  # Calculate the maximum possible number of weeks within the date range (assuming 7 days per week)
  max_week_count = (end_date - start_date).days // 7 + 1

  # Generate Fibonacci sequence up to the maximum week count
  fibonacci_sequence = fibonacci_up_to(max_week_count)

  # Iterate through each week between start and end date (inclusive)
  current_week = 0
  for day in range((end_date - start_date).days + 1):
    current_date = start_date + timedelta(days=day)

    # Update week counter when we move to a new week
    if day % 7 == 0:
      current_week += 1

    # Check if the current week is in the pre-calculated Fibonacci sequence
    if current_week in fibonacci_sequence:
      week_count_str = f"Week {current_week:02d}"
      print(f"{week_count_str}: {current_date.strftime('%d-%m-%Y')}")  # Print the first day of the week

# Example usage (assuming today's date is 14-05-2024)
start_date = "08-05-2024"
end_date = "19-01-2055"

count_weeks(start_date, end_date)
'''''