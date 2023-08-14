import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, Backdrop } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { NavItem } from '../components/common';
import HeaderOnly from './Header/HeaderOnly';
import FooterOnly from './Footer/FooterOnly';

const UserPageLayout = ({ children }) => {
  const [show, setShow] = useState(false);

  console.log(show);

  return (
    <Layout>
      <HeaderOnly>
        <Button
          variant="standard"
          endIcon={show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setShow(!show)}
          className="menu-btn"
        >
          Menu
        </Button>
        <NavContainer>
          <StyledUl show={show} className="nav-list">
            <NavItem setShow={setShow} to="/user/overview" title="overview" />
            <NavItem setShow={setShow} to="/user/profile" title="my_account" />
            <NavItem setShow={setShow} to="/user/orders" title="my_orders" />
            <NavItem osetShow={setShow} to="/user/wishlist" title="my_wishlist" />
          </StyledUl>
        </NavContainer>
      </HeaderOnly>
      {show && <Backdrop sx={{ color: '#fff', zIndex: 99 }} open={show} onClick={() => setShow(false)} />}
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
  height: 100%;
`;

const StyledUl = styled.ul`
  height: 100%;
  list-style: none;
  display: ${(props) => (props.show ? 'block' : 'none')};
  @media screen and (min-width: 64rem) {
    display: flex;
  }
  @media only screen and (max-width: 63.9375em) {
    background-color: #fff;
    height: auto;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1;
  }
`;
