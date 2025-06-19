function EnviarTesteNF($PrinterName) {

    $resposta = ""

    while ($resposta -ne "s" -and $resposta -ne "n") {
        Write-Host `n"Apos a confirmacao sera enviado um impressao de NF para os servidor FA, deseja continuar ? (s/n): " -NoNewline -ForegroundColor $global:alert_color
        $resposta = Read-Host

        if ($resposta -ne "s" -and $resposta -ne "n") {
            $resposta = ""
            Write-Host `n"Resposta invalida, digite somente s ou n"`n -ForegroundColor Yellow
        }
    }

    if ($resposta -eq "s") {

        Write-Host ""

        foreach ($servidor in $global:servidores_teste_NF) {
            try {
                $url = "http://$servidor/ApiImpressaoNfe/ImpressaoDANFE/Imprimir"

                $body = @{
                    ChaveAcesso = "35230547960950003490550020001885031029517812"
                    Impressora  = "$PrinterName"
                }

                $jsonBody = $body | ConvertTo-Json

                $headers = @{
                    "Content-Type"  = "application/json"
                    "Authorization" = "Bearer 71EC877E31CC3DF7BE52BC4D2F595"
                }

                Write-Host -NoNewline `n"Servidor: " -ForegroundColor $global:secondary_color
                Write-Host -NoNewline $servidor
                
                $response = Invoke-WebRequest -Uri $url -Method Post -Body $jsonBody -Headers $headers -TimeoutSec 30


                Write-Host -NoNewline  " Retorno:" -ForegroundColor $global:secondary_color
                Write-Host -NoNewline $response.Content
                
                if ($response.StatusCode -eq "200") {
                    Write-Host -NoNewline " Status: " -ForegroundColor $global:secondary_color
                    Write-Host -NoNewline $response.StatusCode -ForegroundColor Green
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