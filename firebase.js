import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDY1LBCCuG3zEDSeWHo8_aCHAFHOoLxrwA",
  authDomain: "financialapp-59e64.firebaseapp.com",
  projectId: "financialapp-59e64",
  storageBucket: "financialapp-59e64.appspot.com",
  messagingSenderId: "190222382586",
  appId: "1:190222382586:web:7b71d33b2afdd7f3682043"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const fetchTransactions = async () => {
    try {
      const transactionsCollection = collection(firestore, 'transactions');
      const querySnapshot = await getDocs(transactionsCollection);
  
      const transactionsList = [];
      querySnapshot.forEach((doc) => {
        transactionsList.push({ id: doc.id, ...doc.data() });
      });
  
      console.log('Fetched transactions:', transactionsList);
      return transactionsList;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  };  

  const fetchTransactiondetails = async (transactionId) => {
    try {
      const transactionRef = doc(firestore, "transactions", transactionId);
      const docSnap = await getDoc(transactionRef);
  
      if (docSnap.exists()) {
        const transactionData = docSnap.data();
        return transactionData;
      } else {
        console.log("Transaction not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching transaction:", error);
      return null;
    }
  };

export { fetchTransactions, fetchTransactiondetails, firestore };
