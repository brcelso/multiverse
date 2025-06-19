function CorrigirDrivers($PrinterName, $DriverName) {

    $resposta = ""

    while ($resposta -ne "s" -and $resposta -ne "n") {
        Write-Host `n"Apos a confirmacao a fila $PrinterName tera o driver alterado para $DriverName ? (s/n): " -NoNewline -ForegroundColor $global:alert_color
        $resposta = Read-Host

        if ($resposta -ne "s" -and $resposta -ne "n") {
            $resposta = ""
            Write-Host `n"Resposta invalida, digite somente s ou n"`n -ForegroundColor Yellow
        }
    }

    if ($resposta -eq "s") {
        Write-Host `n"Alterando drivers nos servidores, aguarde .."`n

        foreach ($servidor in $global:servidores_driver_errado) {

            if ($servidor -eq $global:hostname) {
                Set-Printer -Name $PrinterName -DriverName $DriverName -AsJob | Out-Null
            }
            else {
                Invoke-Command -ComputerName $servidor -ScriptBlock { Set-Printer -Name $Using:PrinterName -DriverName $Using:DriverName } -AsJob | Out-Null
            }
        }
            
        Loading -Mensagem "Trocando drivers," -TempoDeEspera 15

        VerificaServidores -PrinterName $PrinterName
    }
}