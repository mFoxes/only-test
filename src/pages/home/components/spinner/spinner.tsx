import React from 'react';
import { Circle } from './components/circle/circle';
import { Date } from './components/date/date';
import './spinner.scss';

export const Spinner = () => {
    return (
        <div className="spinner">
            <Circle />
            <Date />

            <div className="wline" />
        </div>
    );
};
