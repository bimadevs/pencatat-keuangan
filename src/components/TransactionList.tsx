import React from 'react';
    import { Trash2 } from 'lucide-react';

    interface Transaction {
      id: string;
      type: 'income' | 'expense';
      amount: number;
      description: string;
    }

    interface TransactionListProps {
      transactions: Transaction[];
      onDeleteTransaction: (id: string) => void;
    }

    const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction }) => {
      const formatCurrency = (amount: number) => {
        return amount.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 2,
        });
      };

      const formatDate = (timestamp: string) => {
        const date = new Date(parseInt(timestamp));
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        };
        return date.toLocaleDateString('id-ID', options);
      };

      return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Riwayat Transaksi</h2>
          {transactions.length === 0 ? (
            <p>Belum ada transaksi.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{transaction.description}</span>
                      <span className="ml-2 text-gray-500">
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">{formatDate(transaction.id)}</span>
                  </div>
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };

    export default TransactionList;
