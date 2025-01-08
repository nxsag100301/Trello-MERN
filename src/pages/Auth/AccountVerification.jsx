import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import Loading from '~/components/Loading/Loading'

const AccountVerification = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => setVerified(true))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to='/404' />
  }
  return (
    <>
      {!verified ? (
        <Loading caption='Verifying your account...' />
      ) : (
        <Navigate to={`/login?verifiedEmail=${email}`} />
      )}
    </>
  )
}

export default AccountVerification
