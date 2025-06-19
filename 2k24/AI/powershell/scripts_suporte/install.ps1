# Instalar o Automatos silenciosamente
$AutomatosInstaller = "\Install_Padrao_Cds\AUTOMATOS 2024\DesktopAgent_2024.exe"
Start-Process -NoNewWindow -FilePath "$AutomatosInstaller" -Args "/silent" -Wait

# Baixar o instalador do Google Chrome
$Path = $env:TEMP
$ChromeInstaller = "chrome_installer.exe"
Invoke-WebRequest "http://dl.google.com/chrome/install/375.126/chrome_installer.exe" -OutFile "$Path\$ChromeInstaller"
# Instalar o Google Chrome silenciosamente
Start-Process -FilePath "$Path\$ChromeInstaller" -Args "/silent /install" -Wait
# Remover o instalador do Google Chrome
Remove-Item "$Path\$ChromeInstaller"

# Instalar o 7-Zip silenciosamente
$7zipInstaller = "\Install_Padrao_Cds\7-Zip 2407\7z2407-x64.exe"
Start-Process -FilePath "$7zipInstaller" -ArgumentList '/S' -Wait

# Instalar o Adobe Reader silenciosamente
$AdobeReaderInstaller = "\Install_Padrao_Cds\Adobe Reader\Adobe Reader 10.exe"
Start-Process -FilePath "$AdobeReaderInstaller" -ArgumentList "/sAll /rs EULA_ACCEPT=YES" -Wait

# Instalar o CutePDF silenciosamente
$CutePDFInstaller = "\Install_Padrao_Cds\Cute PDF 4.0\CuteWriter.exe"
Start-Process -NoNewWindow -FilePath "$CutePDFInstaller" -Args "/silent /install" 

# Instalar o FileZilla silenciosamente
$FilezillaInstaller = "\Install_Padrao_Cds\FileZilla 3.67.0\FileZilla_3.6.0_win32-setup.exe"
Start-Process -FilePath "$FilezillaInstaller" -ArgumentList '/S' 

# Instalar o Java x86 silenciosamente
$Java86Installer = "\Install_Padrao_Cds\JAVA\jre-6u17-windows-i586.exe"
Start-Process -FilePath "$Java86Installer" -ArgumentList '/quiet' -Wait

# Instalar o Java x64 silenciosamente
$Java64Installer = "\Install_Padrao_Cds\JAVA\jre-6u29-windows-x64.exe"
Start-Process -FilePath "$Java64Installer" -ArgumentList '/quiet' -Wait

# Instalar o JSE silenciosamente
$JseInstaller = "\Install_Padrao_Cds\JAVA\oaj2se.exe"
Start-Process -FilePath "$JseInstaller" -ArgumentList '/quiet' -Wait

# Instalar o Netskope silenciosamente
$NetskopeInstaller = "\Install_Padrao_Cds\Netskope\Windows_NSClient_114.0.0.2012.msi"
Start-Process -FilePath "$NetskopeInstaller" -ArgumentList '/quiet' -Wait

