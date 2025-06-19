function RecriarFila($PrinterName, $DriverName) {
    $resposta = ""

    while ($resposta -ne "s" -and $resposta -ne "n") {
        Write-Host `n"Apos a confirmacao a fila $PrinterName sera excluida e criada novamente, deseja continuar ? (s/n): " -NoNewline -ForegroundColor $global:alert_color
        $resposta = Read-Host

        if ($resposta -ne "s" -and $resposta -ne "n") {
            $resposta = ""
            Write-Host `n"Resposta invalida, digite somente s ou n"`n -ForegroundColor Yellow
        }
    }

    if ($resposta -eq "s") {

        Write-Host ""

        #Excluir fila
        foreach ($servidor in $global:servidores) {
            if ($servidor -eq $global:hostname) {
                try {
                    Remove-Printer -Name $PrinterName -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao excluir a fila no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
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
                    Remove-Printer -Name $PrinterName -CimSession $session -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao excluir a fila no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
                }
                
            }
        }

        Loading -Mensagem "Removendo filas, " -TempoDeEspera 40

        #Excluir porta
        foreach ($servidor in $global:servidores) {
            if ($servidor -eq $global:hostname) {
                try {
                    Remove-PrinterPort -Name $PrinterName -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao excluir a porta no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
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
                    Remove-PrinterPort -Name $PrinterName -CimSession $session -AsJob | Out-Null
                }
                catch {
                    Write-Host "Erro ao excluir a porta no servidor $servidor`:" $Error[0] -ForegroundColor $global:alert_color
                }
                
            }

        }

        Loading -Mensagem "Removendo portas, " -TempoDeEspera 20
        
        CriarFila -PrinterName $PrinterName -DriverName $DriverName

    }
}