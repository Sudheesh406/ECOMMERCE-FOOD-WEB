import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import GlobalProvider from './components/GlobalProvider'
import { Provider } from 'react-redux';
import store from './redux/Store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <GlobalProvider />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
  