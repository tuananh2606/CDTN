// @mui
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { alpha } from '@mui/material/styles';
import { Card, Typography, Grid } from '@mui/material';
import { ThemeProvider } from 'styled-components';
// utils

import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.object,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color, sx, ...other }) {
  const { t } = useTranslation('admin');
  const theme = {
    tc: color.tc,
    bg: color.bg,
  };
  return (
    <ThemeProvider theme={theme}>
      <StyledCard {...other}>
        <StyledIcon>
          <Iconify icon={icon} width={24} height={24} />
        </StyledIcon>

        <Typography variant="h3">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          {t(title)}
        </Typography>
      </StyledCard>
    </ThemeProvider>
  );
}

const StyledCard = styled(Card)`
  padding: 2.5rem 0;
  box-shadow: 0;
  text-align: center;
  color: ${(props) => `${props.theme.tc} !important}`};
  background-color: ${(props) => `${props.theme.bg} !important}`};
`;
const StyledIcon = styled.div`
  margin: auto;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 24px;
  background-image: linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%);
`;
