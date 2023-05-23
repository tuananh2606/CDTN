import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
// sections
import { AppWidgetSummary } from '../../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const theme = useTheme();

    return (
        <>
            {/* <Helmet>
                <title> Dashboard | Minimal UI </title>
            </Helmet> */}

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Weekly Sales"
                            total={714000}
                            color={{ tc: '#061B64', bg: '#D1E9FC' }}
                            icon={'ant-design:android-filled'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="New Users"
                            total={1352831}
                            color={{ tc: '#04297A', bg: '#D0F2FF' }}
                            icon={'ant-design:apple-filled'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Item Orders"
                            total={1723315}
                            color={{ tc: '#7A4F01', bg: '#FFF7CD' }}
                            icon={'ant-design:windows-filled'}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary
                            title="Bug Reports"
                            total={234}
                            color={{ tc: '#7A0C2E', bg: '#FFE7D9' }}
                            icon={'ant-design:bug-filled'}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
