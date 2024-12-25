import React, { useState, useEffect } from 'react';
    import TransactionForm from './components/TransactionForm';
    import TransactionList from './components/TransactionList';
    import MonthlyChart from './components/MonthlyChart';

    interface Transaction {
      id: string;
      type: 'income' | 'expense';
      amount: number;
      description: string;
    }

    function App() {
      const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const storedTransactions = localStorage.getItem('transactions');
        return storedTransactions ? JSON.parse(storedTransactions) : [];
      });

      useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
      }, [transactions]);

      const handleAddTransaction = (newTransaction: Transaction) => {
        setTransactions([...transactions, newTransaction]);
      };

      const handleDeleteTransaction = (id: string) => {
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
        setTransactions(updatedTransactions);
      };

      const calculateBalance = () => {
        let balance = 0;
        transactions.forEach((transaction) => {
          if (transaction.type === 'income') {
            balance += transaction.amount;
          } else {
            balance -= transaction.amount;
          }
        });
        return balance;
      };

      const formatCurrency = (amount: number) => {
        return amount.toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 2,
        });
      };

      const balance = calculateBalance();

      return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Pencatat Keuangan</h1>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold">Saldo: {formatCurrency(balance)}</h2>
                </div>
                <TransactionForm onAddTransaction={handleAddTransaction} />
                <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
                <MonthlyChart transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    export default App;
