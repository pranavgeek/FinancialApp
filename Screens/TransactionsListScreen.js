import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchTransactions } from '../firebase';

function TransactionsListScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);

  const loadTransactions = async () => {
    const transactionsList = await fetchTransactions();
    setTransactions(transactionsList);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(() => {
    loadTransactions();
  });
  
  const handleAddTransaction = () => {
    navigation.navigate('Add Transaction');
  };
  
  return (
    <View style={styles.container}>
      {transactions.map(transaction => (
        <TouchableOpacity 
          key={transaction.id} 
          style={styles.transactionContainer} 
          onPress={() => navigation.navigate('Transaction Detail', { transactionId: transaction.id })}
        >
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionName}>{transaction.name}</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>${transaction.amount}</Text>
              <Text style={styles.arrow}>→</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 25
  },
  transactionContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ECFFDC',
    borderRadius: 5,
    paddingVertical: 10,
    width: '90%',
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    marginRight: 10,
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TransactionsListScreen;
