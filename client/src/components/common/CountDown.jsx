import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CountDown = ({ seconds, path }) => {
    const [countDown, setCountDown] = useState(seconds);
    const navigate = useNavigate();
    useEffect(() => {
        if (countDown <= 0) return;
        const interval = setInterval(() => {
            setCountDown((countDown) => countDown - 1);
        }, 1000);
        return () => clearTimeout(interval);
    }, [countDown]);

    return (
        <>
            <span>Redirect to homepage in {countDown}s</span>
            {countDown === 0 && navigate('/')}
        </>
    );
};

export default CountDown;
