import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Verifica se o elemento root existe
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ Erro: Elemento #root não encontrado no HTML!');
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;"><h1>Erro: Elemento #root não encontrado!</h1><p>Verifique se o index.html tem &lt;div id="root"&gt;&lt;/div&gt;</p></div>';
} else {
  try {
    console.log('🚀 Iniciando React...');
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('✅ React carregado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao carregar React:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial;">
        <h1>Erro ao carregar a aplicação</h1>
        <p><strong>Erro:</strong> ${error.message}</p>
        <p><strong>Stack:</strong> ${error.stack}</p>
        <p>Verifique o console (F12) para mais detalhes.</p>
        <button onclick="window.location.reload()" style="margin-top: 10px; padding: 10px 20px; background: #40916C; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Recarregar Página
        </button>
      </div>
    `;
  }
}
