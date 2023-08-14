import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
// @mui
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { createAxios } from '../../utils/http';
import { loginSuccess } from '../../redux/authSlice';
// sections
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import { adminApis } from '../../apis';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { state } = useLocation();
  const { t } = useTranslation('admin');
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => adminApis.getAllProducts(axiosJWT, user?.accessToken, 0, 0),
  });
  const ordersQuery = useQuery({
    queryKey: ['orders'],
    queryFn: () => adminApis.getAllOrders(axiosJWT, user?.accessToken, 0, 0),
  });
  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => adminApis.getAllCategories(axiosJWT, user?.accessToken),
    keepPreviousData: true,
  });

  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => adminApis.getAllUsers(axiosJWT, user?.accessToken),
  });

  useEffect(() => {
    if (state) {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0';
    }
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {t('welcome_back')}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="categories"
              total={categoryQuery.data?.count}
              color={{ tc: '#061B64', bg: '#D1E9FC' }}
              icon={'ant-design:inbox-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="users"
              total={userQuery.data?.count}
              color={{ tc: '#04297A', bg: '#D0F2FF' }}
              icon={'ant-design:user-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="orders"
              total={ordersQuery.data?.count}
              color={{ tc: '#7A4F01', bg: '#FFF7CD' }}
              icon={'ant-design:shopping-cart-outlined'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="products"
              total={data.count}
              color={{ tc: '#7A0C2E', bg: '#FFE7D9' }}
              icon={'ant-design:appstore-filled'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
