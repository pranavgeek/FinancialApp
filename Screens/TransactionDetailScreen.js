import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TransactionContext } from "./TransactionContext";

function TransactionDetailScreen({ route }) {
  const { transactions } = useContext(TransactionContext);
  const { transactionId } = route.params;
  const transaction = transactions.find(
    (transaction) => transaction.id === transactionId
  );

  return (
    <View style={styles.container}>
      {transaction && (
        <View style={styles.detailsContainer}>
          <Text style={styles.amount}>${transaction.amount}</Text>
          <Text style={styles.title}>{transaction.name}</Text>
          <Text style={styles.location}>{transaction.location}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={styles.date}>Transaction date: </Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 25,
    padding: 10,
  },
  detailsContainer: {
    backgroundColor: "#ECFFDC",
    padding: 50,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: "center",
  },
  amount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#008000",
    textAlign: "center",
  },
  location: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
});

export default TransactionDetailScreen;
