import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {sepolia , arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Finvest',
  projectId: '7a026d961241ea662d0e403720f0552d',
  chains: [sepolia ,mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});
