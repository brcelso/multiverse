#https://learn.microsoft.com/pt-br/powershell/module/microsoft.powershell.core/about/about_remote_troubleshooting?view=powershell-7.4

#winrm set winrm/config/client '@{TrustedHosts="hostname"}'
#$PSVersionTable
#Get-ExecutionPolicy
#Enable-PSRemoting -Force

# 1 - Ativar serviço (automatico) -> Gerenciador de conexão de acesso remoto automático
# 2 - Rodar o comando #winRM quickconfig via PowerShell
# 3 - Rodar o comando Set-ExecutionPolicy Unrestricted via PowerShell

Enter-PSSession -ComputerName (ip|host) -Credential user

#WindowsUpdate
Install-Module PSWindowsUpdate
Get-WindowsUpdate
Install-WindowsUpdate

#ativar SMB
Enable-WindowsOptionalFeature -Online -FeatureName smb1protocol

#New-Item
New-Item -ItemType Directory -Path "\\w300ti100\c$\tmp"

#Copy-Item
Copy-Item -Path C:\Users\Administrator\Desktop\DesktopAgent_2024.exe -Destination '\\wn300ti100\c$\tmp'

# Lista de instaladores
$Path = $env:TEMP
$ChromeInstaller = "chrome_installer.exe"
$7zipInstaller = "\Install_Padrao_Cds\7-Zip 2407\7z2407-x64.exe"
$AdobeReaderInstaller = "\Install_Padrao_Cds\Adobe Reader\Adobe Reader 10.exe"
$ConverterInstaller = "\Install_Padrao_Cds\Cute PDF 4.0\converter.exe"
$CutePDFInstaller = "\Install_Padrao_Cds\Cute PDF 4.0\CuteWriter.exe"
$FilezillaInstaller = "\Install_Padrao_Cds\FileZilla 3.67.0\FileZilla_3.6.0_win32-setup.exe"
$JavavmInstaller = "\Install_Padrao_Cds\JAVA\Java_vm.exe"
$Java86Installer = "\Install_Padrao_Cds\JAVA\jre-6u17-windows-i586.exe"
$Java64Installer = "\Install_Padrao_Cds\JAVA\jre-6u29-windows-x64.exe"
$JseInstaller = "\Install_Padrao_Cds\JAVA\oaj2se.exe"
$NetskopeInstaller = "\Install_Padrao_Cds\Netskope\Windows_NSClient_114.0.0.2012.msi"
$TrendMicroInstaller = "\Install_Padrao_Cds\Trend Micro Office Scan 2020\agent_cloud_x64_08_2020.msi"
$AutomatosInstaller = "\Install_Padrao_Cds\AUTOMATOS 2024\DesktopAgent_2024.exe"

# Instalar o Automatos silenciosamente
#$AutomatosInstaller = "\Install_Padrao_Cds\AUTOMATOS 2024\DesktopAgent_2024.exe"
Start-Process -NoNewWindow -FilePath "$AutomatosInstaller" -Args "/silent" -Wait

# Baixar o instalador do Google Chrome
Invoke-WebRequest "http://dl.google.com/chrome/install/375.126/chrome_installer.exe" -OutFile "$Path\$ChromeInstaller"
# Instalar o Google Chrome silenciosamente
Start-Process -FilePath "$Path\$ChromeInstaller" -Args "/silent /install" -Wait
# Remover o instalador do Google Chrome
Remove-Item "$Path\$ChromeInstaller"

# Instalar o 7-Zip silenciosamente
#$7zipInstaller = "\Install_Padrao_Cds\7-Zip 2407\7z2407-x64.exe"
Start-Process -FilePath "$7zipInstaller" -ArgumentList '/S' -Wait

# Instalar o Adobe Reader silenciosamente
#$AdobeReaderInstaller = "\Install_Padrao_Cds\Adobe Reader\Adobe Reader 10.exe"
Start-Process -FilePath "$AdobeReaderInstaller" -ArgumentList "/sAll /rs EULA_ACCEPT=YES" -Wait

# Instalar o CutePDF silenciosamente
#$CutePDFInstaller = "\Install_Padrao_Cds\Cute PDF 4.0\CuteWriter.exe"
Start-Process -NoNewWindow -FilePath "$CutePDFInstaller" -Args "/silent /install" 

# Instalar o FileZilla silenciosamente
#$FilezillaInstaller = "\Install_Padrao_Cds\FileZilla 3.67.0\FileZilla_3.6.0_win32-setup.exe"
Start-Process -FilePath "$FilezillaInstaller" -ArgumentList '/S' 

# Instalar o Java x86 silenciosamente
#$Java86Installer = "\Install_Padrao_Cds\JAVA\jre-6u17-windows-i586.exe"
Start-Process -FilePath "$Java86Installer" -ArgumentList '/quiet' -Wait

# Instalar o Java x64 silenciosamente
#$Java64Installer = "\Install_Padrao_Cds\JAVA\jre-6u29-windows-x64.exe"
Start-Process -FilePath "$Java64Installer" -ArgumentList '/quiet' -Wait

# Instalar o JSE silenciosamente
$JseInstaller = "\Install_Padrao_Cds\JAVA\oaj2se.exe"
Start-Process -FilePath "$JseInstaller" -ArgumentList '/quiet' -Wait

# Instalar o Netskope silenciosamente
$NetskopeInstaller = "\Install_Padrao_Cds\Netskope\Windows_NSClient_114.0.0.2012.msi"
Start-Process -FilePath "$NetskopeInstaller" -ArgumentList '/quiet' -Wait

# Instalar o Converter silenciosamente
#$ConverterInstaller = "\Install_Padrao_Cds\Cute PDF 4.0\converter.exe"
#Start-Process -NoNewWindow -FilePath "$ConverterInstaller" -Args "/silent /install" 

# Instalar o Java VM silenciosamente
#$JavavmInstaller = "\Install_Padrao_Cds\JAVA\Java_vm.exe"
#Start-Process -FilePath "$JavavmInstaller" -ArgumentList '/quiet' -Wait

# Instalar o Trend Micro silenciosamente
#$TrendMicroInstaller = "\Install_Padrao_Cds\Trend Micro Office Scan 2020\agent_cloud_x64_08_2020.msi"
#Start-Process -FilePath "$TrendMicroInstaller" -ArgumentList '/S' -Wait

----------
copiar a pasta install padrao direto do server
desativar firewall
renomear e ativar o adm
no final limpar os temp (user e pasta)
net user administrador /active:yes
Rename-LocalUser -Name "Administrador" -NewName "mlwkt500"












