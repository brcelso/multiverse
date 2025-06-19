$global:servidores = @(
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

$global:servidores_teste_NF = @(
    "ibm-balboa-fa01.magalu.io",
    "ibm-balboa-fa02.magalu.io",
    "ibm-balboa-fa03.magalu.io",
    "ibm-balboa-fa04.magalu.io",
    "ibm-balboa-fa05.magalu.io"
)

$global:servidores_teste_etiqueta = @(
    "ml-ibm-pimaco05.magalu.io",
    "ml-ibm-pimaco06.magalu.io",
    "ml-ibm-pimaco07.magalu.io",
    "ml-ibm-pimaco08.magalu.io"
)

$relacao_driver = @{
    "M332x 382x 402x Series"      = "Samsung Universal Print V3.00.13.00"
    "M4580FX"                     = "Samsung Universal Print V3.00.13.00"
    "ML-375x Series"              = "Samsung Universal Print V3.00.13.00"
    "ML-451x 501x Series"         = "Samsung Universal Print V3.00.13.00"
    "Samsung ML-451x 501x Series" = "Samsung Universal Print V3.00.13.00"
    "SCX-6x55X Series"            = "Samsung Universal Print V3.00.13.00"
    "M4080FX"                     = "Samsung Universal Print V3.00.13.00"
    "Samsung M408x Series"        = "Samsung Universal Print V3.00.13.00"
    "Samsung M458x Series"        = "Samsung Universal Print V3.00.13.00"
    "M5360RX"                     = "Samsung Universal Print V3.00.13.00"
    "HP Laser MFP 432fdn"         = "HP Universal Printing PCL 6"
    "HP Laser 408dn"              = "HP Laser 408 PCL6"
    "HP LaserJet MFP E52645"      = "HP Universal Printing PCL 6"
    "HP LaserJet Pro MFP M428fdw" = "HP Universal Printing PCL 6"
    "HP LaserJet Pro M404dw"      = "HP Universal Printing PCL 6"
}

$relacao_host = @{
    "191" = "MOVEIS1"
    "192" = "CINEFOTO1"
    "193" = "ELETRO1"
    "194" = "SOMIMAGEM1"
    "195" = "PRESENTES1"
    "196" = "TELEFONIA1"
    "197" = "BRINQUEDOS1"
    "198" = "INFORMATICA1"
    "199" = "HOBBYLAZER1"
    "200" = "MOVEIS2"
    "201" = "CINEFOTO2"
    "202" = "ELETRO2"
    "203" = "SOMIMAGEM2"
    "204" = "PRESENTES2"
    "205" = "TELEFONIA2"
    "206" = "BRINQUEDOS2"
    "207" = "INFORMATICA2"
    "208" = "HOBBYLAZER2"
    "209" = "MOVEIS3"
    "210" = "CINEFOTO3"
    "211" = "ELETRO3"
    "212" = "SOMIMAGEM3"
    "213" = "PRESENTES3"
    "214" = "TELEFONIA3"
    "215" = "BRINQUEDOS3"
    "216" = "INFORMATICA3"
    "217" = "HOBBYLAZER3"
    "218" = "MOVEIS4"
    "219" = "CINEFOTO4"
    "220" = "ELETRO4"
    "221" = "SOMIMAGEM4"
    "222" = "PRESENTES4"
    "223" = "TELEFONIA4"
    "224" = "BRINQUEDOS4"
    "225" = "INFORMATICA4"
    "226" = "HOBBYLAZER4"
    "227" = "APOIO1"
    "228" = "APOIO2"
    "229" = "APOIO3"
    "230" = "APOIO4"
    "231" = "CARNE1"
    "232" = "CARNE2"
    "233" = "CARNE3"
    "234" = "CARNE4"
    "235" = "VAGO"
    "236" = "CONTRATO1"
    "237" = "CONTRATO2"
    "238" = "CONTRATO3"
    "239" = "CONTRATO4"
    "240" = "VAGO"
    "241" = "VJATO1"
    "245" = "CONFECCA1"
    "242" = "CONFECCA2"
    "243" = "CONFECCA3"
    "244" = "CONFECCA4"
}

#Cores
$global:primary_color = "Cyan"
$global:secondary_color = "DarkCyan"
$global:menu_primary_color = "white"
$global:menu_secondary_color = "gray"
$global:alert_color = "Yellow"
$global:danger_color = "Red"

#OID Geral
$global:serial_OID = ".1.3.6.1.2.1.43.5.1.1.17.1"
$global:fabricante_OID = ".1.3.6.1.2.1.43.8.2.1.14.1.1"
$global:unidade_imagem_OID = ".1.3.6.1.2.1.43.11.1.1.9.1.2"
$global:kit_manutencao_OID = ".1.3.6.1.2.1.43.11.1.1.9.1.2"
$global:contador_OID = ".1.3.6.1.2.1.43.10.2.1.4.1.1"

#OID Samsung
$global:samsung_modelo_OID = ".1.3.6.1.4.1.236.11.5.1.1.1.1.0"
$global:toner_samsung_OID = ".1.3.6.1.4.1.236.11.5.1.1.3.22.0"

#OID HP
$global:hp_modelo_OID = ".1.3.6.1.2.1.25.3.2.1.3.1"
$global:toner_hp_OID = ".1.3.6.1.2.1.43.11.1.1.9.1.1"

#OID HP 408
$global:toner_hp_408_OID = ".1.3.6.1.2.1.43.11.1.1.9.1.1"
$global:unidade_imagem_hp_408_OID = ".1.3.6.1.2.1.43.11.1.1.9.1.2"

function consultaSNMP($OID) {
    try {
        $consulta = $SNMP.get($OID)
    }
    catch {
        $consulta = "Nao localizado"
    }
    return $consulta
}