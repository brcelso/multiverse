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
automatos_key = os.getenv("AUTOMATOS_KEY")
hostnames_str = os.getenv("HOSTNAMES")  # Carregar a variável como string

# Verificar se hostnames foi carregado corretamente
if not hostnames_str:
    print("Erro: A variável 'HOSTNAMES' não foi definida no arquivo .env.")
    exit(1)

# Converter a string de hostnames para uma lista
hostnames = hostnames_str.split(",")  # Separar os hostnames por vírgula
software_filter = os.getenv("SOFTWARE_FILTER")

# Verificar se as outras variáveis foram carregadas corretamente
if not all([automatos_id, automatos_key, software_filter]):
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

# Gerar o nome do arquivo CSV final com base na data
csv_file = f"./Listagem-{data_formatada}.csv"

# Lista para armazenar todos os dados que serão exportados para o CSV
all_filtered_data = []

# Função para realizar a requisição e retornar os dados filtrados
def get_filtered_data_for_hostname(hostname):
    print(f"Buscando dados para o hostname: {hostname}")
    
    # Construir a URL da requisição
    url = f"{homeV1}/getAllSoftware/nextpage/desktops?AutomatosId={automatos_id}&Securitykey={automatos_key}&hostname={hostname}"
    print(f"URL da requisição: {url}")  # Log da URL para verificar se está correta

    response = requests.get(url, verify=False)

    # Verificar se a requisição foi bem-sucedida
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

        # Se houver dados filtrados, retorna a lista de dados
        if filtered_data:
            return filtered_data
        else:
            print(f"Nenhum software contendo '{software_filter}' encontrado para o hostname {hostname}.")
            return []
    else:
        print(f"Erro na requisição para o hostname {hostname}: {response.status_code}")
        print(f"Resposta da API: {response.text}")  # Imprimir a resposta da API para entender o erro
        return []

# Iterar sobre os hostnames e coletar os dados de cada um separadamente
for hostname in hostnames:
    filtered_data = get_filtered_data_for_hostname(hostname)
    
    # Acumula os dados no conjunto geral
    if filtered_data:
        all_filtered_data.extend(filtered_data)

# Se houver dados filtrados, grava todos no CSV
if all_filtered_data:
    with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=headers, delimiter=";")
        writer.writeheader()  # Adiciona cabeçalho no CSV
        writer.writerows(all_filtered_data)  # Escreve todos os dados de uma vez

    print(f"Dados exportados com sucesso para {csv_file}")
else:
    print(f"Nenhum dado filtrado para os hostnames fornecidos.")
