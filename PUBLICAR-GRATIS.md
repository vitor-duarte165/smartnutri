# 🚀 Como Publicar o SmartNutri GRATUITAMENTE (Sem Host Próprio)

## ✅ Opções GRATUITAS e FÁCEIS (sem cartão de crédito)

---

## 🎯 OPÇÃO 1: Vercel (MAIS FÁCIL - Recomendado)

### Passo a Passo:

1. **Acesse**: https://vercel.com
2. **Clique em**: "Sign Up" (Criar Conta)
3. **Escolha**: "Continue with GitHub" (ou crie conta com email)
4. **Após criar conta**, clique em: "Add New Project"
5. **Escolha uma opção**:
   
   **Opção A - Com GitHub (Recomendado):**
   - Conecte sua conta GitHub
   - Crie um repositório novo
   - Faça upload dos arquivos do projeto
   - Vercel detecta automaticamente e faz deploy
   
   **Opção B - Upload Direto (Mais Rápido):**
   - Clique em "Browse" ou arraste a pasta do projeto
   - Aguarde o upload
   - Clique em "Deploy"

6. **Pronto!** Em 1-2 minutos você terá uma URL tipo:
   - `smartnutri-xxxxx.vercel.app`
   - Essa URL é sua! Pode compartilhar no WhatsApp!

---

## 🎯 OPÇÃO 2: Netlify (Também Gratuito)

### Passo a Passo:

1. **Acesse**: https://netlify.com
2. **Clique em**: "Sign up" (Criar Conta)
3. **Escolha**: "Sign up with GitHub" ou email
4. **No dashboard**, arraste a pasta `smartnutri` inteira
5. **Aguarde** o deploy (alguns minutos)
6. **Pronto!** Você terá uma URL tipo:
   - `smartnutri-xxxxx.netlify.app`

---

## 🎯 OPÇÃO 3: GitHub Pages (Gratuito)

### Passo a Passo:

1. **Crie conta no GitHub**: https://github.com
2. **Crie um novo repositório** (ex: `smartnutri`)
3. **Faça upload dos arquivos** do projeto
4. **Vá em Settings** → **Pages**
5. **Escolha branch**: `main` ou `master`
6. **Salve**
7. **Pronto!** URL será: `seu-usuario.github.io/smartnutri`

---

## 📋 ANTES DE PUBLICAR - Preparar o Projeto

### 1. Criar pasta `public` (se não existir)

Crie uma pasta chamada `public` na raiz do projeto.

### 2. Verificar se tem `vite.config.js` correto

O arquivo já está correto, mas verifique se tem:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### 3. Fazer build local (teste)

No terminal, execute:
```bash
npm run build
```

Isso cria uma pasta `dist` com os arquivos prontos para publicação.

---

## 🎨 Adicionar Imagem de Preview (Opcional)

Para o WhatsApp mostrar uma imagem bonita:

1. **Crie uma imagem** 1200x630 pixels com:
   - Logo SmartNutri
   - Texto: "SmartNutri - Nutrição Inteligente"
   - Fundo verde (paleta Eco-Tech)

2. **Salve como**: `og-image.png`

3. **Coloque na pasta**: `public/og-image.png`

4. **No `index.html`**, descomente e atualize:
   ```html
   <meta property="og:image" content="https://sua-url.vercel.app/og-image.png" />
   ```

---

## ✅ Checklist Antes de Publicar

- [ ] Conta criada no Vercel/Netlify/GitHub
- [ ] Projeto testado localmente (`npm run dev`)
- [ ] Build funcionando (`npm run build`)
- [ ] Pasta `public` criada (se quiser adicionar imagens)
- [ ] Meta tags atualizadas no `index.html`

---

## 🚀 DEPOIS DE PUBLICAR

### 1. Copie sua URL
Exemplo: `https://smartnutri-abc123.vercel.app`

### 2. Atualize o `index.html`
Substitua `https://seu-dominio.com` pela sua URL real:
```html
<meta property="og:url" content="https://smartnutri-abc123.vercel.app" />
```

### 3. Faça deploy novamente
- No Vercel: é automático quando você atualiza arquivos
- Ou clique em "Redeploy" no dashboard

### 4. Compartilhe no WhatsApp!
- Cole a URL no WhatsApp
- O preview vai aparecer automaticamente! 🎉

---

## 🆘 PRECISA DE AJUDA?

Se tiver dificuldade em algum passo, me avise que eu ajudo!

**Dica**: A opção mais fácil é o **Vercel com upload direto** - não precisa de GitHub!

---

## 📱 Testar o Preview

Depois de publicar, teste aqui:
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- Cole sua URL e veja como vai aparecer no WhatsApp

---

**Tudo é GRATUITO e SEM CARTÃO DE CRÉDITO!** 🎉
