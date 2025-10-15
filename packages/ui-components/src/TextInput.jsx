import React from "react";

export const TextInput = ({ name, placeholder, type = "text", value, onChange }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border rounded px-3 py-2"
        />
    );
};