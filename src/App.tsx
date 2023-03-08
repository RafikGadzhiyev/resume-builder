import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Auth } from './pages/AuthPage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { VerificationCode } from './components/VerificationCode';
import { Profile } from './components/Profile';
import { CreateResume } from './components/CreateResume';

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
                element={<Profile />}
              />
              <Route
                path='verification/:user_id'
                element={<VerificationCode />}
              />
              <Route
                path='/auth'
                element={<Auth />}
              />
              <Route
                path='/resume/new'
                element={<CreateResume />}
              />
            </Route>
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  )
}

export default App
