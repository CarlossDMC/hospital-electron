@echo on
echo.
echo === Iniciando Script de Inicialização ===
echo.

echo Executando 'mvn clean'...
mvn clean
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] 'mvn clean' falhou.
    pause
    EXIT /B %ERRORLEVEL%
)
pause

echo Executando 'mvn install'...
mvn install
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] 'mvn install' falhou.
    pause
    EXIT /B %ERRORLEVEL%
)
pause

echo Iniciando a aplicação Java...
start cmd /k "mvn exec:java"
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao iniciar a aplicação Java.
    pause
)
pause

echo Navegando para o diretório Node.js...
cd src\main\java\org\ifsc\view
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Diretório Node.js não encontrado.
    pause
    EXIT /B %ERRORLEVEL%
)
pause

echo Instalando dependências do Node.js...
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] 'npm install' falhou.
    pause
    EXIT /B %ERRORLEVEL%
)
pause

echo Iniciando o aplicativo Node.js...
start cmd /k "npm start"
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao iniciar o aplicativo Node.js.
    pause
)
pause

echo Retornando ao diretório raiz...
cd %~dp0
IF %ERRORLEVEL% NEQ 0 (
    echo [ERRO] Falha ao retornar ao diretório raiz.
    pause
)
pause

echo.
echo === Script de Inicialização Concluído ===
echo.
pause
