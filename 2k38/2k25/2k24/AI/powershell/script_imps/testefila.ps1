Set-Location $PSScriptRoot
$host.ui.RawUI.WindowTitle = "Analise de fila"

. ".\config\config.ps1"

#hostname do servidor atual
$_hostname = (Get-CimInstance -ClassName Win32_ComputerSystem).Name
$_domain = (Get-CimInstance -ClassName Win32_ComputerSystem).Domain
$global:hostname = "$_hostname.$_domain"

#inicialização de valores
$global:printer_name = ""
$global:numero_filial = ""
$global:endereco_ip = ""
$global:servidores_driver_errado = @()
$global:servidores_com_impressao_presa = @()

while ($global:numero_filial -eq "") {
    Clear-Host
    Write-Host ""
    $global:numero_filial = Read-Host "Digite o numero da filial"
    
    if ($global:numero_filial -eq "") {
        Write-Host "Campo obrigatorio" -ForegroundColor Yellow
        Start-Sleep -Seconds 2
        Clear-Host
    }
}

#Tratativa de filial com menos de três digitos
if ($global:numero_filial.Length -eq 1) {
    $global:numero_filial = "00$global:numero_filial"
}
elseif ($global:numero_filial.Length -eq 2) {
    $global:numero_filial = "0$global:numero_filial"
}

$global:printer_name = "IMP_" + $global:numero_filial + "_FAT_NF1"

try {
    $global:endereco_ip = (Resolve-DnsName -Name "$global:printer_name.lojas.magazineluiza.intranet" -Server "ml-ibm-adlj04.lojas.magazineluiza.intranet" -ErrorAction Stop).IPAddress 
}
catch {
    Write-Host `n"Falha ao localizar no DNS, registro da fila $printer_name nao existe"`n -ForegroundColor $alert_color
    exit
}

$global:printer_in_use = "IMP_" + $global:numero_filial + "_" + $relacao_host[($global:endereco_ip -split '\.')[-1]]
Set-Clipboard -Value $global:endereco_ip

. ".\modules\Loading.ps1"
. ".\modules\VerificaServidores.ps1"
. ".\modules\LimparTrabalhos.ps1"
. ".\modules\CorrigirDrivers.ps1"
. ".\modules\CriarFila.ps1"
. ".\modules\RecriarFila.ps1"
. ".\modules\ReiniciarPrintSpooler.ps1"
. ".\modules\EnviarTesteNF.ps1"
. ".\modules\EnviarTesteEtiqueta.ps1"
. ".\modules\ExibirMenu.ps1"

#Teste ping
Write-Host `n"Testando ping com 10 pacotes ..."
$ping_test = Test-Connection -ComputerName $global:endereco_ip -Count 10 -ErrorAction SilentlyContinue
$global:ping_sucesso = $ping_test.Count
$global:ping_perdidos = 10 - $global:ping_sucesso


#Consulta SNMP
if ($global:ping_perdidos -ne 10) {
    
    . ".\modules\ConsultaSNMP.ps1"

    Write-Host ""
    
    Write-Host -NoNewline "Status: " -ForegroundColor $global:secondary_color
    Write-Host "Online" -ForegroundColor Green

    Write-Host -NoNewline "Hostname: " -ForegroundColor $global:secondary_color
    Write-Host $global:printer_name

    Write-Host -NoNewline "Fila em uso: " -ForegroundColor $global:secondary_color
    Write-Host $printer_in_use

    Write-Host -NoNewline "IP: " -ForegroundColor $global:secondary_color
    Write-Host $global:endereco_ip

    Write-Host -NoNewline "Ping com sucesso: " -ForegroundColor $global:secondary_color
    Write-Host $global:ping_sucesso

    Write-Host -NoNewline "Ping perdidos: " -ForegroundColor $global:secondary_color
    Write-Host $global:ping_perdidos

    Write-Host -NoNewline "Fabricante: " -ForegroundColor $global:secondary_color
    Write-Host $fabricante

    Write-Host -NoNewline "Modelo da impressora: " -ForegroundColor $global:secondary_color
    Write-Host $modelo

    Write-Host -NoNewline "Toner: "  -ForegroundColor $global:secondary_color
    Write-Host $toner

    Write-Host -NoNewline "Kit Manutencao: "  -ForegroundColor $global:secondary_color
    Write-Host $kit_manutencao

    Write-Host -NoNewline "Unidade de imagem: " -ForegroundColor $global:secondary_color
    Write-Host $unidade_imagem

    Write-Host -NoNewline "Numero de serie: " -ForegroundColor $global:secondary_color
    Write-Host $serial

    Write-Host -NoNewline "Contador: " -ForegroundColor $global:secondary_color
    Write-Host $contador

    VerificaServidores -PrinterName $global:printer_name

    if (-not $relacao_driver.ContainsKey($modelo)) {
        Write-Host `n"Obs: O modelo de impressora nao existe na relacao de drivers"`n -ForegroundColor $global:alert_color
        exit
    }

    #Chama exibirMenu() passando as opções
    do {
        $opcoes = @(
            "Corrigir drivers", 
            "Limpar trabalhos", 
            "Reiniciar print spooler", 
            "Recriar fila",
            "Criar Fila", 
            "Enviar testes de NF",
            "Enviar testes de etiqueta",
            "Fazer nova verificacao", 
            "Encerrar aplicacao"
        )

        $opcao_escolhida = ExibirMenu -Opcoes $opcoes

        switch ($opcao_escolhida) {
            $opcoes[0] { CorrigirDrivers -PrinterName $global:printer_name -DriverName $relacao_driver[$modelo] }
            $opcoes[1] { LimparTrabalhos -PrinterName $global:printer_name -Servers $global:servidores_com_impressao_presa }
            $opcoes[2] { ReiniciarPrintSpooler -Servers $global:servidores_com_impressao_presa }
            $opcoes[3] { RecriarFila -PrinterName $global:printer_name -DriverName $relacao_driver[$modelo] }
            $opcoes[4] { CriarFila -PrinterName $global:printer_name -DriverName $relacao_driver[$modelo] }
            $opcoes[5] { EnviarTesteNF -PrinterName $global:printer_name }
            $opcoes[6] { EnviarTesteEtiqueta -PrinterName $global:printer_name }
            $opcoes[7] { VerificaServidores -PrinterName $global:printer_name }
            $opcoes[8] { $SNMP.Close(); Clear-Host }
        }
    } while ($opcao_escolhida -ne "Encerrar aplicacao")
}
else {
    Write-Host ""

    Write-Host -NoNewline "Status: " -ForegroundColor $global:secondary_color
    Write-Host "Offline" -ForegroundColor Red

    Write-Host -NoNewline "Hostname: " -ForegroundColor $global:secondary_color
    Write-Host $global:printer_name

    Write-Host -NoNewline "Fila em uso: " -ForegroundColor $global:secondary_color
    Write-Host $global:printer_in_use

    Write-Host -NoNewline "IP: " -ForegroundColor $global:secondary_color
    Write-Host $global:endereco_ip

    Write-Host -NoNewline "Ping com sucesso: " -ForegroundColor $global:secondary_color
    Write-Host $global:ping_sucesso

    Write-Host -NoNewline "Ping com perdidos: " -ForegroundColor $global:secondary_color
    Write-Host $global:ping_perdidos

    VerificaServidores -PrinterName $global:printer_name

    Write-Host ""
}