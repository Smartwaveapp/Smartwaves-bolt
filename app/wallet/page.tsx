'use client';

import { ConnectWallet } from '@/components/wallet/connect-wallet';

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Wallet</h1>
      <ConnectWallet />
    </div>
  );
}