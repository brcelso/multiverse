import csv
from datetime import datetime
import requests
import time
import urllib3
import re

# Suprimir o aviso InsecureRequestWarning
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

data_atual = datetime.now()
data_formatada = data_atual.strftime("%Y-%m-%d")
data_formatada_com_hora = data_atual.strftime("%Y-%m-%d %Hh%Mm")

#Para acesso a autenticação e API pública
automatos_id = ""
security_key = ""

token = ""
machine_id = ""
job_name = ""
distribution_result = ""

package = "Office_STD_2013_X64.exe"
# package = "Office_STD_2010_X64.exe"
# package = "Remover_Office_STD_2013.exe"
# package = "Remover_Excel_2016.exe"


hostname = "WN300DEL105"


def auth_requisiton():

    print("")

    auth_endpoint = "https://lad1-smartcenter.almaden.app/api/distribution/api/auth"

    auth_payload = {
        "automatosId": "338313379563",
        "automatosKey": "RDMwRTk3MTFDMzNFRjJDRjdDNEE1N0JFRTdDMDVDRTQ=",
    }

    auth_headers = {"Content-Type": "application/json"}

    auth_response = requests.post(
        auth_endpoint, json=auth_payload, headers=auth_headers, verify=False
    )

    if auth_response.status_code == 200:

        global token
        token = auth_response.json().get("data", {}).get("token")

        if token:
            print("Login realizado e tokem gerado com sucesso")
        else:
            print("Token não encontrado na resposta.")
            exit
    else:
        print(
            f"Erro ao requisitar o token, status: {auth_response.status_code}, mensagem: {auth_response.text}"
        )
        exit


def machine_requisiton():

    get_machine_endpoint = "https://lad1-smartcenter.almaden.app/api/distribution/api/machine"

    get_machine_headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    machine_response = requests.get(
        f"{get_machine_endpoint}?hostname={hostname}",
        headers=get_machine_headers,
        verify=False,
    )

    if machine_response.status_code == 200:
        machines = machine_response.json().get("data", {}).get("machines", [])

        if machines:
            for machine in machines:
                global machine_id
                machine_id = machine.get("machineId")

            if len(machines) > 1:
                print("Mais de uma máquina encontrada com esse hostname")
                exit
            else:
                print(f"Máquina {hostname} encontrada com o id {machine_id}")
        else:
            print("Nenhuma máquina encontrada na resposta.")
            exit
    else:
        print(
            f"Erro na requisição para consultar a máquina, status: {machine_response.status_code}, mensagem: {machine_response.text}"
        )


def send_distribution():

    send_distribution_endpoint = "https://lad1-smartcenter.almaden.app/api/distribution/api/express/distribution"

    send_distribution_headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    send_distribution_payload = {
        "machineId": machine_id,
        "package": package,
        "domain": "",
        "user": "",
        "password": "",
        "irradiadora": "0050569D1593CA8AC001114D",
    }

    distribution_response = requests.post(
        send_distribution_endpoint,
        json=send_distribution_payload,
        headers=send_distribution_headers,
        verify=False,
    )

    if distribution_response.status_code == 200:
        global job_name
        job_name = distribution_response.json().get("data", {}).get("jobName")
        print(f"Nome do job gerado: {job_name}")
    else:
        print(
            f"Erro ao enviar a distribuição, status: {distribution_response.status_code}, mensagem: {distribution_response.text}"
        )
        exit


def get_distribution_result():

    get_distribution_result_endpoint = "https://lad1-smartcenter.almaden.app/api/distribution/api/express/distribution"

    get_distribution_result_headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    max_attempts = 8
    attempts = 0

    while attempts < max_attempts:
        get_distribution_result_response = requests.get(
            f"{get_distribution_result_endpoint}?jobName={job_name}",
            headers=get_distribution_result_headers,
            verify=False,
        )

        if get_distribution_result_response.status_code == 200:

            global distribution_result
            distribution_result = get_distribution_result_response.text

            print(f"Job {job_name} executado com sucesso")
            break

        elif get_distribution_result_response.status_code == 400:

            attempts += 1

            print(
                f"Job não localizado ou com erro na tentativa {attempts}, tentando novamente em 1 minuto...",
                end="\r",
            )

            time.sleep(60)

            if attempts == max_attempts:
                print(
                    f"O job {job_name} não foi executado e a instalação não pode prosseguir"
                )

                exit

        else:
            print(
                f"Erro ao verificar o status da distribuição, status: {get_distribution_result_response.status_code}, mensagem: {get_distribution_result_response.text}"
            )


def get_installation_result():

    get_installation_result_endpoint = (
        f"https://lad1-smartcenter.almaden.app/api/public/api/getAllSoftware/nextpage/desktops?AutomatosId={automatos_id}&Securitykey={security_key}&hostname={hostname}"
    )

    #Local onde será salvo o log da instalação
    csv_file = f"\\\\fs\\iso$\\1_log\\{data_formatada_com_hora}-{hostname}.csv"

    #Filtra o ano para localizar a instalação
    filtro = ""
    year_pattern = re.compile(r"20\d{2}")

    match = year_pattern.search(package)
    if match:
        filtro = match.group(0)

    while True:

        get_installation_result_response = requests.get(get_installation_result_endpoint, verify=False)

        data = get_installation_result_response.json().get("data", [])

        headers = [
            "instalation_date",
            "computer_name",
            "software_name",
            "normalized_software_name",
            "machine_type",
        ]

        filtered_data = [
            {
                "instalation_date": software["instalation_date"],
                "computer_name": software["computer_name"],
                "software_name": software["software_name"],
                "normalized_software_name": software["normalized_software_name"],
                "machine_type": software["machine_type"],
            }
            for software in data
            if filtro in software["normalized_software_name"]
            and data_formatada == software["instalation_date"].split(" ")[0]
        ]

        if filtered_data:
            with open(csv_file, mode="w", newline="", encoding="utf-8") as file:
                writer = csv.DictWriter(file, fieldnames=headers, delimiter=";")
                writer.writeheader()
                writer.writerows(filtered_data)
            print(f"\nDados exportados com sucesso para {csv_file}")
            break

        else:

            for remaining in range(5, 0, -1):
                print(
                    f"Nenhum dado encontrado com o valor {filtro} com a data {data_formatada}. Tentando novamente em {remaining} minuto(s)...",
                    end="\r",
                )
                time.sleep(60)

auth_requisiton()
machine_requisiton()
send_distribution()
get_distribution_result()
get_installation_result()
