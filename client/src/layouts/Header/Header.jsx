import { useState, useEffect, useRef } from 'react';

import { CiStar, CiSearch } from 'react-icons/ci';
import { BsHandbag } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';

import { IconContext } from 'react-icons';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Wrapper, StyledIconButton, StyledNavigation, LabelMenuHamburger, NavBarTop, BackDrop } from './headerStyles';
import useScrollDirection from '../../hooks/useScrollDirection';
import useOnClickOutside from '../../hooks/useCheckClickedOutside';
import Search from '../../components/search/Search';
import MegaMenu from '../../components/menu/MegaMenu';
import useWindowSize from '../../hooks/useWindowSize';
import IdentificationModal from '../../components/IdentificationModal';
import { HamburgerIcon, Logo } from '../../components/Icon';

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
