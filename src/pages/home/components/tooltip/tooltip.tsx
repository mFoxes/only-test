import React, { useEffect } from 'react';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import './tooltip.scss';
import ArrowSvg from '../../../../assets/svg/arrow.svg';
import classNames from 'classnames';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { setActiveDot } from '../../slices/homeSlice';
import { homeData } from '../../constants/homeData';
import gsap from 'gsap';

export const Tooltip = () => {
    const dispatch = useAppDispatch();
    const dotsCount = useAppSelector((state) => state.home.dotsCount);
    const activeDotKey = useAppSelector((state) => state.home.activeDotKey);

    const handleDateChange = (isInc: boolean) => {
        const nextKey = isInc ? activeDotKey - 1 : activeDotKey + 1;
        const nextDot = homeData.find((_, index) => nextKey === index);
        if (nextDot) {
            dispatch(setActiveDot({ ...nextDot, key: nextKey }));
        }
    };

    useEffect(() => {
        gsap.to('.tooltip__counter-item', {
            textContent: activeDotKey + 1,
            duration: 0.5,
            ease: 'none',
            snap: { textContent: 1 }
        });
    }, [activeDotKey]);

    return (
        <div className="tooltip">
            <div className="tooltip__divider" />
            <div className="tooltip__container">
                <div className="tooltip__counter">
                    0<span className="tooltip__counter-item">1</span>/0{dotsCount}
                </div>
                <div className="tooltip__button-wrapper">
                    <div
                        onClick={() => handleDateChange(true)}
                        className={classNames('tooltip__button', { disabled: activeDotKey === 0 })}>
                        <ArrowSvg />
                    </div>
                    <div
                        onClick={() => handleDateChange(false)}
                        className={classNames('tooltip__button', 'right', {
                            disabled: activeDotKey + 1 === dotsCount
                        })}>
                        <ArrowSvg />
                    </div>
                </div>
            </div>
        </div>
    );
};
