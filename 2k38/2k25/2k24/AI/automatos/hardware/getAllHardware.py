#Busca as informações no Automatos e cria um CSV com
#com todos os campos existentes na base 

import csv
import json
import requests
from datetime import datetime
import os
import urllib3
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Suppress InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Input variables
homeV1 = "https://lad1-smartcenter.almaden.app/api/public/api"

# Prompt user for ID choice
choice = input("Escolha o ID (MAGALU ou GFL): ")
if choice == 'MAGALU':
    automatos_id = os.getenv("AUTOMATOS_ID_MAGALU")
    security_key = os.getenv("SECURITY_KEY_MAGALU")
elif choice == 'GFL':
    automatos_id = os.getenv("AUTOMATOS_ID_GFL")
    security_key = os.getenv("SECURITY_KEY_GFL")
else:
    print("Escolha inválida! Por favor, escolha MAGALU ou GFL.")
    exit(1)

data_atual = datetime.now()
data_formatada = data_atual.strftime("%Y-%m-%d %Hh%Mm")

headers = [
    "computer_name",
    "department_name",
    "department_hierarchy",
    "so_string",
    "system_manufacturer",
    "computer_type",
    "machine_net_ipaddress",
    "bios_release_date",
    "machine_ipdomain",
    "is_virtual_machine",
    "system_product_name",
    "system_serial_number",
    "machine_id",
    "os_bits",
    "login_name",
    "cpu_identity",
    "cpu_generation",
    "cpu_type",
    "cpu_clock",
    "cpu_clock_in_MHz",
    "cpu_clock_in_GHz",
    "core_num",
    "physical_cpu_amount",
    "logical_cpu",
    "memory_range",
    "installed_mem",
    "disk_total",
    "disk_used",
    "top_user",
    "percent_top_user",
    "dns_servers",
    "machine_gateway",
    "collect_date",
    "update_date",
    "last_login",
    "installed_mem_in_GB",
    "disk_total_in_GB",
    "disk_used_in_GB",
    "installed_mem_in_MB",
    "disk_total_in_MB",
    "disk_used_in_MB",
]

hostname = ""

# Define CSV file name
csv_file = f"./Listagem-{hostname}-{data_formatada}.csv"

# Function to fetch data for a given Automatos ID and Security Key
def fetch_data(automatos_id, security_key):
    url = f"{homeV1}/getAllHardware/desktops?AutomatosId={automatos_id}&Securitykey={security_key}&hostname={hostname}"
    response = requests.get(url, verify=False)
    return response

# Fetch data using the chosen credentials
response = fetch_data(automatos_id, security_key)

if response.status_code == 200:
    data = response.json()
    
    # Write the response to CSV
    with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=headers, delimiter=";")
        writer.writeheader()
        writer.writerows(data)

    print(f"Dados exportados com sucesso para {csv_file}")
else:
    print(f"Erro na requisição para ID {choice}: {response.status_code}")
