import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CiStar, CiSearch } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';

import Badge from '@mui/material/Badge';
import { IconContext } from 'react-icons';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useScrollDirection from '../hooks/useScrollDirection';
import useOnClickOutside from '../hooks/useCheckClickedOutside';
import Search from '../components/search/Search';
import MegaMenu from '../components/menu/MegaMenu';
import useWindowSize from '../hooks/useWindowSize';
import IdentificationModal from '../components/IdentificationModal';
import { HamburgerIcon, Logo } from '../components/Icon';
import { current } from '@reduxjs/toolkit';

const Header = () => {
    const scrollDirection = useScrollDirection();
    const size = useWindowSize();
    const { pathname } = useLocation();
    const searchRef = useRef(null);
    const megaMenuRef = useRef(null);
    const modalRef = useRef(null);

    const user = useSelector((state) => state.auth.login.currentUser);
    const cart = useSelector((state) => state.cart.shoppingCart);

    const navigate = useNavigate();

    const direction = scrollDirection.direction ? scrollDirection.direction : 'top';

    const [navToggle, setNavToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);
    const [utilityToggle, setUtilityToggle] = useState(false);

    const calcTotalQuantity = () => {
        return cart.reduce((acc, cur) => acc + cur.quantity, 0);
    };

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

    const handleUtilityCotent = () => {
        if (user) {
            navigate('/user');
        }
        setUtilityToggle(!utilityToggle);
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
                        </StyledIconButton>
                    </div>
                    {/* <HeaderLogo src="logo-test.png" alt="Logo" /> */}
                    <Link className="logo" to={`/`}>
                        <Logo />
                    </Link>
                    <IconContext.Provider value={{ className: 'nav-right__icons' }}>
                        <div className="nav--right">
                            <CiSearch size={22} onClick={() => setSearchToggle(!searchToggle)} />
                            <CiStar size={24} />
                            <Link to="/cart" className="cart-link">
                                <BsHandbag className="cart-icon" />
                                {calcTotalQuantity() > 0 && <span>{calcTotalQuantity()}</span>}
                            </Link>
                            <BiUser size={18} onClick={handleUtilityCotent} />
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
        .cart-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: 5px;
            color: inherit;
            .cart-icon {
                margin-right: 2px;
            }
            span {
                font-size: 14px;
            }
        }
        .nav-right__icons {
            cursor: pointer;
            margin: 0 0.5rem;
            display: none;
            @media (min-width: 768px) {
                display: block;
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

const StyledBadge = styled(Badge)`
    .MuiBadge-badge {
        background-color: #ccc;
        color: red;
        right: 5px;
        top: 5px;
        min-width: 12px;
        width: 14px;
        height: 14px;
    }
`;
