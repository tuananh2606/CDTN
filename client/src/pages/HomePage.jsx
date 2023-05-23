import styled from 'styled-components';

import Carousel from '../components/Carousel';
import HeroVideo from '../components/HeroVideo';
import useWindowSize from '../hooks/useWindowSize';

const HomePage = () => {
    const size = useWindowSize();
    const imgs = [
        'http://media.gucci.com/content/DarkGray_ProductPush_Standard_700x700/1681494334/ProductPush_67579710ODT5467-april17-01_001_Light.jpg',
        'http://media.gucci.com/content/DarkGray_ProductPush_Standard_700x700/1681494332/ProductPush_67220610ODT1060-april17-01_001_Light.jpg',
        'http://media.gucci.com/content/DarkGray_ProductPush_Standard_700x700/1681494332/ProductPush_67220610ODT1060-april17-01_001_Light.jpg',
    ];
    return (
        <>
            <HeroVideo id="player1" url={`${size.width > 786 ? '/videos/desktop_tablet.mp4' : '/videos/mobile.mp4'}`} />
            <StyledWrapperCaroseul>
                <Carousel imgs={imgs} pagination={false} isCustom={false} />
            </StyledWrapperCaroseul>
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
        </>
    );
};

export default HomePage;

const StyledImage = styled.div`
    width: 100%;
    height: 100vh;
    /* min-height: 100vh; */
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
