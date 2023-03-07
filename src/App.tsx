import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Auth } from './pages/AuthPage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { VerificationCode } from './components/VerificationCode';
import { Profile } from './components/Profile';

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
                path='verification/:user_id'
                element={<VerificationCode />}
              />
              <Route
                path='profile'
                element={<Profile />}
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
