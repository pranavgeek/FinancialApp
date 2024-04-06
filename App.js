import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import TransactionsStack from './Screens/TransactionStack';
import SummaryScreen from './Screens/SummaryScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;

            if (route.name === 'Transactions') {
              iconComponent = focused ? <FontAwesome6 name="money-bill-transfer" size={24} color="black" /> : <FontAwesome6 name="money-bill-transfer" size={24} color="black" />;
            } else if (route.name === 'Summary') {
              iconComponent = focused ? <MaterialIcons name="summarize" size={size} color={color} /> : <MaterialIcons name="summarize" size={size} color={color} />;
            }

            return iconComponent;
          },
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        })}>
          <Tab.Screen name="Transactions" component={TransactionsStack} options={{ 
          headerLeft: null,
          headerTitle: "Financial App",
          headerStyle: {
            backgroundColor: '#478778'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            marginLeft: -170
          },
          }}/>
          <Tab.Screen name="Summary" component={SummaryScreen} options={{ 
          headerLeft: null,
          headerTitle: "Financial App",
          headerStyle: {
            backgroundColor: '#478778'
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 30,
            marginLeft: -170
          },
          }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}
