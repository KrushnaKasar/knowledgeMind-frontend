// Main App Component
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ArticleProvider } from './context/ArticleContext';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ArticleProvider>
          <AppRoutes />
        </ArticleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
