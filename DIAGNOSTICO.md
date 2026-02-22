# 🔍 Diagnóstico - Site Não Abre

## ✅ Verificações Rápidas

### 1. O servidor está rodando?
- Abra o terminal onde você executou `npm run dev`
- Deve aparecer: `Local: http://localhost:5173`
- Se não estiver rodando, execute: `npm run dev`

### 2. Qual URL você está acessando?
- ✅ Correto: `http://localhost:5173`
- ❌ Errado: `http://localhost:5173/index.html`
- ❌ Errado: `file:///C:/Users/User/Desktop/smartnutri/index.html`

### 3. O que aparece no navegador?
- **Tela branca?** → Veja seção "Tela Branca" abaixo
- **Erro 404?** → Servidor não está rodando
- **Erro de conexão?** → Servidor não está rodando

---

## 🐛 Problema: Tela Branca

### Solução 1: Verificar Console do Navegador

1. Abra o navegador
2. Pressione **F12** (ou clique direito → Inspecionar)
3. Vá na aba **Console**
4. Veja se há erros em vermelho
5. **Me envie os erros que aparecerem!**

### Solução 2: Limpar Cache

1. No navegador, pressione **Ctrl + Shift + Delete**
2. Marque "Imagens e arquivos em cache"
3. Clique em "Limpar dados"
4. Recarregue a página (**Ctrl + F5**)

### Solução 3: Verificar se o React está carregando

1. Abra o Console (F12)
2. Digite: `document.getElementById('root')`
3. Deve retornar: `<div id="root"></div>`
4. Se retornar `null`, o HTML não está carregando

---

## 🔧 Problemas Comuns e Soluções

### Problema: "Cannot find module"
**Solução:**
```bash
cd C:\Users\User\Desktop\smartnutri
npm install
npm run dev
```

### Problema: "Port 5173 already in use"
**Solução:**
1. Feche outras janelas do terminal
2. Ou mude a porta no `vite.config.js`

### Problema: Erro de importação
**Solução:**
- Verifique se todos os arquivos estão na pasta `src/`
- Verifique se os imports estão corretos

---

## 📋 Checklist de Diagnóstico

- [ ] Servidor está rodando (`npm run dev`)
- [ ] Acessando `http://localhost:5173` (não file://)
- [ ] Console do navegador aberto (F12)
- [ ] Sem erros vermelhos no Console
- [ ] Cache limpo
- [ ] Node.js instalado (`node --version`)
- [ ] Dependências instaladas (`node_modules` existe)

---

## 🆘 Se Nada Funcionar

1. **Feche tudo** (terminal, navegador)
2. **Abra novamente** o terminal
3. Execute:
   ```bash
   cd C:\Users\User\Desktop\smartnutri
   npm run dev
   ```
4. **Aguarde** aparecer: `Local: http://localhost:5173`
5. **Clique no link** ou cole no navegador
6. **Abra o Console** (F12) e veja os erros
7. **Me envie** os erros que aparecerem!

---

## 📸 Como Me Ajudar a Te Ajudar

Se ainda não funcionar, me envie:

1. **Screenshot** da tela do navegador
2. **Screenshot** do Console (F12 → Console)
3. **Screenshot** do terminal onde roda `npm run dev`
4. **Mensagens de erro** que aparecem

Com essas informações, consigo identificar exatamente o problema! 🎯
