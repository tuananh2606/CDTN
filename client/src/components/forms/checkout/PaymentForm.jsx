import * as React from 'react';
import { Tabs, Tab, Typography, Box, FormControlLabel, FormLabel, FormControl, RadioGroup, Radio } from '@mui/material';
import FormLayout from '../FormLayout';
import { InputField, TabPanel, RadioButtonGroup } from '../../common';
// import { Formik, Field } from 'formik';

const PaymentForm = () => {
    const [value, setValue] = React.useState(0);
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <FormLayout>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Credit Card" {...a11yProps(0)} />
                    <Tab label="Thanh toán trực tuyến" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="ttknh">
                    <RadioButtonGroup name="payment" value="ttknh" label="Thanh toán khi nhận hàng" />
                    <RadioButtonGroup name="payment" value="ttqvnp" label="Thanh toán qua VNPAY" />
                </RadioGroup>
            </TabPanel>
        </FormLayout>
    );
};

export default PaymentForm;
