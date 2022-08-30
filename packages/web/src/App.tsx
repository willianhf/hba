import { Toaster } from 'react-hot-toast';
import { RelayEnvironmentProvider } from 'react-relay';
import { relayEnvironment } from './lib/relay';
import { Routes } from './routes';

export function App() {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Toaster position="top-right" />
      <Routes />
    </RelayEnvironmentProvider>
  );
}
