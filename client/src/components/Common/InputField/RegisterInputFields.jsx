import "./InputField.css"
import React from "react";
import "./InputField.css";

export default function RegisterInputField({
    type,
    label,
    value,
    placeholder,
    change,
    error = null,
    name,
}) {

    return (
        <>
            <input
                type={type}
                id={name}
                className="form-control form-control-lg"
                placeholder={placeholder}
                onChange={change}
                value={value}
                required
            />
            <label className="form-label" htmlFor={name}>{label}</label>

            {error && <p className="error fw-bold">{error}</p>}
        </>
    );
}
