import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { relayEnvironment } from './lib/relay';
import { LandingLayout } from './ui/layouts';

export function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingLayout />}>
              <Route
                path="*"
                element={
                  <main style={{ padding: '1rem' }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}
