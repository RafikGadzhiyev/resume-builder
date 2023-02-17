import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Auth } from './pages/AuthPage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { VerificationCode } from './components/VerificationCode';

function App() {

  return (
    <div>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      >
        <Router>
          <Routes>
            <Route
              path='/'
              element={<ProtectedRoute />}
            >
              <Route
                path='profile'
                element={<div>Welcomr back!</div>}
              />
              <Route />
              <Route
                path='verification/:user_id'
                element={<VerificationCode />}
              />
            </Route>
            <Route
              path='/auth'
              element={<Auth />}
            />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  )
}

export default App
