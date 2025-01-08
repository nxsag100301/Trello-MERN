import Board from '~/pages/Boards/_id'
import { Route, Routes, Navigate } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Navigate to='/boards/677a3205bdf6fa77993473b2' replace={true} />
        }
      />
      <Route path='/boards/:boardId' element={<Board />} />
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccountVerification />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
