import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Box = ({ title, children, ...props }) => {
  const { t } = useTranslation('profile');
  return (
    <Container>
      <h1>{t(title)}</h1>
      <Content {...props}>{children}</Content>
    </Container>
  );
};

Box.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Box;

const Container = styled.section`
  width: 100%;
  background-color: #fff;
  padding: 1.5rem;
  @media only screen and (min-width: 48em) {
    padding: 2rem;
  }
  h1 {
    margin: 0;
    font-size: 20px;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e1dfd8;
    @media screen and (min-width: 48rem) {
      /* padding: 1.5rem; */
      font-size: 28px;
    }
  }
  .text-center {
    text-align: center;
  }
`;

const Content = styled.div`
  padding-top: 1rem;
  strong,
  span {
    font-size: 18px;
  }
`;
