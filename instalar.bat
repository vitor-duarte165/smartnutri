@echo off
echo ========================================
echo   SmartNutri - Instalacao de Dependencias
echo ========================================
echo.

echo Verificando Node.js...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERRO] Node.js nao encontrado!
    echo.
    echo Por favor, instale o Node.js primeiro:
    echo 1. Acesse: https://nodejs.org
    echo 2. Baixe a versao LTS
    echo 3. Instale e REINICIE o Cursor
    echo.
    pause
    exit /b 1
)

echo Node.js encontrado!
node --version
npm --version
echo.

echo Instalando dependencias...
echo Isso pode demorar alguns minutos na primeira vez...
echo.

cd /d "%~dp0"
npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Instalacao concluida com sucesso!
    echo ========================================
    echo.
    echo Para executar a aplicacao, use:
    echo   npm run dev
    echo.
) else (
    echo.
    echo [ERRO] Falha na instalacao!
    echo Verifique sua conexao com a internet.
    echo.
)

pause
