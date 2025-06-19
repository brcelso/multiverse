function CriarFila($PrinterName, $DriverName) {

    while ($resposta -ne "s" -and $resposta -ne "n") {
        Write-Host `n"Apos a confirmacao a fila $PrinterName sera criada, deseja continuar ? (s/n): " -NoNewline -ForegroundColor $global:alert_color
        $resposta = Read-Host

        if ($resposta -ne "s" -and $resposta -ne "n") {
            $resposta = ""
            Write-Host `n"Resposta invalida, digite somente s ou n"`n -ForegroundColor Yellow
        }
    }

    if ($resposta -eq "s") {

        Write-Host ""

        $LPName = "$PrinterName.lojas.magazineluiza.intranet"

        #Criar porta
        foreach ($servidor in $global:servidores) {
            if ($servidor -eq $global:hostname) {
                try {
                    Add-PrinterPort -name $PrinterName -LprQueueName $PrinterName -LprHostAddress $LPName -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao criar a porta no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
                }
            }
            else {
                try {
                    $session = New-CimSession -ComputerName $servidor
                }
                catch {
                    Write-Host "Nao foi possivel conectar ao servidor $servidor"
                    Continue
                }
                        
                try {
                    Add-PrinterPort -name $PrinterName -CimSession $session -LprQueueName $PrinterName -LprHostAddress $LPName -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao criar a porta no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
                }
                        
            }
        
        }

        Loading -Mensagem "Criando portas, " -TempoDeEspera 40
        
        #Criar fila
        foreach ($servidor in $global:servidores) {
            if ($servidor -eq $global:hostname) {
                try {
                    Add-Printer -Name $PrinterName -DriverName $DriverName -PortName $PrinterName -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao criar a fila no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
                }
            }
            else {
                try {
                    $session = New-CimSession -ComputerName $servidor
                }
                catch {
                    Write-Host "Nao foi possivel conectar ao servidor $servidor"
                    Continue
                }
                        
                try {
                    Add-Printer -Name $PrinterName -CimSession $session -DriverName $DriverName -PortName $PrinterName -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao criar a fila no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
                }
                        
            }
        
        }

        Loading -Mensagem "Criando filas, " -TempoDeEspera 20

        VerificaServidores -PrinterName $PrinterName
    }
}