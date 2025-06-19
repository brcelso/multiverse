from datetime import datetime, timedelta

# Set fixed start and end dates
start_date = "13-01-1987"
end_date = "14-05-2110"

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

def count_days_weeks_months_years(start_date, end_date):
    """
    Calculates the number of days, weeks, months, and years between two dates,
    and displays dates corresponding to Fibonacci numbers of days, weeks, months, and years.

    Args:
        start_date: The start date in DD-MM-YYYY format (inclusive).
        end_date: The end date in DD-MM-YYYY format (inclusive).

    Returns:
        None
    """

    # Convert strings to datetime objects
    start_date = datetime.strptime(start_date, "%d-%m-%Y")
    end_date = datetime.strptime(end_date, "%d-%m-%Y")

    # Calculate total days, weeks, months, and years between the dates
    total_days = (end_date - start_date).days + 1
    total_weeks = total_days // 7
    total_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month) + 1
    total_years = end_date.year - start_date.year + 1

    # Generate Fibonacci sequences for days, weeks, months, and years
    fibonacci_days = fibonacci_up_to(total_days)
    fibonacci_weeks = fibonacci_up_to(total_weeks)
    fibonacci_months = fibonacci_up_to(total_months)
    fibonacci_years = fibonacci_up_to(total_years)

    # Fibonacci Days
    print("\nFibonacci Days:")
    for day in range(total_days):
        current_date = start_date + timedelta(days=day)
        if (day + 1) in fibonacci_days:
            print(f"Day {day + 1:02d}: {current_date.strftime('%d-%m-%Y')}")

    # Fibonacci Weeks
    print("\nFibonacci Weeks:")
    for week in range(total_weeks + 1):  
        current_date = start_date + timedelta(weeks=week)
        if week in fibonacci_weeks:
            print(f"Week {week}: {current_date.strftime('%d-%m-%Y')}")

    # Fibonacci Months
    print("\nFibonacci Months:")
    for month in range(total_months):
        year_offset = (start_date.month + month - 1) // 12
        month_offset = (start_date.month + month - 1) % 12 + 1
        current_date = datetime(start_date.year + year_offset, month_offset, start_date.day)
        if month in fibonacci_months:
            print(f"Month {month}: {current_date.strftime('%d-%m-%Y')}")

    # Fibonacci Years
    print("\nFibonacci Years:")
    for year in range(total_years):
        current_date = datetime(start_date.year + year, start_date.month, start_date.day)
        if year in fibonacci_years:
            print(f"Year {year}: {current_date.strftime('%d-%m-%Y')}")

# Call the function with the fixed dates
count_days_weeks_months_years(start_date, end_date)