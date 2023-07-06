import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TextField, Button, InputLabel, MenuItem, FormControl, Select, Stack, Box } from '@mui/material';
import styled from 'styled-components';
import { loginSuccess } from '../../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import adminApis from '../../../apis/adminApis';
import { createAxios } from '../../../utils/http';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState();

    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const createUserMutation = useMutation({
        mutationFn: (data) => adminApis.createUser(axiosJWT, user?.accessToken, data),
        onSuccess: (data) => {
            if (data && data.name !== 'AxiosError') {
                navigate('/admin/users');
            } else {
                setError(data);
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const _handleSubmit = async (e) => {
        e.preventDefault();
        let newUser = {
            firstName,
            lastName,
            email,
            password,
            isAdmin,
        };
        try {
            await createUserMutation.mutateAsync(newUser);
        } catch (error) {
            console.log('An error has occured: ', error);
        }
    };
    return (
        <>
            <Helmet>
                <title> Create New User </title>
            </Helmet>
            <h2>Create New User</h2>
            <Form onSubmit={_handleSubmit}>
                <StyledBox>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            type="text"
                            name="firstName"
                            label="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            type="text"
                            name="lastName"
                            label="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Stack>
                    <StyledTextInput
                        type="email"
                        name="email"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        error={error}
                        helperText={error ? error.response.data : ''}
                    />

                    <StyledTextInput
                        type="password"
                        name="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <FormControl sx={{ mt: 1, maxWidth: 100 }}>
                        <InputLabel id="admin-select">Is Admin?</InputLabel>
                        <Select
                            labelId="admin-select"
                            id="select-autowidth"
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.value)}
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
        </>
    );
};

export default CreateUserPage;

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
