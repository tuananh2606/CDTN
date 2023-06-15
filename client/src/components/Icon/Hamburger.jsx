import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import useScrollDirection from '../../hooks/useScrollDirection';

const HamburgerIcon = ({ navToggle, width = '22px', height = '22px' }) => {
    const scrollDirection = useScrollDirection();
    const { pathname } = useLocation();

    const direction = scrollDirection.direction ? scrollDirection.direction : 'top';

    return (
        <HamburgerContainer
            id="nav-icon3"
            navToggle={navToggle}
            direction={direction}
            className={navToggle ? 'active' : 'inactive'}
            pathname={pathname}
            width={width}
            height={height}
        >
            <div className="menu-btn__burger"></div>
        </HamburgerContainer>
    );
};

export default HamburgerIcon;

const HamburgerContainer = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin: 0 4px;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .menu-btn__burger {
        position: relative;
        width: 100%;
        height: 2px;
        background: ${(props) => (!props.navToggle && props.direction === 'top' ? '#fff' : '#000')};
        background: ${(props) => props.pathname !== '/' && '#000'};
        transition: all 0.4s ease-in-out;
    }
    .menu-btn__burger::before {
        top: -7px;
    }
    .menu-btn__burger::after {
        top: 7px;
    }
    .menu-btn__burger::before,
    .menu-btn__burger::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2.5px;
        left: 0;
        background: ${(props) => (!props.navToggle && props.direction === 'top' ? '#fff' : '#000')};
        background: ${(props) => props.pathname !== '/' && '#000'};
        transition: all 0.4s ease-in-out;
    }

    &.active {
        .menu-btn__burger {
            background: transparent !important;
        }
        .menu-btn__burger::before {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            top: 0;
            transform: rotate(45deg);
        }
        .menu-btn__burger::after {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            box-shadow: 0 0 transparent;
            top: 0;
            transform: rotate(-45deg);
        }
    }
`;
