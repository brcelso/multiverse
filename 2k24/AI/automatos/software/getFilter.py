import csv
import json
import requests
from datetime import datetime
import os
import urllib3
from dotenv import load_dotenv

# Carregar variáveis do arquivo .env
load_dotenv()

# Suprimir o aviso InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Carregar as variáveis do .env
automatos_id = os.getenv("AUTOMATOS_ID")
automatos_key = os.getenv("AUTOMATOS_KEY")  # Alterado para 'AUTOMATOS_KEY'
hostname = os.getenv("HOSTNAME")
software_filter = os.getenv("SOFTWARE_FILTER")

# Verificar se as variáveis foram carregadas corretamente
if not all([automatos_id, automatos_key, hostname, software_filter]):
    print("Erro: As variáveis de ambiente não estão definidas corretamente.")
    exit(1)

# Variáveis de entrada
homeV1 = "https://lad1-smartcenter.almaden.app/api/public/api"
data_atual = datetime.now()
data_formatada = data_atual.strftime("%Y-%m-%d %Hh%Mm")
headers = [
    "software_name",
    "computer_name"
]

csv_file = f"./Listagem-{hostname}-{data_formatada}.csv"

url = f"{homeV1}/getAllSoftware/nextpage/desktops?AutomatosId={automatos_id}&Securitykey={automatos_key}&hostname={hostname}"

response = requests.get(url, verify=False)

if response.status_code == 200:
    data = response.json().get("data", [])

    # Filtra os dados para incluir apenas 'software_name' e 'computer_name' onde 'software_name' contém o valor da variável 'software_filter'
    filtered_data = []
    for item in data:
        if software_filter.upper() in item.get("software_name", "").upper():  # Verifica se o 'software_name' contém o valor de 'software_filter'
            filtered_item = {
                "software_name": item.get("software_name"),
                "computer_name": item.get("computer_name")
            }
            filtered_data.append(filtered_item)

            # Exibe cada item no terminal
            print(f"Software Name: {filtered_item['software_name']}, Computer Name: {filtered_item['computer_name']}")

    # Se houver dados filtrados, grava no CSV
    if filtered_data:
        with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
            writer = csv.DictWriter(file, fieldnames=headers, delimiter=";")
            writer.writeheader()
            writer.writerows(filtered_data)

        print(f"Dados exportados com sucesso para {csv_file}")
    else:
        print(f"Nenhum software contendo '{software_filter}' encontrado.")
else:
    print(f"Erro na requisição: {response.status_code}")
