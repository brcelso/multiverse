$SNMP = New-Object -ComObject olePrn.OleSNMP
$SNMP.open($global:endereco_ip, "public", 2, 1000)
    
$fabricante = consultaSNMP -OID $global:fabricante_OID
$serial = consultaSNMP -OID $global:serial_OID
$contador = consultaSNMP -OID $global:contador_OID

if ($fabricante -eq "HP" -or $fabricante -eq "Hewlett-Packard") {
    $modelo = consultaSNMP -OID $global:hp_modelo_OID

    if ($modelo -eq "HP LaserJet Pro MFP M428fdw") {
        $toner = consultaSNMP -OID $global:toner_hp_OID
        $unidade_imagem = "Nao possui"
        $kit_manutencao = "Nao possui"
    }
    elseif ($modelo -eq "HP Laser 408dn" -or $modelo -eq "HP Laser MFP 432fdn") {
        $toner = [Math]::Round((consultaSNMP -OID $global:toner_hp_408_OID) / 150, 0)
        $unidade_imagem = [Math]::Round((consultaSNMP -OID $global:unidade_imagem_hp_408_OID) / 300, 0)
        $kit_manutencao = "Nao possui"
    }
    else {
        $toner = consultaSNMP -OID $global:toner_hp_OID
        $kit_manutencao = consultaSNMP -OID $global:kit_manutencao_OID
        $unidade_imagem = "Nao possui"
    }
}
    
if ($fabricante -eq "Samsung Electronics" -or $fabricante -eq "Samsung Electronics Ltd") {
    $modelo = consultaSNMP -OID $global:samsung_modelo_OID
    $toner = consultaSNMP -OID $global:toner_samsung_OID

    if ($modelo -eq "M332x 382x 402x Series") {
        $unidade_imagem = "Nao possui"
    }
    else {
        $unidade_imagem = [Math]::Round((consultaSNMP -OID $global:unidade_imagem_OID) / 600, 0)
    }

    $kit_manutencao = "Nao possui"
}
else {
    $modelo = consultaSNMP -OID $global:hp_modelo_OID

    if (!$modelo -or $modelo -eq "") {
        $modelo = "Nao encontrado"
    }
}