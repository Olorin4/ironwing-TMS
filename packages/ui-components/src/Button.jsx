import React from "react";
import PropTypes from "prop-types";

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

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
