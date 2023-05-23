import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { BsVolumeMute, BsVolumeUp, BsPause, BsPlay } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { useState, useRef, useEffect } from 'react';
import { Waypoint } from 'react-waypoint';
import lozad from 'lozad';
import useIntersectionObserver from '@react-hook/intersection-observer';

const HeroVideo = ({ ...props }) => {
    const videoRef = useRef(null);
    const [isTest, setIsTest] = useState(true);
    const [isPause, setIsPause] = useState(true);
    useEffect(() => {
        const { observe, observer } = lozad('[data-use-lozad]', {
            loaded: (el) => {
                el.classList.add('fade');
            },
        });
        observe();
        return () => observer.disconnect();
    }, []);
    function Mute() {
        const videos = document.getElementsByTagName('video');
        const playerId = videoRef.current.props.id;
        for (var i = 0, len = videos.length; i < len; i++) {
            if (videos[i].offsetParent.id !== playerId) {
                videos[i].muted = true;
            }
        }
    }

    const handleEnterViewport = () => {
        setIsPause(true);
    };
    const handleExitViewport = () => {
        setIsPause(false);
    };

    const handlePause = () => {
        setIsPause(!isPause);
    };

    const processAction = () => {
        Mute();
        if (isTest) {
            videoRef.current.getInternalPlayer().muted = false;
            setIsTest(false);
        } else {
            videoRef.current.getInternalPlayer().muted = true;
            setIsTest(true);
        }
    };

    return (
        <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
            <StyledVideoContainer>
                <ReactPlayer
                    id={props.id}
                    className="background-video lozad"
                    width="100%"
                    height="100%"
                    ref={videoRef}
                    url={props.url}
                    loop
                    muted
                    playing={isPause}
                    playsinline
                />

                {/* <video muted autoPlay loop playsInline width="100%" height="100%">
                    <source src={props.url} type="video/mp4" />
                </video> */}

                <StyledContentVideo>
                    <StyledTitle>Zendaya and the Capucines</StyledTitle>
                    <StyledButtonLink>Discover the Campaign</StyledButtonLink>
                </StyledContentVideo>
                <PLayerControl>
                    <IconContext.Provider value={{ className: 'pc-right__icons', size: 24, color: '#fff' }}>
                        {videoRef?.current?.getInternalPlayer()?.muted || isTest ? (
                            <BsVolumeMute
                                onClick={() => {
                                    processAction();
                                }}
                            />
                        ) : (
                            <BsVolumeUp
                                onClick={() => {
                                    processAction();
                                }}
                            />
                        )}
                        {/* {isPause ? <BsPause onClick={handlePause} /> : <BsPlay onClick={handlePause} />} */}
                    </IconContext.Provider>
                </PLayerControl>
            </StyledVideoContainer>
        </Waypoint>
    );
};

export default HeroVideo;

const StyledVideoContainer = styled.div`
    position: relative;
    padding-top: 56.25%;
    @media (max-width: 768px) {
        padding-top: 177.77777%;
    }

    .background-video {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
    }
`;
const StyledContentVideo = styled.div`
    text-align: center;
    box-sizing: border-box;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 5%;
    left: 0;
    z-index: 99;
    width: 100%;
    cursor: pointer;
    .player-controls {
        display: flex;
        position: absolute;
        right: 5%;
        bottom: 0;
        .pc-right__icons {
            margin-left: 2rem;
        }
    }
`;

const StyledTitle = styled.h2`
    color: #fff;
    font-size: 2.375rem;
    font-weight: 500;
    letter-spacing: 0.125rem;
    @media (max-width: 768px) {
        font-size: 1.75rem;
    }
`;
const StyledButtonLink = styled.button`
    color: #fff;
    background-color: transparent;
    padding: 0.625rem 1.5rem 0.85rem;
    box-shadow: inset 0 0 0 1px #fff;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    font-size: 1rem;
    transition: border 0.3s cubic-bezier(0.39, 0.575, 0.565, 1), box-shadow 0.3s;
    &:hover {
        box-shadow: inset 0 0 0 2px #fff;
    }
`;

const PLayerControl = styled.div`
    display: flex;
    position: absolute;
    right: 4%;
    bottom: 5.5%;
    z-index: 99;
    .pc-right__icons {
        cursor: pointer;
    }
    @media screen and (max-width: 768px) {
        top: 4rem;
        right: 2%;
    }
`;
