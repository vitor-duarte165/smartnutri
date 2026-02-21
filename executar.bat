@echo off
title SmartNutri - Iniciando...
color 0A

echo ========================================
echo   SmartNutri - Iniciando Aplicacao
echo ========================================
echo.

echo Verificando Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Node.js nao encontrado!
    echo Por favor, instale o Node.js primeiro.
    echo Veja o arquivo INSTALACAO.md para instrucoes.
    echo.
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Verificando dependencias...
if not exist "node_modules" (
    echo.
    echo Dependencias nao encontradas!
    echo Executando instalacao automatica...
    echo.
    call instalar.bat
    echo.
    if %ERRORLEVEL% NEQ 0 (
        echo Erro na instalacao!
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo   Iniciando servidor...
echo ========================================
echo.
echo A aplicacao sera aberta automaticamente no navegador!
echo.
echo Para parar o servidor, feche esta janela ou pressione Ctrl+C
echo.
echo Aguarde alguns segundos...
echo.

cd /d "%~dp0"

REM Inicia o servidor e abre o navegador após 3 segundos
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:5173"

npm run dev
