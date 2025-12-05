import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CreditCardScreen from "./CreditCardScreen";

export default function App() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <CreditCardScreen />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}