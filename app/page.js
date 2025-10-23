export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          🍼
        </div>
        
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Baby Food Content Writer
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: '#666',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          AI-powered content generation for baby food products, nutrition guides, and parenting resources.
        </p>
        
        <div style={{
          background: '#f7fafc',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '15px'
          }}>
            🚀 API Endpoint
          </h2>
          <code style={{
            background: '#2d3748',
            color: '#68d391',
            padding: '12px 20px',
            borderRadius: '8px',
            display: 'block',
            fontSize: '14px',
            overflowX: 'auto'
          }}>
            POST https://babyfoodwriter.vercel.app/api/agent
          </code>
        </div>
        
        <div style={{
          background: '#f7fafc',
          borderRadius: '12px',
          padding: '30px',
          textAlign: 'left'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '15px'
          }}>
            📝 Example Request
          </h2>
          <pre style={{
            background: '#2d3748',
            color: '#e2e8f0',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '13px',
            overflowX: 'auto',
            textAlign: 'left',
            margin: 0
          }}>
{`{
  "topic": "organic baby food",
  "age_group": "6-12 months",
  "type": "blog_post"
}`}
          </pre>
        </div>
        
        <div style={{
          marginTop: '40px',
          paddingTop: '30px',
          borderTop: '1px solid #e2e8f0',
          color: '#718096',
          fontSize: '14px'
        }}>
          <p>
            Powered by <strong>Sim AI</strong> • Deployed on <strong>Vercel</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
