import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CiStar, CiSearch } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import { useLocation, Link } from 'react-router-dom';

import useScrollDirection from '../hooks/useScrollDirection';
import useOnClickOutside from '../hooks/useCheckClickedOutside';
import HamburgerIcon from '../components/Icon/Hamburger';
import Search from '../components/search/Search';
import MegaMenu from '../components/menu/MegaMenu';
import useWindowSize from '../hooks/useWindowSize';
import IdentificationModal from '../components/IdentificationModal';

const Header = () => {
    const scrollDirection = useScrollDirection();
    const size = useWindowSize();
    const { pathname } = useLocation();
    const searchRef = useRef(null);
    const megaMenuRef = useRef(null);
    const modalRef = useRef(null);

    // State for our modal
    const direction = scrollDirection.direction;

    const [navToggle, setNavToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);
    const [utilityToggle, setUtilityToggle] = useState(false);

    useEffect(() => {
        if (size.width > 768) {
            if (navToggle || searchToggle || utilityToggle) {
                if (typeof window != 'undefined' && window.document) {
                    document.body.style.overflow = 'hidden';

                    document.body.style.paddingRight = '15px'; /* Avoid width reflow */
                }
            } else {
                document.body.style.overflow = 'unset';
                document.body.style.paddingRight = '0';
            }
        }
    }, [navToggle, searchToggle, utilityToggle]);

    useOnClickOutside(megaMenuRef, (e) => {
        let menuHamburger = document.querySelectorAll('#menu-hamburger');
        let mH = Array.apply(0, menuHamburger).find((el) => el.contains(e.target));
        if (!mH && !megaMenuRef.current.contains(e.target)) {
            setNavToggle(false);
        }
    });
    useOnClickOutside(searchRef, (e) => {
        let searchContainer = document.querySelectorAll('#search-container');
        let sC = Array.apply(0, searchContainer).find((el) => el.contains(e.target));
        if (!sC && !searchRef.current.contains(e.target)) {
            setSearchToggle(false);
        }
    });

    useOnClickOutside(modalRef, (e) => {
        let modal = document.querySelectorAll('#modal-container');
        let md = Array.apply(0, modal).find((el) => el.contains(e.target));
        if (!md && !modalRef.current.contains(e.target)) {
            setUtilityToggle(false);
        }
    });

    const showSidebar = () => {
        setNavToggle(!navToggle);
    };

    return (
        <Wrapper>
            <StyledNavigation direction={direction} pathname={pathname}>
                <NavBarTop>
                    <div className="nav--left">
                        <StyledIconButton
                            id="menu-hamburger"
                            aria-expanded="false"
                            direction={direction}
                            navToggle={navToggle}
                            onClick={showSidebar}
                        >
                            <HamburgerIcon
                                navToggle={navToggle}
                                setNavToggle={setNavToggle}
                                width="18px"
                                height="18px"
                            />
                            <LabelMenuHamburger className={navToggle && 'move-label-up'} pathname={pathname}>
                                <span className="label-up">Menu</span>
                                <span className="label-up">Close</span>
                            </LabelMenuHamburger>
                            {/* <span className={`hamburger-icon-text ${navToggle ? 'active' : 'inactive'}`}>Menu</span> */}
                        </StyledIconButton>
                    </div>
                    {/* <HeaderLogo src="logo-test.png" alt="Logo" /> */}
                    <Link className="logo" to={`/`}>
                        <svg viewBox="0 0 151 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                d="M67.637.293l3.816 9.205L75.269.293h2.725L71.746 15.39l-.293.294-.294-.294L64.911.293h2.726zm-13.712 0c1.468 0 2.86.767 3.627 1.887l-1.467 1.468h-.462c-.304-.65-.973-1.048-1.698-1.048-.863 0-1.672.71-1.72 1.614-.035.68.277 1.105.84 1.468.606.391.854.554 1.677 1.006.897.493 3.166 1.46 3.166 4.005 0 2.509-2.097 4.843-4.802 4.843-.347 0-.976-.039-1.446-.147-1.325-.321-2.129-.822-2.998-1.845l1.887-1.929.65.545c.293.23.937.693 1.55.776 1.246.169 2.082-.655 2.244-1.468.129-.642-.034-1.6-1.069-2.096 0 0-1.866-1.037-2.684-1.51-.833-.482-1.719-1.798-1.719-3.375 0-1.174.538-2.311 1.405-3.103.67-.614 1.589-1.09 3.019-1.09zM138.67 0l9.77 9.77V.587l.294-.294h1.929l.294.294v14.802h-.462l-9.602-9.602v9.309l-.294.293h-1.929l-.293-.293V.293L138.67 0zm-28.807.293v2.223l-.294.293h-2.222v12.58h-2.516V2.809h-2.516V.587l.294-.294h7.254zm9.225 0v2.223l-.294.293h-2.222v12.58h-2.516V2.809h-2.516V.587l.294-.294h7.254zM2.516.293v12.58h5.032v2.516H0V.587L.293.293h2.223zm14.257 0a7.548 7.548 0 110 15.096 7.548 7.548 0 010-15.096zm111.54 0a7.548 7.548 0 110 15.096 7.548 7.548 0 010-15.096zm-98.415 0l.293.294v9.77a2.516 2.516 0 005.032 0V.587l.294-.294h1.929l.293.294v9.77a5.032 5.032 0 01-10.064 0V.587l.294-.294h1.929zm15.389 0v14.803l-.294.293h-2.222V.587l.293-.294h2.223zm37.446 0l.293.294v9.77a2.516 2.516 0 005.032 0V.587l.294-.294h1.928l.294.294v9.77a5.032 5.032 0 01-10.064 0V.587l.294-.294h1.929zm15.389 0v14.803l-.294.293h-2.222V.587l.293-.294h2.223zM16.772 2.81a5.032 5.032 0 10.001 10.065 5.032 5.032 0 000-10.065zm111.541 0a5.032 5.032 0 100 10.065 5.032 5.032 0 000-10.065z"
                                fillRule="evenodd"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </Link>
                    <IconContext.Provider value={{ className: 'nav-right__icons' }}>
                        <div className="nav--right">
                            <CiSearch size={22} onClick={() => setSearchToggle(!searchToggle)} />

                            <a style={{ margin: '0 0,5rem' }} href="#">
                                Sign In
                            </a>
                            <CiStar size={24} />
                            <BsHandbag size={18} onClick={() => setUtilityToggle(!utilityToggle)} />
                        </div>
                    </IconContext.Provider>
                </NavBarTop>
                <Search searchToggle={searchToggle} setSearchToggle={setSearchToggle} ref={searchRef} />
                <MegaMenu navToggle={navToggle} ref={megaMenuRef} setNavToggle={setNavToggle} />
                <IdentificationModal toggle={utilityToggle} setToggle={setUtilityToggle} ref={modalRef} />
                {(navToggle || searchToggle || utilityToggle) && <BackDrop />}
            </StyledNavigation>
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.header`
    position: relative;
`;

const StyledIconButton = styled.button`
    position: absolute;
    transform: translateY(-50%);
    z-index: 999;
    display: flex;
    align-items: center;
    padding: 0;
    cursor: pointer;
    color: ${(props) => (!props.navToggle && props.direction === 'top' ? '#fff' : '#000')};
    background-color: transparent;
    border: none;
`;

const StyledNavigation = styled.div`
    box-sizing: border-box;
    background-color: ${(props) => (props.direction === 'up' ? '#fff' : 'transparent')};
    background-color: ${(props) => props.pathname !== '/' && '#fff'};
    font-family: futura-pt-light, Helvetica, Arial, sans-serif;
    position: fixed;
    top: ${(props) => (props.direction === 'down' ? '-8rem' : '0px')};
    z-index: 100;
    color: ${(props) => (props.direction === 'top' ? '#fff' : '#000')};
    color: ${(props) => props.pathname !== '/' && '#000'};
    height: var(--header-height);
    padding: var(--header-padding-top) var(--header-padding-x) 0;
    width: 100%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    @media (max-width: 768px) {
        height: 4rem;
        padding: calc(var(--header-padding-top) / 2) calc(var(--header-padding-x) / 2) 0;
    }
`;

const LabelMenuHamburger = styled.div`
    display: inline-block;
    height: 60px;
    line-height: 60px;
    position: relative;
    overflow: hidden;
    color: ${(props) => props.pathname !== '/' && '#000'};
    .label-up {
        display: block;
        position: relative;
        height: 100%;
        margin-left: 12px;
        top: 0%;

        transition: 0.4s;
    }

    &.move-label-up {
        .label-up {
            top: -100%;
        }
    }
`;

const NavBarTop = styled.div`
    width: 100%;
    display: grid;
    align-items: center;
    position: relative;
    grid-template-columns: repeat(3, 1fr);
    padding: 0.5rem 0;

    .nav--left {
        justify-self: start;
        @media (max-width: 768px) {
            span {
                display: none;
            }
        }
    }
    .nav--right {
        justify-self: end;
        display: flex;
        align-items: center;
        a {
            @media (max-width: 768px) {
                display: none;
            }
        }
        .nav-right__icons {
            cursor: pointer;
            margin: 0 0.5rem;
            @media (max-width: 768px) {
                display: none;
            }
        }
        > *:first-child {
            margin-right: 0.5rem;
            @media (max-width: 768px) {
                display: block !important;
            }
        }
    }
    .logo {
        width: 14.1875rem;
        display: flex;
        align-items: center;
        justify-self: center;
        color: inherit;
        @media (max-width: 768px) {
            width: 9.625rem;
        }
    }
`;

const BackDrop = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
`;
