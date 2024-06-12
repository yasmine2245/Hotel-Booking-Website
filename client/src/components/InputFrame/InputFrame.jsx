import React, { useState } from 'react';
import styles from "./styles.module.css";

const InputFrame = ({ label, defaultValue, type, onChange, stripAlpha }) => {

    const [inputValue, setInputValue] = useState(defaultValue);

    const handleInputChange = (event) => {
        let value = event.target.value;

        if (type === 'date') {
            const date = new Date(value);
            const formattedDate = date.toISOString().split('T')[0];
            value = formattedDate;
        } 

        if (stripAlpha) {
            value = value.match(/\d*/g).join('');
        }  
        
        setInputValue(value);

        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    return (
        <div className={styles.inputframe}>
            <div className={styles.inputlabel}>
                <div className={styles.text}>{label}</div>
            </div>
            <input
                className={styles.inputfield}
                type={type}
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    )
}

InputFrame.defaultProps = {
    label: 'Input here:',
    defaultValue: '',
    type: 'text',
    onChange: null,
    stripAlpha: false,
};

export default InputFrame;