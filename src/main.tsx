import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')