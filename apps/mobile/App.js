import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "ui-components";

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello from React Native Mobile App!</Text>
            <Button title="Tap Me" onPress={() => alert("Button Pressed!")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    text: {
        fontSize: 20,
        color: "#333",
    },
});
