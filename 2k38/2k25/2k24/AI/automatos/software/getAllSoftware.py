import csv
import json
import requests
from datetime import datetime
import os
import urllib3

# Suprimir o aviso InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

# Variáveis de entrada
homeV1 = "https://lad1-smartcenter.almaden.app/api/public/api"
automatos_id = ""
security_key = ""
data_atual = datetime.now()
data_formatada = data_atual.strftime("%Y-%m-%d %Hh%Mm")
headers = [
    "sw_id",
    "computer_name",
    "department_name",
    "software_name",
    "normalized_software_name",
    "is_licensable",
    "software_version",
    "software_manufacturer",
    "homologation_status",
    "instalation_date",
    "machine_type",
    "machine_id",
    "family",
    "label",
    "category_name",
    "category_description",
    "group_name",
    "group_description",
]

hostname = "WNLX6051003"

csv_file = f"./Listagem-{hostname}-{data_formatada}.csv"

url = f"{homeV1}/getAllSoftware/nextpage/desktops?AutomatosId={automatos_id}&Securitykey={security_key}&hostname={hostname}"

response = requests.get(url, verify=False)

if response.status_code == 200:
    data = response.json().get("data", [])

    for item in data:
        print(json.dumps(item, indent=4))

    with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=headers, delimiter=";")
        writer.writeheader()
        writer.writerows(data)

    print(f"Dados exportados com sucesso para {csv_file}")

else:
    print(f"Erro na requisição: {response.status_code}")
