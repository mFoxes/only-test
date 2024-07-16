import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { InitializingState } from '../../../shared/constants/initialazingState';
import { HomeDataItem } from '../types/homeDataItem';
import { SliderDataItem } from '../types/sliderDataItem';

const sliceName = 'home';

interface InitialState {
    activeDot: (HomeDataItem & { key: number }) | null;

    dotsCount: number;

    activeDotKey: number;
    activeDotTitle: string;

    activeSliderData: SliderDataItem[];

    isInitializing: InitializingState;
}

const initialState: InitialState = {
    activeDot: null,
    dotsCount: 0,

    activeDotKey: 0,
    activeDotTitle: '',

    activeSliderData: [],

    isInitializing: InitializingState.Empty
};

export const counterSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setInitialState: (state, action: PayloadAction<HomeDataItem[]>) => {
            const { payload: homeData } = action;
            if (homeData.length) {
                state.activeDot = { ...homeData[0], key: 0 };

                state.dotsCount = homeData.length;

                state.activeDotKey = 0;
                state.activeDotTitle = homeData[0].title;

                state.activeSliderData = homeData[0].sliderData;
            }
        },
        setIsInitializingState: (state, action: PayloadAction<InitializingState>) => {
            state.isInitializing = action.payload;
        },
        setActiveDot: (state, action: PayloadAction<HomeDataItem & { key: number }>) => {
            state.activeDot = action.payload;
            state.activeDotKey = action.payload.key;
        },
        setActiveDotTitle: (state, action: PayloadAction<string>) => {
            state.activeDotTitle = action.payload;
        },
        setActiveSliderData: (state, action: PayloadAction<SliderDataItem[]>) => {
            state.activeSliderData = action.payload;
        }
    }
});

export const {
    setInitialState,
    setIsInitializingState,
    setActiveDot,
    setActiveDotTitle,
    setActiveSliderData
} = counterSlice.actions;

export default counterSlice.reducer;
