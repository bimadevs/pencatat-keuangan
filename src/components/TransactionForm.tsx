import React, { useState } from 'react';

    interface Transaction {
      id: string;
      type: 'income' | 'expense';
      amount: number;
      description: string;
    }

    interface TransactionFormProps {
      onAddTransaction: (transaction: Transaction) => void;
    }

    const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
      const [type, setType] = useState<'income' | 'expense'>('income');
      const [amount, setAmount] = useState<number>(0);
      const [description, setDescription] = useState<string>('');

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !description) {
          alert('Mohon isi semua kolom.');
          return;
        }
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type,
          amount: parseFloat(amount.toString()),
          description,
        };
        onAddTransaction(newTransaction);
        setAmount(0);
        setDescription('');
      };

      return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Jenis
            </label>
            <select
              id="type"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            >
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Jumlah
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              placeholder="Masukkan jumlah"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Deskripsi
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="Masukkan deskripsi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Tambah Transaksi
            </button>
          </div>
        </form>
      );
    };

    export default TransactionForm;
