function Loading() {

    [CmdletBinding()]
    param(
        [String]$Mensagem,
        [int]$TempoDeEspera
    )

    $steps = 100
    $interval = $TempoDeEspera / $steps

    for ($i = 1; $i -le $steps; $i++) {
        $counter = [Math]::Round(($i / $steps) * 100)
        Write-Host -NoNewline "`r$Mensagem $counter% processados"
        Start-Sleep -Milliseconds ($interval * 1000)
    }
    Write-Host ""
}