// TransactionContext.js
import React, { createContext, useState } from 'react';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Nike', amount: 180.00, location: 'Masonville Mall', date: 'Mar 20, 2024'},
    { id: 2, name: 'H&M', amount: 100.00, location: 'White Oaks Mall', date: 'Mar 1, 2024'},
    { id: 3, name: 'Glocery', amount: 200.00, location: 'FreshCo', date: 'Feb 25, 2024'},
    { id: 4, name: 'Dessert', amount: 50.00, location: 'Richmond St.', date: 'Feb 19, 2024'},
    { id: 5, name: 'Startbucks', amount: 20.00, location: 'Dundas St.', date: 'Feb 14, 2024'},
    { id: 6, name: 'Tim Hortons', amount: 10.00, location: 'King St.', date: 'Jan 26, 2024'},
  ]);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
