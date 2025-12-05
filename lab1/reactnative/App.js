// App.js
import React from "react";
import { 
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider backgroundColor="#00796B">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" backgroundColor="#00796B" />
          <View style={styles.container}>
            {/* Top bar */}
            <View style={styles.topBar}>
              <Text style={styles.topBarTitle}>Example 1: React Native</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
              {/* image */}
              <Image
                style={styles.donutImage}
                source={require("./assets/icon.png")}
                resizeMode="contain"
              />

              {/* 2x2 button grid */}
              <View style={styles.buttonGrid}>
                <View style={styles.buttonRow}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>BUTTON</Text>
                  </View>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>BUTTON</Text>
                  </View>
                </View>

                <View style={styles.buttonRow}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>BUTTON</Text>
                  </View>
                  <View style={styles.button}>
                  <Text style={styles.buttonText}>BUTTON</Text>
                  </View>
                </View>
              </View>
            
            {/* Email input */}
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email</Text>
  
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder=""
                  keyboardType="email-address"
                />
                <View style={styles.inputUnderline} />
              </View>
            </View>
        </View>
          </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#015349ff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBar: {
    height: 56,
    backgroundColor: "#00796B",
    justifyContent: "center",
    paddingHorizontal: 16,
    elevation: 4,
  },
  topBarTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  donutImage: {
    width: 180,
    height: 180,
    marginBottom: 40,
  },
  buttonGrid: {
    width: "100%",
    marginBottom: 48,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inputWrapper: {
    width: "100%",
     flexDirection: "row",
     alignItems: "flex-end",
  },
  inputFieldContainer: {
  flex: 1,             
  },
  inputLabel: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 8,
  },
  textInput: {
    flex:1,
    fontSize: 16,
    paddingVertical: 4,
    marginLeft: 4,
  },
  inputUnderline: {
    width:"100%",
    height: 2,
    backgroundColor: "#E91E63",
    marginTop: 4,
  },
});
