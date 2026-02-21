# 🚀 GUIA DE INSTALAÇÃO - SmartNutri

## ⚠️ IMPORTANTE: Você precisa instalar o Node.js primeiro!

### PASSO 1: Instalar Node.js

1. **Abra seu navegador** e acesse: **https://nodejs.org**

2. **Clique no botão verde** que diz **"Download Node.js (LTS)"** 
   - LTS significa "Long Term Support" (versão estável recomendada)

3. **Execute o arquivo baixado** (será algo como `node-v20.x.x-x64.msi`)

4. **No instalador:**
   - Clique em **"Next"** várias vezes
   - **IMPORTANTE**: Marque a opção **"Automatically install the necessary tools"** se aparecer
   - Clique em **"Install"**
   - Aguarde a instalação terminar
   - Clique em **"Finish"**

5. **FECHE COMPLETAMENTE O CURSOR/VSCode** e abra novamente
   - Isso é necessário para o sistema reconhecer o Node.js

### PASSO 2: Verificar se funcionou

1. Abra o **PowerShell** ou **Terminal** no Cursor
2. Digite: `node --version`
3. Deve aparecer algo como: `v20.x.x`
4. Digite: `npm --version`
5. Deve aparecer algo como: `10.x.x`

✅ **Se aparecerem os números, está funcionando!**

### PASSO 3: Instalar as dependências do projeto

No terminal do Cursor, dentro da pasta do projeto, digite:

```powershell
cd C:\Users\User\Desktop\smartnutri
npm install
```

Isso vai instalar todas as bibliotecas necessárias (pode demorar alguns minutos na primeira vez).

### PASSO 4: Executar a aplicação

Depois que o `npm install` terminar, digite:

```powershell
npm run dev
```

Você verá uma mensagem como:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### PASSO 5: Abrir no navegador

1. **Copie o endereço**: `http://localhost:5173`
2. **Cole no seu navegador** (Chrome, Edge, Firefox, etc.)
3. **Pronto!** A aplicação SmartNutri estará funcionando! 🎉

---

## ❌ Se algo der errado:

### Erro: "npm não é reconhecido"
- **Solução**: Você não fechou e reabriu o Cursor após instalar o Node.js
- **Faça**: Feche completamente o Cursor e abra novamente

### Erro: "Cannot find module"
- **Solução**: Execute `npm install` novamente na pasta do projeto

### Erro: "Port 5173 already in use"
- **Solução**: Alguém já está usando essa porta. Feche outras aplicações ou reinicie o computador

### Ainda não funciona?
- Verifique se você está na pasta correta: `C:\Users\User\Desktop\smartnutri`
- Tente executar: `cd C:\Users\User\Desktop\smartnutri` antes de `npm install`

---

## 📞 Precisa de mais ajuda?

Se ainda tiver problemas, me envie:
1. A mensagem de erro completa que aparece
2. O resultado de `node --version` e `npm --version`
