import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export function Button({ title, onClick }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onClick}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 16,
    },
});
