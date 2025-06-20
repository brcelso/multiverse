from datetime import datetime, timedelta

def fibonacci_up_to(max_value):
    fib_sequence = [1, 1]
    while fib_sequence[-1] + fib_sequence[-2] <= max_value:
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    return fib_sequence

def add_months(start_date, months):
    month = start_date.month - 1 + months
    year = start_date.year + month // 12
    month = month % 12 + 1
    day = min(start_date.day, [31,
        29 if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0) else 28,
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1])
    return datetime(year, month, day)

def add_years(start_date, years):
    try:
        return start_date.replace(year=start_date.year + years)
    except ValueError:
        # Handle Feb 29 for non-leap years
        if start_date.month == 2 and start_date.day == 29:
            return start_date.replace(year=start_date.year + years, day=28)
        else:
            raise

def calculate_fibonacci_dates(start_date_str, end_date_str):
    start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
    end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
    max_days = (end_date - start_date).days
    max_weeks = max_days // 7
    max_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month)
    max_years = end_date.year - start_date.year

    fib_days = fibonacci_up_to(max_days)
    fib_weeks = fibonacci_up_to(max_weeks)
    fib_months = fibonacci_up_to(max_months)
    fib_years = fibonacci_up_to(max_years)

    print("Fibonacci Days:")
    for d in fib_days:
        date = start_date + timedelta(days=d)
        if date <= end_date:
            print(f"{d} days -> {date.strftime('%Y-%m-%d')}")

    print("\nFibonacci Weeks:")
    for w in fib_weeks:
        date = start_date + timedelta(weeks=w)
        if date <= end_date:
            print(f"{w} weeks -> {date.strftime('%Y-%m-%d')}")

    print("\nFibonacci Months:")
    for m in fib_months:
        date = add_months(start_date, m)
        if date <= end_date:
            print(f"{m} months -> {date.strftime('%Y-%m-%d')}")

    print("\nFibonacci Years:")
    for y in fib_years:
        date = add_years(start_date, y)
        if date <= end_date:
            print(f"{y} years -> {date.strftime('%Y-%m-%d')}")

if __name__ == "__main__":
    # Defina aqui as datas que deseja usar:
    start_date_str = "1970-05-08"
    end_date_str = "2038-01-19"

    calculate_fibonacci_dates(start_date_str, end_date_str)