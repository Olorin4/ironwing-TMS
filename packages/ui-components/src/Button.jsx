import React from "react";
import PropTypes from "prop-types";

export function Button({ title, onClick, type = "button", id }) {
    return (
        <button
            id={id}
            type={type}
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
    type: PropTypes.string,
    id: PropTypes.string,
};
