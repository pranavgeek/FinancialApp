import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firestore } from '../firebase';
import { useFocusEffect } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';

function SummaryScreen() {
  const [transactions, setTransactions] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [highestSpending, setHighestSpending] = useState(null);
  const [lowestSpending, setLowestSpending] = useState(null);

  const fetchTransactions = async () => {
    try {
      const transactionsCollection = collection(firestore, 'transactions')
      const querySnapshot = await getDocs(transactionsCollection);

      const transactionsList = [];
      let highest = null;
      let lowest = null;
      let total = 0;

      querySnapshot.forEach((doc) => {
        const transactionData = doc.data();
        const amount = parseFloat(transactionData.amount);
        transactionsList.push({ id: doc.id, ...transactionData });
        total += amount;

        if (!highest || amount > parseFloat(highest.amount)) {
          highest = { id: doc.id, ...transactionData };
        }

        if (!lowest || amount < parseFloat(lowest.amount)) {
          lowest = { id: doc.id, ...transactionData };
        }
      });

      setTransactions(transactionsList);
      setTotalExpenses(total);
      setHighestSpending(highest);
      setLowestSpending(lowest);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useFocusEffect(() => {
    fetchTransactions();
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
          <Text style={styles.totalamount}>${totalExpenses}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.label}>Highest Spending:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.amount}>{highestSpending ? `${highestSpending.name}: $${highestSpending.amount}` : '-'}</Text>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.row}>
          <Text style={styles.label}>Lowest Spending:</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.amount}>{lowestSpending ? `${lowestSpending.name}: $${lowestSpending.amount}` : '-'}</Text>
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
    marginTop: 5,
    fontWeight: '800',
  },
});

export default SummaryScreen;
