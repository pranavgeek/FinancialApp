import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import TransactionsListScreen from "./TransactionsListScreen";
import TransactionDetailScreen from "./TransactionDetailScreen";

const Stack = createStackNavigator();

const CustomBackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 15, marginTop: 21 }}>
      <Text style={{ color: 'blue', fontSize: 25 }}>←</Text>
    </TouchableOpacity>
  );

function TransactionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transactions List"
        component={TransactionsListScreen}
        options={{
          headerLeft: null,
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            paddingTop: 25,
            color: "black",
            fontSize: 20,
            marginLeft: -170,
          },
        }}
      />
      <Stack.Screen
        name="Transaction Detail"
        component={TransactionDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTitleStyle: {
            paddingTop: 25,
            color: "black",
            fontSize: 20,
            marginLeft: -125,
          },
          headerBackTitleVisible: false,
          headerLeft: (props) => (
            <CustomBackButton onPress={props.onPress} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default TransactionsStack;
