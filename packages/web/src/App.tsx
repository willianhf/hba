import { Toaster } from 'react-hot-toast';
import { RelayEnvironmentProvider } from 'react-relay';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { relayEnvironment } from './lib/relay';
import { Routes } from './routes';

export function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </RelayEnvironmentProvider>
  );
}
