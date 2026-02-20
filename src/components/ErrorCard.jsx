import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorCard = ({ message }) => {
    return (
        <div className="error-state">
            <BiErrorCircle size={48} color="var(--accent-color)" />
            <h3>Oops! Something went wrong</h3>
            <p>{message || "Failed to fetch data."}</p>
        </div>
    );
};

export default ErrorCard;
