import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import Carousel from '../../components/Carousel';
import HeroVideo from '../../components/HeroVideo';
import useWindowSize from '../../hooks/useWindowSize';
import categoryApis from '../../apis/categoryApis';
import productApis from '../../apis/productApis';
import { useState, useEffect } from 'react';

const HomePage = () => {
    const size = useWindowSize();
    const [imgs, setImgs] = useState([]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApis.getAllCategories(),
    });

    const productsQuery = useQuery({
        queryKey: ['latest-products'],
        queryFn: () => productApis.getLatestProducts(),
    });

    useEffect(() => {
        productsQuery?.data?.map((product, idx) => {
            const img = product.images.slice(0, 1);
            setImgs((prev) => [...prev, ...img]);
        });
    }, [productsQuery.data]);

    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;

    const videos = data?.[1].videos || [];

    return (
        <>
            <HeroVideo
                id="player1"
                url={`${size.width > 786 ? videos?.desktop_tablet?.[0].url : videos?.mobile?.[0].url}`}
            />
            {imgs && imgs.length > 0 && (
                <StyledWrapperCaroseul>
                    <Carousel imgs={imgs} pagination={false} isCustom={false} />
                </StyledWrapperCaroseul>
            )}
            <HeroVideo
                id="player2"
                url={`${
                    size.width > 786
                        ? 'https://lv-vod.fl.freecaster.net/vod/louisvuitton/L0dxtJ5zj2_HD.mp4'
                        : 'https://lv-vod.fl.freecaster.net/vod/louisvuitton/6QvigaabzW_MD.mp4'
                }`}
            />
            <StyledImage>
                <img src={`${size.width > 786 ? '/images/standard.png' : '/images/small.jpg'}`} />
            </StyledImage>
            <HeroVideo
                id="player3"
                url={`${
                    size.width > 786
                        ? 'https://lv-vod.fl.freecaster.net/vod/louisvuitton/L0dxtJ5zj2_HD.mp4'
                        : 'https://lv-vod.fl.freecaster.net/vod/louisvuitton/6QvigaabzW_MD.mp4'
                }`}
            />
            {/* <StyledImage>
                <img
                    alt=""
                    class="lv-smart-picture__object"
                    srcset="https://eu.louisvuitton.com/content/dam/lv/online/high-end/women/jewelry/BC_Edito_Women_Jwl_LV_Volt.html/jcr:content/assets/230121_VOLT_CDP2_WORN_LVCOM_1600x2000_DII.jpg"
                ></img>
            </StyledImage> */}
        </>
    );
};

export default HomePage;

const StyledImage = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const StyledWrapperCaroseul = styled.div`
    position: relative;
`;

// const StyledVideo = styled.video`
//     position: absolute;
//     right: 0;
//     bttom: 0;
//     z-index: -1;
//     @media (min-aspect-ratio: 16/9) {
//         width: 100%;
//         hright: auto;
//     }
//     @media (max-aspect-ratio: 16/9) {
//         width: auto;
//         hright: 100%;
//     }
// `;
