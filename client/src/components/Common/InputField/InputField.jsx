import "./InputField.css"


import React from "react";
import "./InputField.css";

export default function InputField({
    type,
    value,
    placeholder,
    change,
    error = null,
    name,
}) {

    return (
        <>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={change}
                className="form-control form-control-lg"
                required
            />
            {error && <p className="error">{error}</p>}
        </>
    );
}
