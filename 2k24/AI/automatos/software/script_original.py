import json
import requests
from datetime import datetime
import os
import urllib3
from dotenv import load_dotenv
import argparse

# Carregar variáveis do arquivo .env
load_dotenv()

# Suprimir o aviso InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Função para configurar o hostname a partir do argumento
def get_hostname():
    # Usar argparse para obter o hostname a partir da linha de comando
    parser = argparse.ArgumentParser(description='Executa a requisição com o hostname especificado.')
    parser.add_argument('--hostname', type=str, required=True, help='Hostname do computador')
    args = parser.parse_args()
    return args.hostname

# Carregar as variáveis do .env
automatos_id = os.getenv("AUTOMATOS_ID")
automatos_key = os.getenv("AUTOMATOS_KEY")  # Alterado para 'AUTOMATOS_KEY'
software_filter = os.getenv("SOFTWARE_FILTER")

# Verificar se as variáveis foram carregadas corretamente
if not all([automatos_id, automatos_key]):
    print("Erro: As variáveis de ambiente não estão definidas corretamente.")
    exit(1)

# Variáveis de entrada
homeV1 = "https://lad1-smartcenter.almaden.app/api/public/api"
data_atual = datetime.now()
data_formatada = data_atual.strftime("%Y-%m-%d %Hh%Mm")

# Obter o hostname do argumento de linha de comando
hostname = get_hostname()

url = f"{homeV1}/getAllSoftware/nextpage/desktops?AutomatosId={automatos_id}&Securitykey={automatos_key}&hostname={hostname}"

response = requests.get(url, verify=False)

if response.status_code == 200:
    data = response.json().get("data", [])

    # Se 'software_filter' não for vazio, aplica o filtro
    if software_filter:
        filtered_data = []
        for item in data:
            if software_filter.upper() in item.get("software_name", "").upper():  # Verifica se o 'software_name' contém o valor de 'software_filter'
                filtered_item = {
                    "software_name": item.get("software_name"),
                    "computer_name": item.get("computer_name")
                }
                filtered_data.append(filtered_item)

                # Exibe cada item com a ordem alterada, Computer Name antes do Software Name
                print(f"Computer Name: {filtered_item['computer_name']}, Software Name: {filtered_item['software_name']}", end=", ")

        # Se não houver dados filtrados
        if not filtered_data:
            print(f"Computer Name: {hostname}, Nenhum software contendo '{software_filter}' encontrado.", end=", ")
    else:
        # Se o filtro estiver vazio, exibe todos os dados sem filtrar
        if not data:
            print(f"Computer Name: {hostname}, Nenhum software encontrado.", end=", ")
        else:
            for item in data:
                filtered_item = {
                    "software_name": item.get("software_name"),
                    "computer_name": item.get("computer_name")
                }
                # Exibe cada item com a ordem alterada, Computer Name antes do Software Name
                print(f"Computer Name: {filtered_item['computer_name']}, Software Name: {filtered_item['software_name']}", end=", ")

else:
    print(f"Erro na requisição: {response.status_code}")
