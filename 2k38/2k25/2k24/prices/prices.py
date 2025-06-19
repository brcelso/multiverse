import json
import os

from datetime import datetime

# Load menu data from menu_data.json
def load_menu_data():
    with open('data/menu_data.json', 'r') as file:
        return json.load(file)

# Load Playstation Plus data from playstationPlus.json
def load_playstation_plus_data():
    with open('data/playstationPlus.json', 'r') as file:
        return json.load(file)

# Load Games data from games.json
def load_games_data():
    with open('data/games.json', 'r') as file:
        return json.load(file)

def show_main_menu(menu_data):
    print("Main Menu:")
    for key, value in menu_data["main_menu"].items():
        print(f"{key}. {value}")
    choice = input("Please select an option: ")
    return choice

def show_playstation_menu(menu_data):
    print("\nPlaystation Menu:")
    for key, value in menu_data["playstation_menu"].items():
        print(f"{key}. {value}")
    choice = input("Please select an option: ")
    return choice

def display_playstation_plus_data(data):
    print("\nPlaystation Plus Pricing:")
    for year, countries in data.items():
        print(f"\nYear: {year}")
        for country, months in countries.items():
            print(f"  Country: {country}")
            for month, prices in months.items():
                print(f"    Month: {month}")
                for plan, price in prices.items():
                    print(f"      {plan}: {price}")

# Function to display games from the games.json file (latest first by release date)
def display_games_data(data):
    print("\nGames List:")

    # Reverse the order of years to show the latest first
    for year in sorted(data.keys(), reverse=True):
        print(f"\nYear: {year}")
        
        # Sort the games for the current year by release date (latest first)
        games_sorted_by_date = sorted(data[year], key=lambda x: datetime.strptime(x['release_date'], "%B %d, %Y"), reverse=True)
        
        # Display the sorted games for the current year
        for game in games_sorted_by_date:
            print(f"  Title: {game['title']}")
            print(f"  Release Date: {game['release_date']}")
            if "added_to_ps_plus_game_catalog" in game:
                print(f"  Added to PS Plus Game Catalog: {game['added_to_ps_plus_game_catalog']}")
            if "added_to_ps_plus_extra_and_premium" in game:
                print(f"  Added to PS Plus Extra and Premium: {game['added_to_ps_plus_extra_and_premium']}")


def main():
    # Load menu data, Playstation Plus data, and games data
    menu_data = load_menu_data()
    playstation_plus_data = load_playstation_plus_data()
    games_data = load_games_data()
    
    while True:
        choice = show_main_menu(menu_data)

        if choice == "1":
            while True:
                playstation_choice = show_playstation_menu(menu_data)
                if playstation_choice == "4":
                    break
                elif playstation_choice == "1":
                    display_playstation_plus_data(playstation_plus_data)
                elif playstation_choice == "2":
                    # When Games is selected, show games data
                    display_games_data(games_data)
                elif playstation_choice == "3":
                    print("You selected Consoles.")
                else:
                    print("Invalid choice.")
        
        elif choice == "2":
            print("You selected Cars.")
        elif choice == "3":
            print("You selected Coins.")
        elif choice == "4":
            print("You selected Gas.")
        elif choice == "5":
            print("Exiting...")
            break
        else:
            print("Invalid choice, please try again.")

if __name__ == "__main__":
    main()
