import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider,darkTheme} from '@rainbow-me/rainbowkit';

import App from './App.jsx';
import './index.css';
import { config } from './wagmi';

const queryClient = new QueryClient();
// const myCustomTheme = {
//   blurs: {
//     modalOverlay: 'rgba(0, 0, 0, 0.7)', // Darker semi-transparent overlay
//   },
//   colors: {
//     accentColor: '#1B7A57', // Main accent color (Dark Green)
//     accentColorForeground: '#FFFFFF', // Text on accent color
//     actionButtonBorder: '#1B7A57',
//     actionButtonBorderMobile: '#1B7A57',
//     actionButtonSecondaryBackground: '#2FB574', // Lighter green for buttons
//     closeButton: '#FFFFFF',
//     closeButtonBackground: '#1B7A57',
//     connectButtonBackground: '#1B7A57',
//     connectButtonBackgroundError: '#FF4500', // Darker red for errors
//     connectButtonInnerBackground: '#2FB574',
//     connectButtonText: '#FFFFFF',
//     connectButtonTextError: '#FFFFFF',
//     connectionIndicator: '#1B7A57',
//     downloadBottomCardBackground: '#101010', // Dark background for cards
//     downloadTopCardBackground: '#1B7A57',
//     error: '#FF4500', // Darker red for errors
//     generalBorder: '#2FB574',
//     generalBorderDim: '#1B7A57',
//     menuItemBackground: '#2A2A2A', // Dark gray for menu items
//     modalBackdrop: 'rgba(0, 0, 0, 0.9)', // Darker backdrop
//     modalBackground: '#2A2A2A', // Darker background for modals
//     modalBorder: '#1B7A57',
//     modalText: '#FFFFFF',
//     modalTextDim: '#B0C4B0', // Softer text color
//     modalTextSecondary: '#D1E8D1',
//     profileAction: '#1B7A57',
//     profileActionHover: '#154d3d',
//     profileForeground: '#FFFFFF',
//     selectedOptionBorder: '#2FB574',
//     standby: '#FFA500', // Orange for standby
//   },
//   fonts: {
//     body: 'Arial, sans-serif', // Font for the body
//   },
//   radii: {
//     actionButton: '10px', // Slightly more rounded
//     connectButton: '10px',
//     menuButton: '10px',
//     modal: '12px',
//     modalMobile: '10px',
//   },
//   shadows: {
//     connectButton: '0 4px 10px rgba(0, 0, 0, 0.7)', // Stronger shadow for buttons
//     dialog: '0 4px 20px rgba(0, 0, 0, 0.7)', // Darker shadow for dialogs
//     profileDetailsAction: '0 2px 4px rgba(0, 0, 0, 0.5)', // Darker shadow for profile actions
//     selectedOption: '0 0 0 3px rgba(31, 210, 125, 0.6)', // Light green border on selection
//     selectedWallet: '0 0 0 3px rgba(31, 210, 125, 0.6)',
//     walletLogo: '0 2px 4px rgba(0, 0, 0, 0.5)', // Darker shadow for wallet logos
//   },
// };




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
