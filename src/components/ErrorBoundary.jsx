import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          backgroundColor: '#fee',
          border: '2px solid #f00',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h1 style={{ color: '#c00' }}>⚠️ Erro na Aplicação</h1>
          <p style={{ color: '#666', marginTop: '20px' }}>
            Ocorreu um erro ao carregar a aplicação.
          </p>
          <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Detalhes do erro (clique para expandir)
            </summary>
            <pre style={{ 
              backgroundColor: '#fff', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              marginTop: '10px'
            }}>
              {this.state.error?.toString()}
              {this.state.error?.stack}
            </pre>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#40916C',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
