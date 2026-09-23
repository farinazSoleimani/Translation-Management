import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { TranslationProvider } from './context/TranslationContext';
import { DashboardPage } from './pages/DashboardPage';
import { PublicViewPage } from './pages/PublicViewPage';

function App() {
  return (
    <BrowserRouter>
      <TranslationProvider>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/public" element={<PublicViewPage />} />

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </TranslationProvider>
    </BrowserRouter>
  );
}

export default App;