import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDisplayText(text.substring(0, currentIndex + 1));
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 100);

        return () => clearTimeout(timer);
    }, [currentIndex, text]);

    return <h1>{displayText}</h1>;
};

export default Typewriter;
