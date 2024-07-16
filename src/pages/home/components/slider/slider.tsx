import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import SwiperController from 'swiper';
import { Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import ArrowSvg from '../../../../assets/svg/arrow.svg';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { useWindowSize } from '../../../../shared/hooks/useWindowSize';
import { setActiveSliderData } from '../../slices/homeSlice';
import './slider.scss';

export const Slider = () => {
    const dispatch = useAppDispatch();

    const activeDot = useAppSelector((state) => state.home.activeDot);
    const activeSliderData = useAppSelector((state) => state.home.activeSliderData);
    const [swiper, setSwiper] = useState<SwiperController | null>(null);

    const { width } = useWindowSize();

    const getSwiperSettings = () => {
        const res = {
            spaceBetween: 80,
            slidesPerView: 4
        };
        if (width <= 769) {
            res.spaceBetween = 25;
            res.slidesPerView = 1.5;
        } else if (width <= 1024) {
            res.spaceBetween = 25;
            res.slidesPerView = 2;
        } else if (width <= 1200) {
            res.spaceBetween = 40;
            res.slidesPerView = 3;
        }

        return res;
    };

    const { spaceBetween, slidesPerView } = getSwiperSettings();

    useEffect(() => {
        const tl = gsap.timeline();
        tl.to('.swiper__wrapper', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                swiper?.slideTo(0);
                dispatch(setActiveSliderData(activeDot?.sliderData ?? []));
            }
        });
        tl.to('.swiper__wrapper', {
            opacity: 1,
            duration: 1,
            delay: 0.5
        });
    }, [activeDot]);

    return (
        <div className="swiper__wrapper">
            <div className="swiper__box">
                <div className="swiper-custom-button-prev">
                    <ArrowSvg />
                </div>
                <Swiper
                    modules={[Pagination, Controller, Navigation]}
                    onSwiper={setSwiper}
                    controller={{ control: swiper }}
                    spaceBetween={spaceBetween}
                    slidesPerView={slidesPerView}
                    navigation={{
                        prevEl: '.swiper-custom-button-prev',
                        nextEl: '.swiper-custom-button-next'
                    }}
                    pagination={{ clickable: true, el: '.swiper-custom-pagination' }}>
                    {activeSliderData.map((item, indx) => (
                        <SwiperSlide key={`slider-item-${indx}`}>
                            <div className="title">{item.title}</div>
                            <div className="content">{item.content}</div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-custom-button-next">
                    <ArrowSvg />
                </div>
            </div>
            <div className="swiper-custom-pagination" />
        </div>
    );
};
