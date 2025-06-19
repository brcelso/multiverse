function ReiniciarPrintSpooler($Servers) {

    $resposta = ""

    while ($resposta -ne "s" -and $resposta -ne "n") {
        Write-Host `n"Apos a confirmacao os print spoolers dosservidores com impressao presa na fila serao reiniciados, deseja continuar ? (s/n): " -NoNewline -ForegroundColor $global:alert_color
        $resposta = Read-Host

        if ($resposta -ne "s" -and $resposta -ne "n") {
            $resposta = ""
            Write-Host `n"Resposta invalida, digite somente s ou n"`n -ForegroundColor Yellow
        }
    }

    if ($resposta -eq "s") {
        if ($Servers.Count -gt 0) {
            foreach ($servidor in $Servers) {
                Write-Host "`nReiniciando print spooler do servidor $servidor"

                if ($servidor -eq $global:hostname) {
                    Invoke-Command -ComputerName $servidor -ScriptBlock { Restart-Service -Name "Spooler" -Force }
                }
                else {
                    Restart-Service -Name "Spooler" -Force
                }
            }
        }
        else {
            Write-Host `n"Nao ha impressoes presas"`n
        }
    }
}