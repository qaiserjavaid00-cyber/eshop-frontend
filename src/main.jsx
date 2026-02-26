import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

// Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
console.log("stripe", key)
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
