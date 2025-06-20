from datetime import datetime, timedelta

def fibonacci_up_to(max_value):
    fib_sequence = [1, 1]
    while fib_sequence[-1] + fib_sequence[-2] <= max_value:
        fib_sequence.append(fib_sequence[-1] + fib_sequence[-2])
    return fib_sequence

def subtract_months(end_date, months):
    month = end_date.month - 1 - months
    year = end_date.year + month // 12
    month = month % 12 + 1
    if month <= 0:
        month += 12
        year -= 1
    day = min(end_date.day, [31,
        29 if year % 4 == 0 and (year % 100 != 0 or year % 400 == 0) else 28,
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1])
    return datetime(year, month, day)

def subtract_years(end_date, years):
    try:
        return end_date.replace(year=end_date.year - years)
    except ValueError:
        # Handle Feb 29 for non-leap years
        if end_date.month == 2 and end_date.day == 29:
            return end_date.replace(year=end_date.year - years, day=28)
        else:
            raise

def calculate_fibonacci_reverse(end_date_str, start_limit_str):
    end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
    start_limit = datetime.strptime(start_limit_str, "%Y-%m-%d")
    max_days = (end_date - start_limit).days
    max_weeks = max_days // 7
    max_months = (end_date.year - start_limit.year) * 12 + (end_date.month - start_limit.month)
    max_years = end_date.year - start_limit.year

    fib_days = fibonacci_up_to(max_days)
    fib_weeks = fibonacci_up_to(max_weeks)
    fib_months = fibonacci_up_to(max_months)
    fib_years = fibonacci_up_to(max_years)

    print(f"Fibonacci Days counting backwards from {end_date_str}:")
    for d in fib_days:
        date = end_date - timedelta(days=d)
        if date >= start_limit:
            print(f"{d} days before -> {date.strftime('%Y-%m-%d')}")

    print(f"\nFibonacci Weeks counting backwards from {end_date_str}:")
    for w in fib_weeks:
        date = end_date - timedelta(weeks=w)
        if date >= start_limit:
            print(f"{w} weeks before -> {date.strftime('%Y-%m-%d')}")

    print(f"\nFibonacci Months counting backwards from {end_date_str}:")
    for m in fib_months:
        date = subtract_months(end_date, m)
        if date >= start_limit:
            print(f"{m} months before -> {date.strftime('%Y-%m-%d')}")

    print(f"\nFibonacci Years counting backwards from {end_date_str}:")
    for y in fib_years:
        date = subtract_years(end_date, y)
        if date >= start_limit:
            print(f"{y} years before -> {date.strftime('%Y-%m-%d')}")

if __name__ == "__main__":
    # Defina aqui a data final e o limite inferior (data mais antiga permitida)
    end_date_str = "2038-01-19"
    start_limit_str = "1900-01-01"  # Pode ajustar esse limite como quiser

    calculate_fibonacci_reverse(end_date_str, start_limit_str)