import { useRef } from 'react';
import styled from 'styled-components';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const Carousel = (props) => {
    const { imgs, pagination, autoplay, loop, isProduct, isCustom, slidesPerView = 1, turnOffArrows = false } = props;

    const swiperRef = useRef(null);

    const swiperNextButtonRef = useRef(null);
    const swiperPrevButtonRef = useRef(null);

    return (
        <>
            <Wrapper>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={slidesPerView}
                    autoplay={autoplay}
                    pagination={pagination}
                    loop={loop}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;

                        // swiper.navigation.prevEl = swiperPrevButtonRef.current;
                        // swiper.navigation.nextEl = swiperNextButtonRef.current;
                        // swiper.navigation.init();
                        // swiper.navigation.update();
                    }}
                >
                    {imgs.map((img, idx) => {
                        return (
                            <SwiperSlide key={idx}>
                                {!isProduct ? (
                                    <StyledImage src={img.url} alt="Anh" />
                                ) : (
                                    <StyledProductImage src={img.url} alt="Anh" slidesPerView={slidesPerView} />
                                )}
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Wrapper>
            <SwiperPrevBtn
                isCustom={isCustom}
                onClick={() => swiperRef.current?.slidePrev()}
                turnOffArrows={turnOffArrows}
            />
            <SwiperNextBtn
                isCustom={isCustom}
                onClick={() => swiperRef.current?.slideNext()}
                turnOffArrows={turnOffArrows}
            />
        </>
    );
};

export default Carousel;

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    text-align: center;
    /* .swiper-button-prev::after,
    .swiper-button-next::after {
        display: none;
    }
    .swiper-button-next {
        background-image: url(/images/chevron-right.svg);
    }
    .swiper-button-prev {
        background-image: url(/images/chevron-left.svg);
    }
    .swiper-button-next,
    .swiper-button-prev {
        width: 18px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        opacity: 0;
    }
    &:hover {
        .swiper-button-prev,
        .swiper-button-next {
            opacity: 1;
        }
    } */
`;

const StyledImage = styled.img`
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    aspect-ratio: 5/3;
    @media screen and (max-width: 1024px) {
        aspect-ratio: 1/1;
    }
`;

const StyledProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: ${(props) => props.slidesPerView > 1 && '#f6f5f3'};
`;

const SwiperBtn = styled.div`
    position: absolute;
    top: 50%;
    cursor: pointer;
    z-index: 2;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const SwiperPrevBtn = styled(SwiperBtn)`
    display: ${(props) => (props.turnOffArrows ? 'none' : 'block')};
    left: ${(props) => (props.isCustom ? '5%' : '0')};
    background-image: url(/images/chevron-left.svg);
    width: ${(props) => (props.isCustom ? '18px' : '60px')};
    height: ${(props) => (props.isCustom ? '18px' : '60px')};
`;
const SwiperNextBtn = styled(SwiperBtn)`
    display: ${(props) => (props.turnOffArrows ? 'none' : 'block')};
    right: ${(props) => (props.isCustom ? '5%' : '0')};
    background-image: url(/images/chevron-right.svg);
    width: ${(props) => (props.isCustom ? '18px' : '60px')};
    height: ${(props) => (props.isCustom ? '18px' : '60px')};
`;
