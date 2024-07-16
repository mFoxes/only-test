import React, { useEffect, useState } from 'react';
import LoaderSvg from '../../assets/svg/tail-spin.svg';
import './loader.scss';
import gsap from 'gsap';

interface LoaderProps {
    isDataLoading?: boolean;
}

export const Loader = ({ isDataLoading }: LoaderProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isDataLoading) {
            gsap.to('.loader', { opacity: 0, duration: 1, onComplete: () => setIsLoading(false) });
        }
    }, [isDataLoading]);

    if (!isLoading) {
        return <></>;
    }

    return (
        <div className="loader">
            <LoaderSvg />
        </div>
    );
};
