import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
        <Layout>
            <Header />
            <main className="content">{children}</main>

            <Footer />
        </Layout>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    .content {
        flex: 1 0 auto;
    }
`;
