import React from 'react';
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

    interface Transaction {
      id: string;
      type: 'income' | 'expense';
      amount: number;
      description: string;
    }

    interface MonthlyChartProps {
      transactions: Transaction[];
    }

    const MonthlyChart: React.FC<MonthlyChartProps> = ({ transactions }) => {
      const monthlyData = () => {
        const monthlyTotals: { [key: string]: { income: number; expense: number } } = {};

        transactions.forEach((transaction) => {
          const date = new Date(parseInt(transaction.id));
          const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;

          if (!monthlyTotals[monthYear]) {
            monthlyTotals[monthYear] = { income: 0, expense: 0 };
          }

          if (transaction.type === 'income') {
            monthlyTotals[monthYear].income += transaction.amount;
          } else {
            monthlyTotals[monthYear].expense += transaction.amount;
          }
        });

        const data = Object.keys(monthlyTotals).map((monthYear) => ({
          month: monthYear,
          income: monthlyTotals[monthYear].income,
          expense: monthlyTotals[monthYear].expense,
        }));

        return data;
      };

      const data = monthlyData();

      return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Grafik Bulanan</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)} />
              <Legend />
              <Bar dataKey="income" name="Pemasukan" fill="#82ca9d" />
              <Bar dataKey="expense" name="Pengeluaran" fill="#e57373" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    };

    export default MonthlyChart;
