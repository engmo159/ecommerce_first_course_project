import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import AuthProvider from './context/Auth/AuthProvidor'
import ProductsProvider from './context/Products/ProductsProvidor'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProductsProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ProductsProvider>
  </AuthProvider>
)
