'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import api from './lib/api';
import { Loader2 } from 'lucide-react';

export default function AirtimeForm() {
  const [phone, setPhone] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');

  const mutation = useMutation({
    mutationFn: () =>
      api
        .post('/api/airtime', {
          phone,
          network,
          amount: Number(amount),
        })
        .then(res => res.data),
    onSuccess: data => {
      data.success
        ? toast.success('Airtime sent successfully!')
        : toast.error(`API Error: ${data.error || 'Unknown error'}`);
    },
    onError: () => {
      toast.error('Error while submitting the form.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\d{11}$/.test(phone)) {
      toast.error('Invalid phone number (must be 11 digits)');
      return;
    }
    if (!network || !amount) {
      toast.error('All fields are required.');
      return;
    }
    mutation.mutate();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-pink-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Airtime Form</h2>
        <div className="w-16 h-1 bg-pink-500 mb-6 rounded-full"></div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-2 border-b-2 border-pink-400 focus:outline-none"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <select
              value={network}
              onChange={e => setNetwork(e.target.value)}
              className="w-full px-4 py-2 border-b-2 border-pink-400 focus:outline-none"
            >
              <option value="">Select Network</option>
              <option value="MTN">MTN</option>
              <option value="AIRTEL">Airtel</option>
              <option value="GLO">Glo</option>
              <option value="9MOBILE">9mobile</option>
            </select>
          </div>
          <div className="mb-6">
            <input
              type="number"
              placeholder="Amount"
              className="w-full px-4 py-2 border-b-2 border-pink-400 focus:outline-none"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          {mutation.status === 'pending' && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
              <Loader2 className="animate-spin w-12 h-12 text-pink-500" />
            </div>
          )}
          <button
            type="submit"
            disabled={mutation.status === 'pending'}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md disabled:opacity-50"
          >
            {mutation.status === 'pending' ? 'Sending…' : 'Continue'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 my-4">
          or Connect With Social Media
        </p>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-2 w-full py-2 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-md">
            Sign in With Twitter
          </button>
          <button className="flex items-center justify-center gap-2 w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-md">
            Sign in With Facebook
          </button>
        </div>
      </div>
    </main>
  );
}
