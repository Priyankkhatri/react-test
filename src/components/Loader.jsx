import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const Loader = () => {
    return (
        <div className="loader-container">
            <BiLoaderAlt className="spinner" size={40} />
        </div>
    );
};

export default Loader;
