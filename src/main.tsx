import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './contexts/modals.tsx'
import { AppointmentProvider } from './contexts/appoiment.tsx'
import { PurchaseProvider } from './contexts/checkout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <PurchaseProvider>
      <AppointmentProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AppointmentProvider>
    </PurchaseProvider>
    </ModalProvider>
  </StrictMode>,
)
