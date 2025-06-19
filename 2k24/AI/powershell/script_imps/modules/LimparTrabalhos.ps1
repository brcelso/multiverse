function LimparTrabalhos ($PrinterName, $Servers) {
    $resposta = ""

    
    if ($Servers.Count -le 0) {
        Write-Host `n"Não existem impressoes presas nessa fila"`n -NoNewline -ForegroundColor $global:alert_color
        continue
    }
    
    while ($resposta -ne "s" -and $resposta -ne "n") {
        Write-Host `n"Existem servidores com impressao presa nessa fila, deseja limpar? (s/n): " -NoNewline -ForegroundColor $global:alert_color
        $resposta = Read-Host
        
        if ($resposta -ne "s" -and $resposta -ne "n") {
            $resposta = ""
            Write-Host `n"Resposta invalida, digite somente s ou n"`n -ForegroundColor Yellow
        }
    }
    
    if ($resposta -eq "s") {   
        
        Write-Host ""
        
        foreach ($servidor in $Servers) {

            if ($servidor -eq $global:hostname) {
                Get-PrintJob -PrinterName $PrinterName | Remove-PrintJob
            }
            else {
                Get-PrintJob -PrinterName $PrinterName -CimSession $servidor | Remove-PrintJob
            }

            Loading -Mensagem "Limpando impressoes no servidor $servidor," -TempoDeEspera 5
        }
    }
}