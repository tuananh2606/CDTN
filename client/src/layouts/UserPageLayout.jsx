import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';

import { NavItem } from '../components/common';
import HeaderOnly from './Header/HeaderOnly';
import FooterOnly from './Footer/FooterOnly';

const UserPageLayout = ({ children }) => {
  return (
    <Layout>
      <HeaderOnly>
        <NavContainer>
          <ul className="nav-list">
            <NavItem to="/user/overview" title="overview" />
            <NavItem to="/user/profile" title="my_account" />
            <NavItem to="/user/orders" title="my_orders" />
            <NavItem to="/user/wishlist" title="my_wishlist" />
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
  height: auto;
  min-height: 100vh;
  .content {
    padding-top: 4.5rem;
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

// const NavItem = styled.li`
//     height: 100%;
//     padding: 1rem 1.5rem;
//     border-left: 1px solid var(--border-color);
//     display: flex;
//     align-items: center;
//     a {
//         text-decoration: none;
//         color: #000;
//     }
//     .active {
//         color: #000;
//         box-shadow: inset 0 -4px 0 0 #19110b;
//     }
// `;
