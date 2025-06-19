Set-Location $PSScriptRoot

$servidores = @(
    "ibm-balboa-fa01.magalu.io",
    "ibm-balboa-fa02.magalu.io",
    "ibm-balboa-fa03.magalu.io",
    "ibm-balboa-fa04.magalu.io",
    "ibm-balboa-fa05.magalu.io",
    "ibm-balboa-fa06.magalu.io",
    "ibm-balboa-fa07.magalu.io",
    "ml-ibm-pimaco05.magalu.io",
    "ml-ibm-pimaco06.magalu.io",
    "ml-ibm-pimaco07.magalu.io",
    "ml-ibm-pimaco08.magalu.io"
)

#hostname do servidor atual
$_hostname = (Get-CimInstance -ClassName Win32_ComputerSystem).Name
$_domain = (Get-CimInstance -ClassName Win32_ComputerSystem).Domain
$global:hostname = "$_hostname.$_domain"

foreach ($servidor in $servidores) {

    Write-Host `n"Servidor" $servidor -ForegroundColor Cyan
    $FilasEmEstadoDeErro = Get-Printer -CimSession $servidor | Where-Object { $_.PrinterStatus -eq "Error" } | Select-Object -ExpandProperty Name
            
    foreach ($fila in $FilasEmEstadoDeErro) {
        
        Write-Host -NoNewline "Fila $fila" -ForegroundColor DarkCyan

        try {
            $jobs = Get-PrintJob -PrinterName $fila -CimSession $servidor | Select-Object Id -ExpandProperty Id
        }
        catch {
            Write-Host " - Falha ao localizar impressoes, servidor indisponivel" -ForegroundColor Yellow
        }

        if ($jobs) {
            $countJobsDeleted = $jobs.count
            Write-Host " - $countJobsDeleted trabalho[s] removidos"
            foreach ($job in $jobs) {
                if ($servidor -eq $global:hostname) {
                    Remove-PrintJob -PrinterName $fila -ID $job -ErrorAction SilentlyContinue
                }
                else {
                    Remove-PrintJob -PrinterName $fila -ID $job -CimSession $servidor -ErrorAction SilentlyContinue
                }        
            }
        }
    }
}
