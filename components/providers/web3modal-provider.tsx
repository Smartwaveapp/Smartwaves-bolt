'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { type State } from 'wagmi';

const projectId = 'YOUR_PROJECT_ID';

const metadata = {
  name: 'Smartwave',
  description: 'Earn Crypto for Social Tasks',
  url: 'https://smartwave.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  },
  projectId
});

createWeb3Modal({ wagmiConfig: config, projectId, chains: [mainnet] });

const queryClient = new QueryClient();

export function Web3Modal({
  children,
  initialState
}: {
  children: React.ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}