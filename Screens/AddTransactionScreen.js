import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { firestore } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function AddTransactionScreen({ navigation }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleAddTransaction = async () => {
    try {
      const transactionsCollection = collection(firestore, 'transactions');

      const newTransaction = {
        name: name,
        amount: parseFloat(amount),
        location: location,
        date: date,
      };

      await addDoc(transactionsCollection, newTransaction);

      setName('');
      setAmount('');
      setLocation('');
      setDate('');

      navigation.navigate('Transactions List');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text style={styles.label}>Amount:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={(text) => setLocation(text)}
      />
      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={(text) => setDate(text)}
      />
    <TouchableOpacity style={styles.addBtn} onPress={handleAddTransaction}>
        <Text style={styles.addBtnText}>Add Transaction</Text>
      </TouchableOpacity>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ECFFDC',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#008000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#ECFFDC",
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ECFFDC',
  },
});

export default AddTransactionScreen;
