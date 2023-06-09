import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { TextField, Button, InputLabel, MenuItem, FormControl, Select, Stack, Box } from '@mui/material';
import styled from 'styled-components';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import { useLocation } from 'react-router-dom';
import { convertLength } from '@mui/material/styles/cssUtils';
import { useNavigate } from 'react-router-dom';

const UpdateUserPage = () => {
    const [info, setInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false,
    });

    const { state } = useLocation();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const updateUserMutation = useMutation({
        mutationFn: (data) => adminApis.updateUser(axiosJWT, user?.accessToken, data),
        onSuccess: () => {
            navigate('/admin/users');
        },
    });

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['user', state.id],
        queryFn: () => adminApis.getUser(axiosJWT, user?.accessToken, state.id),
        onSuccess: (data) => {
            setInfo({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                isAdmin: data.admin,
            });
        },
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const _handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                id: state.id,
                data: info,
            };
            updateUserMutation.mutate(updatedUser);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Helmet>
                <title> Edit User </title>
            </Helmet>
            <Box sx={{ padding: 2 }}>
                <Form onSubmit={_handleSubmit}>
                    <StyledBox>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                type="text"
                                name="firstName"
                                label="First Name"
                                value={info.firstName}
                                onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                            />
                            <TextField
                                type="text"
                                name="lastName"
                                label="Last Name"
                                value={info.lastName}
                                onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                            />
                        </Stack>
                        <StyledTextInput type="email" name="email" label="Email" disabled value={info.email} />

                        <FormControl sx={{ mt: 1, maxWidth: 120 }}>
                            <InputLabel id="admin-select">Is Admin?</InputLabel>
                            <Select
                                labelId="admin-select"
                                id="select-autowidth"
                                value={info?.isAdmin}
                                onChange={(e) => setInfo({ ...info, isAdmin: e.target.value })}
                                label="Is Admin?"
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="outlined" color="secondary" type="submit" sx={{ mt: 3 }}>
                            Submit
                        </Button>
                    </StyledBox>
                </Form>
            </Box>
        </>
    );
};

export default UpdateUserPage;

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
`;

const StyledTextInput = styled(TextField)`
    margin: 0.5rem 0;
`;
