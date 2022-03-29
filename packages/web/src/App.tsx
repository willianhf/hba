import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { relayEnvironment } from './lib/relay';
import { LandingLayout } from './ui/layouts';

export function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />} />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}
