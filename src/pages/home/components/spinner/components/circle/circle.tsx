import classNames from 'classnames';
import gsap, { Linear } from 'gsap';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../../../shared/hooks/useAppSelector';
import { useAppDispatch } from '../../../../../../shared/hooks/useAppDispatch';
import { setActiveDot, setActiveDotTitle } from '../../../../slices/homeSlice';
import { homeData } from '../../../../constants/homeData';
import { HomeDataItem } from '../../../../types/homeDataItem';

export const Circle = () => {
    const dispatch = useAppDispatch();
    const dotsCount = useAppSelector((state) => state.home.dotsCount);

    const activeDot = useAppSelector((state) => state.home.activeDot);

    const activeDotKey = useAppSelector((state) => state.home.activeDotKey);
    const activeDotTitle = useAppSelector((state) => state.home.activeDotTitle);

    const circleSize = 530;
    const circleSizeDotRadius = circleSize / 2;

    const getDotCoordinates = (index: number, arrayLength: number) => {
        const mathFormula =
            (2 * Math.PI * (arrayLength - index)) / arrayLength + (60 * Math.PI) / 180;
        const x = circleSizeDotRadius + circleSizeDotRadius * Math.cos(mathFormula);
        const y = circleSizeDotRadius + circleSizeDotRadius * Math.sin(mathFormula);

        return [x, y];
    };

    const [titleX, titleY] = getDotCoordinates(0, dotsCount);

    const handleSetActiveDote = (key: number, data: HomeDataItem) => {
        dispatch(setActiveDot({ ...data, key }));
    };

    useEffect(() => {
        if (!activeDot) {
            return;
        }

        const degreePart = 360 / dotsCount;
        const rotateValue = degreePart * activeDot.key;
        const tl = gsap.timeline();
        tl.to(
            '.spinner__title',
            {
                opacity: 0,
                duration: 0.5
            },
            0
        );
        tl.to(
            '.spinner__circle',
            {
                rotate: -rotateValue,
                duration: 1,
                onComplete: () => {
                    dispatch(setActiveDotTitle(activeDot.title));
                },
                ease: 'none'
            },
            0
        );
        tl.to('.spinner__item', { rotate: rotateValue, duration: 0.2, ease: Linear.easeNone }, 0);
        tl.to('.spinner__title', { opacity: 1, duration: 1 });
    }, [activeDot]);

    return (
        <div
            className="spinner__container"
            style={{ width: `${circleSize}px`, height: `${circleSize}px` }}>
            <div
                className="spinner__circle"
                style={{ width: `${circleSize}px`, height: `${circleSize}px` }}>
                {homeData.map((item, index) => {
                    const [x, y] = getDotCoordinates(index, dotsCount);
                    return (
                        <div
                            key={index}
                            onClick={() => handleSetActiveDote(index, item)}
                            className={classNames([
                                'spinner__item',
                                { active: activeDotKey === index }
                            ])}
                            style={{ left: `${x}px`, bottom: `${y}px` }}>
                            <div className="sinner__item-container">
                                <div className="spinner__number">{index + 1}</div>
                                <div className="spinner__dot" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div
                className="spinner__title"
                style={{
                    left: `${titleX + 48}px`,
                    bottom: `${titleY}px`
                }}>
                {activeDotTitle}
            </div>
        </div>
    );
};
