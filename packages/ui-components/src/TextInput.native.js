import React from "react";
import { TextInput as RNTextInput } from "react-native";

export const TextInput = ({ name, placeholder, type, value, onChangeText }) => {
    return (
        <RNTextInput
            secureTextEntry={type === "password"}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            className="border rounded px-3 py-2"
        />
    );
};