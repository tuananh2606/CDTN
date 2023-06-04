import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Logo } from '../components/Icon';

const UserPageLayout = ({ children }) => {
    return (
        <>
            <UserHeader>
                <div className="logo">
                    <Logo width="100%" height="100%" />
                </div>
                <NavContainer>
                    <ul className="nav-list">
                        <NavItem>
                            <NavLink to="/user/overview">Overview</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/">My Account</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/orders">My Orders</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/wishlist">My Wishlist</NavLink>
                        </NavItem>
                    </ul>
                </NavContainer>
            </UserHeader>
            <UserContent>{children}</UserContent>
        </>
    );
};

UserPageLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserPageLayout;

const UserHeader = styled.header`
    position: fixed;
    z-index: 101;
    inset: 0;
    background-color: #fff;
    width: 100%;
    display: flex;
    height: 4.5rem;
    box-shadow: inset 0 -1px 0 var(--border-color);
    justify-content: space-between;

    .logo {
        height: 100%;
        width: 12rem;
        padding-left: 3.3333333333333335vw;
        @media only screen and (min-width: 64em) {
            padding-left: 3.125vw;
        }
        @media only screen and (min-width: 48em) {
            padding-left: 3.125vw;
        }

        @media only screen and (min-width: 1024px) {
            width: 9.4375rem;
        }
    }
`;
const NavContainer = styled.nav`
    .nav-list {
        height: 100%;
        list-style: none;
        display: flex;
    }
`;

const NavItem = styled.li`
    height: 100%;
    padding: 1rem 1.5rem;
    border-left: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        color: #000;
        .active {
            color: #000;
            box-shadow: inset 0 -4px 0 0 #19110b;
        }
    }
`;

const UserContent = styled.main`
    margin-top: 4.5rem;
`;
