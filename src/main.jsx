import { createRoot } from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from '~/redux/store'

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            dialogProps: { maxWidth: 'xs' },
            allowClose: false,
            buttonOrder: ['confirm', 'cancel']
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer
            position='bottom-right'
            autoClose={1500}
            theme='colored'
          />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </>
)
