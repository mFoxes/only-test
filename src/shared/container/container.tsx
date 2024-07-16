import React, { FC, HTMLAttributes } from 'react';
import './container.scss';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = ({ children, ...props }: ContainerProps) => {
    return <div className="container">{children}</div>;
};
