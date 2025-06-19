function EnviarTesteEtiqueta($PrinterName) {

    $resposta = ""

    while ($resposta -ne "s" -and $resposta -ne "n") {
        Write-Host `n"Apos a confirmacao sera enviado um teste de impressao de etiquetas para os servidores Pimaco, deseja continuar ? (s/n): " -NoNewline -ForegroundColor $global:alert_color
        $resposta = Read-Host

        if ($resposta -ne "s" -and $resposta -ne "n") {
            $resposta = ""
            Write-Host `n"Resposta invalida, digite somente s ou n"`n -ForegroundColor Yellow
        }
    }

    if ($resposta -eq "s") {

        Write-Host ""

        foreach ($servidor in $global:servidores_teste_etiqueta) {
            try {
                # $url = "http://vip-pimaco.magalu.io:8080/Pimaco.Api/api/CustomerLabel" #URL para envio para o load balancer
                $url = "http://localhost:80/Pimaco.Api/api/CustomerLabel" #URL para envio de dentro do próprio servidor Pimaco

                $body = @{
                    branchCode = "$global:numero_filial"
                    print      = "$PrinterName"
                    fileInfo   = @{
                        bytes = "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"
                    }
                }

                $jsonBody = $body | ConvertTo-Json

                $headers = @{
                    "Content-Type" = "application/json"
                }

                Write-Host -NoNewline `n"Servidor: " -ForegroundColor $global:secondary_color
                Write-Host -NoNewline $servidor
                
                Invoke-Command -ComputerName $servidor -ScriptBlock {
                    try {
                        $response = Invoke-WebRequest -Uri $using:url -Method Post -Body $using:jsonBody -Headers $using:headers -TimeoutSec 30 -ErrorAction Stop

                        Write-Host -NoNewline  " Retorno: " -ForegroundColor DarkCyan
                        Write-Host -NoNewline $response.Content
                
                        if ($response.StatusCode -eq "200") {
                            Write-Host -NoNewline " Status: " -ForegroundColor DarkCyan
                            Write-Host -NoNewline $response.StatusCode -ForegroundColor Green
                        }
                    }
                    catch {
                        Write-Host -NoNewline  " Retorno: " -ForegroundColor DarkCyan
                        Write-Host -NoNewline "Erro ao enviar ("$Error[0]")" -ForegroundColor Yellow
                    }
                }

                Start-Sleep -Seconds 10
                
                Write-Host -NoNewline " Contador da impressora: " -ForegroundColor $global:secondary_color
                $contador = consultaSNMP -OID $global:contador_OID
                
                Start-Sleep -Seconds 10
                
                Write-Host $contador          
            }
            catch {
                Write-Host `n"Houve um erro ao enviar a requisicao:" $Error[0] -ForegroundColor $global:alert_color
            }
        }
    }
}