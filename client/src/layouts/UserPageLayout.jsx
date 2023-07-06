import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import HeaderOnly from './Header/HeaderOnly';
import FooterOnly from './FooterOnly';

const UserPageLayout = ({ children }) => {
    return (
        <Layout>
            <HeaderOnly>
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
            </HeaderOnly>
            <main className="content">{children}</main>
            <FooterOnly />
        </Layout>
    );
};

UserPageLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserPageLayout;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
    .content {
        flex: 1 0 auto;
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
