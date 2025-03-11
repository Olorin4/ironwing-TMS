import React from "react";

export function Button({ title, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}>
            {title}
        </button>
    );
}
