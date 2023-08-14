import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const AdminPageWrapper = ({ title, children, width }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('admin');

  return (
    <>
      <Helmet>
        <title>{t(title)}</title>
      </Helmet>
      <Wrapper>
        <h2>{t(title)}</h2>
        <IconButton aria-label="back" size="small" className="back-btn" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon fontSize="inherit" />
        </IconButton>
        {children}
      </Wrapper>
    </>
  );
};

AdminPageWrapper.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default AdminPageWrapper;

const Wrapper = styled(Box)`
  position: relative;
  width: auto;
  max-width: 800px;
  height: auto;
  padding: 2rem;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: -13px 13px 20px 0px rgba(0, 0, 0, 0.1), 0px 0px 10px -3px rgba(0, 0, 0, 0.1),
    0px 0px 10px -3px rgba(0, 0, 0, 0.1);
  h2 {
    text-align: center;
  }
  .back-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
`;
