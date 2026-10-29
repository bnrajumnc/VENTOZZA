import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import './screen-layout.css'
import './type-overrides.css'
import './site-polish.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
