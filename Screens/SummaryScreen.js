import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransactionContext } from './TransactionContext';

function SummaryScreen() {
  const { transactions } = useContext(TransactionContext);

  // Calculate total expenses
  const totalExpenses = transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  // Find highest and lowest spending
  let highestSpending = null;
  let lowestSpending = null;

  transactions.forEach(transaction => {
    const amount = parseFloat(transaction.amount);

    if (!highestSpending || amount > highestSpending.amount) {
      highestSpending = transaction;
      highestSpending.amount = amount;
    }

    if (!lowestSpending || amount < lowestSpending.amount) {
      lowestSpending = transaction;
      lowestSpending.amount = amount;
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>
      <View style={styles.box}>
      <View style={styles.row}>
          <Text style={styles.label}>Total Transactions:</Text>
          <Text style={styles.totalamount}>{transactions.length}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.label}>Total Expenses:</Text>
          <Text style={styles.totalamount}>${totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.label}>Highest Spending:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.amount}>{highestSpending ? `${highestSpending.name}: $${highestSpending.amount.toFixed(2)}` : '-'}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.label}>Lowest Spending:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.amount}>{lowestSpending ? `${lowestSpending.name}: $${lowestSpending.amount.toFixed(2)}` : '-'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  box: {
    borderWidth: 1,
    borderColor: '#023020',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    backgroundColor: '#F0FFF0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  totalamount: {
    fontSize: 18,
    fontWeight: '800',
  },
  amount: {
    fontSize: 18,
    fontWeight: '800',
    padding: 10
  },
});

export default SummaryScreen;
