import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthUI from './components/authentication/Auth-ui';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Garden from './pages/Garden';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<AuthUI />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/garden"
          element={
            <ProtectedRoute>
              <Garden />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
