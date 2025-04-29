import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './contexts/modals.tsx'
import { AppointmentProvider } from './contexts/appoiment.tsx'
import { PurchaseProvider } from './contexts/checkout.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <PurchaseProvider>
      <AppointmentProvider>
    <BrowserRouter>
    <Toaster position="bottom-right" reverseOrder={false}  toastOptions={{
    // Estilo general
    style: {
      fontSize: "18px",
      borderRadius: "8px",
      padding: "12px 16px",
    },
    success: {
      style: {
        background: "#19b424",
        color: "#fff",
      },
    },
    error: {
      style: {
        background: "#FEE2E2",
        color: "#991B1B",
      },
    },
  }} />
    <App />
    </BrowserRouter>
    </AppointmentProvider>
    </PurchaseProvider>
    </ModalProvider>
  </StrictMode>,
)
