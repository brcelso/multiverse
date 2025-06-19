function ExibirMenu($Opcoes) {
    $selecao = 0

    # Função para escrever a opção do menu
    function Write-MenuOption($index, $opcao, $selected) {
        $seta = if ($selected) { ">" } else { " " }
        $color = if ($selected) { $global:menu_primary_color } else { $global:menu_secondary_color }
        Write-Host "`r$seta $opcao" -ForegroundColor $color -NoNewline
    }

    Write-Host `n`n"--- Selecione uma das opcoes a seguir ---"`n

    # Exibe as opções pela primeira vez
    for ($i = 0; $i -lt $Opcoes.Count; $i++) {
        Write-MenuOption -index $i -opcao $Opcoes[$i] -selected:($i -eq $selecao)
        Write-Host ""
    }

    do {
        # Move o cursor para a primeira opção
        $host.UI.RawUI.CursorPosition = @{ X = 0; Y = [System.Console]::CursorTop - $Opcoes.Count }

        for ($i = 0; $i -lt $Opcoes.Count; $i++) {
            Write-MenuOption -index $i -opcao $Opcoes[$i] -selected:($i -eq $selecao)
            Write-Host ""
        }

        # Aguarda a entrada do usuário
        $tecla = $null
        $tecla = $host.UI.RawUI.ReadKey("NoEcho, IncludeKeyDown")

        # Atualiza a seleção com base na tecla pressionada
        switch ($tecla.VirtualKeyCode) {
            38 { $selecao = [Math]::Max(0, $selecao - 1) }  # Seta para cima
            40 { $selecao = [Math]::Min($Opcoes.Count - 1, $selecao + 1) }  # Seta para baixo
        }
    } while ($tecla.VirtualKeyCode -ne 13)  # Continue até que Enter seja pressionado

    return $Opcoes[$selecao]
}