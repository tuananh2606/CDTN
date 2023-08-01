import styled from 'styled-components';
import PropTypes from 'prop-types';

import HeaderOnly from './Header/HeaderOnly';
import FooterOnly from './Footer/FooterOnly';

const SecondLayout = ({ children }) => {
  return (
    <Layout>
      <HeaderOnly />
      <main className="content">{children}</main>
      <FooterOnly />
    </Layout>
  );
};

export default SecondLayout;

SecondLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  .content {
    margin-top: 4.5rem;
    flex: 1 0 auto;
  }
`;
