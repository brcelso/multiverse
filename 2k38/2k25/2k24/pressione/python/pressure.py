from datetime import datetime, timedelta

# Start date: 27-09-1984
start_date = datetime.strptime("27-09-1984", "%d-%m-%Y")

# Fibonacci-based pressure sequence values for years, months, weeks, and days
pressure_sequence = [
    (0, 0, 1, 8),    # SubPressure (01)
    (0, 0, 2, 13),   # SubPressure (02)
    (0, 0, 3, 21),   # SubPressure (03)
    (0, 1, 5, 34),   # SubPressure (04)
    (0, 2, 8, 55),   # SubPressure (05)
    (0, 3, 13, 89),  # Pressure (01)
    (0, 5, 21, 144), # Pressure (02)
    (0, 8, 34, 233), # Pressure (03)
    (1, 13, 55, 377),# Pressure (04)
    (2, 21, 89, 610),# Pressure (05)
    (3, 34, 144, 987),# Pressure (06)
    (5, 55, 233, 1597),# Pressure (07)
    (8, 89, 377, 2584),# Pressure (08)
    (13, 144, 610, 4181),# Pressure (09)
    (21, 233, 987, 6765),# Pressure (10)
    (34, 377, 1597, 10946),# Pressure (11)
    (55, 610, 2584, 17711),# Pressure (12)
    (89, 987, 4181, 28657)# Pressure (13)
]

# Function to calculate the date for each pressure based on the sequence
def calculate_pressure_dates(start_date, pressure_sequence):
    pressure_dates = []

    for (years, months, weeks, days) in pressure_sequence:
        # Add years, months, weeks, and days to the start date
        new_date = start_date
        
        # Add years (approximate to days, 365.25 days per year to account for leap years)
        new_date = new_date + timedelta(days=years * 365.25)
        
        # Add months (approximate to days, 30 days per month)
        new_date = new_date + timedelta(days=months * 30)
        
        # Add weeks (7 days per week)
        new_date = new_date + timedelta(weeks=weeks)
        
        # Add days
        new_date = new_date + timedelta(days=days)
        
        # Append the calculated date in DD-MM-YYYY format
        pressure_dates.append(new_date.strftime('%d-%m-%Y'))
    
    return pressure_dates

# Calculate the pressure dates
pressure_dates = calculate_pressure_dates(start_date, pressure_sequence)

# Output the results
for i, date in enumerate(pressure_dates, 1):
    print(f"Pressure ({i:02d}): {date}")