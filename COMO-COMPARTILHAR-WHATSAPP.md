# 📱 Como Compartilhar o SmartNutri no WhatsApp

## ⚠️ IMPORTANTE: O site precisa estar hospedado na internet!

O WhatsApp só consegue mostrar preview de sites que estão **publicados na internet** (não funciona com localhost).

---

## 🚀 Passo a Passo para Compartilhar

### 1️⃣ **Publicar o Site** (se ainda não fez)

Escolha uma plataforma gratuita:

**Opção A - Vercel (Mais fácil):**
1. Acesse: https://vercel.com
2. Crie conta (pode usar GitHub)
3. Clique em "New Project"
4. Conecte seu repositório GitHub ou faça upload
5. Clique em "Deploy"
6. Pronto! Você terá uma URL tipo: `smartnutri.vercel.app`

**Opção B - Netlify:**
1. Acesse: https://netlify.com
2. Crie conta
3. Arraste a pasta do projeto ou conecte GitHub
4. Pronto! URL tipo: `smartnutri.netlify.app`

---

### 2️⃣ **Adicionar Imagem de Preview** (Opcional mas recomendado)

Para o WhatsApp mostrar uma imagem bonita:

1. Crie uma imagem de **1200x630 pixels** com:
   - Logo do SmartNutri
   - Texto: "SmartNutri - Nutrição Inteligente"
   - Cores da paleta Eco-Tech

2. Salve como `og-image.png` na pasta `public/` do projeto

3. No `index.html`, descomente e atualize:
   ```html
   <meta property="og:image" content="https://seu-dominio.com/og-image.png" />
   ```

---

### 3️⃣ **Atualizar URL no index.html**

Depois de publicar, atualize no `index.html`:
```html
<meta property="og:url" content="https://smartnutri.vercel.app" />
```

---

### 4️⃣ **Compartilhar no WhatsApp**

1. Abra o WhatsApp
2. Vá na conversa onde quer compartilhar
3. Cole o link do seu site (ex: `https://smartnutri.vercel.app`)
4. O WhatsApp vai mostrar automaticamente:
   - ✅ Título: "SmartNutri - Nutrição Inteligente"
   - ✅ Descrição: "Formulação de ração de custo mínimo..."
   - ✅ Imagem (se você adicionou)
   - ✅ Link clicável

---

## 🎯 Preview no WhatsApp vai mostrar:

```
┌─────────────────────────────────┐
│  [Imagem do Site]                │
│                                  │
│  SmartNutri - Nutrição          │
│  Inteligente                     │
│                                  │
│  Formulação de ração de custo    │
│  mínimo com otimização Simplex.  │
│  Perfis para bovinos e suínos.  │
│                                  │
│  smartnutri.vercel.app           │
└─────────────────────────────────┘
```

---

## 🔧 Testar o Preview

Antes de compartilhar, teste como vai aparecer:

1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
   - Cole sua URL
   - Veja como vai aparecer no WhatsApp/Facebook

2. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

---

## 📝 Checklist Final

- [ ] Site publicado na internet (Vercel/Netlify)
- [ ] URL atualizada no `index.html` (og:url)
- [ ] Imagem de preview criada e adicionada (opcional)
- [ ] Meta tags Open Graph configuradas
- [ ] Testado no Facebook Debugger
- [ ] Link compartilhado no WhatsApp

---

## 💡 Dica Extra

Se quiser um domínio personalizado (ex: `smartnutri.com.br`):
- Compre um domínio em sites como Registro.br, Namecheap, etc.
- Configure no Vercel/Netlify nas configurações do projeto

---

**Pronto!** Agora quando você compartilhar o link no WhatsApp, vai aparecer uma preview bonita! 🎉
