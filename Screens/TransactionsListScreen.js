import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TransactionContext } from './TransactionContext';

function TransactionsListScreen({ navigation }) {
  const { transactions } = useContext(TransactionContext);

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
  },
  arrow: {
    fontSize: 18,
  },
});

export default TransactionsListScreen;
