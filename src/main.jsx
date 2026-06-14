import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Admin from './pages/Admin.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path={import.meta.env.VITE_ADMIN_PATH || '/cachramn-admin'} element={<Admin />} />
        <Route path={`${import.meta.env.VITE_ADMIN_PATH || '/cachramn-admin'}/*`} element={<Admin />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
