import gsap from 'gsap';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../../../../shared/hooks/useAppSelector';

export const Date = () => {
    const activeDot = useAppSelector((state) => state.home.activeDot);

    useEffect(() => {
        if (!activeDot) {
            return;
        }

        const tl = gsap.timeline();
        tl.to(
            '.spinner__date-left',
            {
                textContent: activeDot?.startDate,
                duration: 1,
                ease: 'none',
                snap: { textContent: 1 }
            },
            0
        );
        tl.to(
            '.spinner__date-right',
            {
                textContent: activeDot?.endDate,
                duration: 1,
                ease: 'none',
                snap: { textContent: 1 }
            },
            0
        );
    }, [activeDot?.startDate, activeDot?.endDate]);

    return (
        <div className="spinner__date">
            <div className="spinner__date-left">2010</div>
            <div className="spinner__date-right">2010</div>
        </div>
    );
};
