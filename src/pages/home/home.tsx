import React, { useEffect } from 'react';
import './home.scss';
import { Title } from './components/title/title';
import { Slider } from './components/slider/slider';
import { Spinner } from './components/spinner/spinner';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { setInitialState, setIsInitializingState } from './slices/homeSlice';
import { InitializingState } from '../../shared/constants/initialazingState';
import { homeData } from './constants/homeData';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { Loader } from '../../shared/loader/loader';
import { Tooltip } from './components/tooltip/tooltip';

export const Home = () => {
    const dispatch = useAppDispatch();

    const isInitializing = useAppSelector((store) => store.home.isInitializing);

    useEffect(() => {
        new Promise((resolve) => {
            dispatch(setIsInitializingState(InitializingState.Loading));
            setTimeout(() => {
                dispatch(setInitialState(homeData));
                resolve(true);
            }, 2000);
        }).then(() => {
            setTimeout(() => {
                dispatch(setIsInitializingState(InitializingState.Done));
            }, 1000);
        });
    }, []);

    return (
        <div className="home">
            <div className="home__container">
                <div className="home__spinner-wrapper">
                    <Title />
                    <Spinner />
                    <Tooltip />
                </div>
                <div className="home__divider" />
                <Slider />
                <Loader isDataLoading={isInitializing !== InitializingState.Done} />
            </div>
            <div className="hline" />
        </div>
    );
};
