function VerificaServidores($PrinterName) {

    Write-Host `n`n"--- Status nos servidores ---"`n

    $global:servidores_driver_errado = @()
    $global:servidores_com_impressao_presa = @()

    foreach ($servidor in $global:servidores) {

        try {
            if ($servidor -eq $global:hostname) {
                $printer_data = Get-Printer -Name $PrinterName -ErrorAction Stop | Select-Object "DriverName", "PrinterStatus", "PortName"
                $printer_jobs = Get-PrintJob -PrinterName $PrinterName -ErrorAction Stop
                $printer_port = Get-PrinterPort -Name ($printer_data).PortName -ErrorAction Stop | Select-Object -ExpandProperty "PrinterHostAddress"
            }
            else {
                try {
                    $session = New-CimSession -ComputerName $servidor -ErrorAction Stop
                }
                catch {
                    Write-Host "Nao foi possivel conectar ao servidor $servidor"
                    Continue
                }

                $printer_data = Get-Printer -CimSession $session -Name $PrinterName -ErrorAction Stop | Select-Object "DriverName", "PrinterStatus", "PortName"
                $printer_jobs = Get-PrintJob -CimSession $session -PrinterName $PrinterName -ErrorAction Stop
                $printer_port = Get-PrinterPort -CimSession $session -Name ($printer_data).PortName -ErrorAction Stop | Select-Object -ExpandProperty "PrinterHostAddress"

                $session.Close()
            }

            
            $job_count = ($printer_jobs | Measure-Object).Count

            if ($modelo) {
                if ($relacao_driver.ContainsKey($modelo)) {
                    if ($relacao_driver[$modelo] -ne ($printer_data).DriverName) {
                        $global:servidores_driver_errado += $servidor
                    }
                }
            }

            if ($job_count -gt 0) {
                $global:servidores_com_impressao_presa += $servidor
            }

            Write-Host -NoNewline "Servidor: " -ForegroundColor $global:secondary_color
            Write-Host -NoNewline $servidor
    
            Write-Host -NoNewline " Status: " -ForegroundColor $global:secondary_color
            Write-Host -NoNewline ($printer_data).PrinterStatus
    
            Write-Host -NoNewline " Trabalhos: " -ForegroundColor $global:secondary_color
            Write-Host -NoNewline $job_count
    
            Write-Host -NoNewline " Driver: " -ForegroundColor $global:secondary_color
            Write-Host -NoNewline ($printer_data).DriverName
    
            Write-Host -NoNewline " Porta: " -ForegroundColor $global:secondary_color
            Write-Host $printer_port


        }
        catch {
            Write-Host "Fila $PrinterName nao encontrada no servidor $servidor" -ForegroundColor $global:alert_color
        }
    }
}