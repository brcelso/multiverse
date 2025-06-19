@echo off
REM ************ MANAGEENGINE ENDPOINTCENTRAL AGENT INSTALLATION ************

REM Valores fornecidos aqui são os argumentos padrão. Modifique esses valores conforme necessário ao executar o script.
SET ExeFileName=DefaultRemoteOffice_Agent_Windows.exe
SET InstallSource=Local

REM Verifique a arquitetura do sistema (64-bit ou 32-bit)
SET REGKEY=
IF EXIST "C:\Program Files (x86)\AdventNet\DesktopCentral\DCAgent" (
    SET REGKEY=HKLM\SOFTWARE\Wow6432Node\AdventNet\DesktopCentral\DCAgent
    ECHO Arquitetura 64-bit detectada
) ELSE (
    SET REGKEY=HKLM\SOFTWARE\AdventNet\DesktopCentral\DCAgent
    ECHO Arquitetura 32-bit detectada
)

REM Verifique se o agente já está instalado
REG QUERY "%REGKEY%" >nul 2>nul
IF %ERRORLEVEL% EQU 0 (
    REM Agente já instalado, verificar a versão
    FOR /F "tokens=3" %%A IN ('REG QUERY "%REGKEY%" /v DCAgentVersion') DO SET agentVersion=%%A
)

REM Se a versão do agente não for encontrada, instale o agente
IF NOT DEFINED agentVersion (
    REM Definir o comando de instalação com parâmetros adequados
    SET InstallCmd=%~dp0%ExeFileName% -s -r -f1"%systemroot%\temp\install.iss" /silent INSTALLSOURCE=%InstallSource%

    REM Executar o comando de instalação
    echo Executando instalação do agente...
    %InstallCmd%
)

exit /b
