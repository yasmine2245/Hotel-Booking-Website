import React, { useState, useRef, useEffect } from 'react';
import styles from "./styles.module.css"; // You can define your styles here

const DropdownMenu = ({ label, options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const convertRatingToNumber = (ratingString) => {
        const ratingMap = {
            '★': 1,
            '★★': 2,
            '★★★': 3,
            '★★★★': 4,
            '★★★★★': 5
        };
    
        return ratingMap[ratingString];
    };

    
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option) => {
        setIsOpen(false);
        if(label === "Minimum Star Rating:") {
            option = convertRatingToNumber(option);
        }
        onSelect(option);
    };

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles.inputlabel}>
                <div className={styles.text}>{label}</div>
            </div>
            <div className={styles.dropdownToggle} onClick={handleToggleDropdown}>
                <span>{selectedOption || 'Options'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

DropdownMenu.defaultProps = {
    label: 'Input here:',
    options: null,
    onChange: null,
    selectedOption: "Options"
};

export default DropdownMenu;