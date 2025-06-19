#Busca as informações no Automatos mostra o 
#resultado em arquivo CSV gerado

import json
import requests
from datetime import datetime
import os
import urllib3
import csv
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Suprimir o aviso InsecureRequestWarning
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

hostname = ""

url = f"{homeV1}/getAllHardware/desktops?AutomatosId={automatos_id}&Securitykey={security_key}&hostname={hostname}"

response = requests.get(url, verify=False)

if response.status_code == 200:
    data = response.json()

    # Nome do arquivo CSV
    csv_file = "07-10-2024.csv"

    # Campos do CSV
    csv_columns = ["machine_id", "computer_name", "so_string", "system_manufacturer", "computer_type", "machine_net_ipaddress", "system_product_name", "system_serial_number", "cpu_identity", "installed_mem", "disk_total", "collect_date", "last_login"]

    try:
        with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
            writer.writeheader()
            for item in data:
                # Filtrar apenas os campos necessários
                filtered_item = {key: item[key] for key in csv_columns if key in item}
                writer.writerow(filtered_item)
        print(f"Arquivo CSV '{csv_file}' gerado com sucesso.")
    except IOError:
        print("Erro ao gerar o arquivo CSV.")

    for item in data:
        machine_id = item.get("machine_id")
        computer_name = item.get("computer_name")
        so_string = item.get("so_string")
        system_manufacturer = item.get("system_manufacturer")
        computer_type = item.get("computer_type")
        machine_net_ipaddress = item.get("machine_net_ipaddress")
        system_product_name = item.get("system_product_name")
        system_serial_number = item.get("system_serial_number")
        cpu_identity = item.get("cpu_identity")
        installed_mem = item.get("installed_mem")
        disk_total = item.get("disk_total")
        collect_date = item.get("collect_date")
        last_login = item.get("last_login")
        
        if machine_id and computer_name and so_string and system_manufacturer and computer_type and machine_net_ipaddress and system_product_name and system_serial_number and cpu_identity and installed_mem and disk_total and collect_date and last_login:
            print(f"ID: {machine_id}\n"
                  f"Hostname: {computer_name}\n"
                  f"SO: {so_string}\n"
                  f"Fabricante: {system_manufacturer}\n"
                  f"Tipo: {computer_type}\n"
                  f"IP: {machine_net_ipaddress}\n"
                  f"Modelo: {system_product_name}\n"
                  f"SN: {system_serial_number}\n"
                  f"CPU: {cpu_identity}\n"
                  f"Memória: {installed_mem}\n"
                  f"Disco: {disk_total}\n"
                  f"Coleta: {collect_date}\n"
                  f"Login: {last_login}\n")
    
        #print(json.dumps(item, indent=4))

else:
    print(f"Erro na requisição: {response.status_code}")
