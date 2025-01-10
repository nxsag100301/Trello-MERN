import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
// import GlobalStyles from '@mui/material/GlobalStyles'
import theme from '~/theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import store from '~/redux/store'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from './utils/authorizeAxios'

const persistor = persistStore(store)
injectStore(store)

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter basename='/'>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CssVarsProvider theme={theme}>
            <ConfirmProvider
              defaultOptions={{
                dialogProps: { maxWidth: 'xs' },
                allowClose: false,
                buttonOrder: ['confirm', 'cancel']
              }}
            >
              {/* <GlobalStyles styles={{}} /> */}
              <CssBaseline />
              <App />
              <ToastContainer
                position='bottom-right'
                autoClose={2000}
                theme='colored'
              />
            </ConfirmProvider>
          </CssVarsProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </>
)
