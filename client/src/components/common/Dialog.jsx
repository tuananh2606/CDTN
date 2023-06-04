import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, Button } from '@mui/material';
import EditForm from '../forms/admin/EditForm';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../utils/http';
import adminApi from '../../apis/adminApi';

const initialFormState = { name: '', email: '', admin: '', verified: '' };

const DialogComponent = (props) => {
    const { onClose, open, id } = props;
    const queryClient = useQueryClient();
    const [formState, setFormState] = useState(initialFormState);
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    useQuery({
        queryKey: ['student'],
        queryFn: () => adminApi.getUser(axiosJWT, user?.accessToken, id),
        onSuccess: (data) => {
            setFormState(data);
        },
    });
    const updateUserMutation = useMutation({
        mutationFn: (data) => {
            console.log(data);
            adminApi.updateUser(axiosJWT, user?.accessToken, data);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
    const handleClose = () => {
        onClose(false);
    };

    function _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        const updateUser = {
            name: values.name,
            email: values.email,
            verified: values.verified,
            admin: Boolean(values.admin),
        };
        console.log(updateUser);
        updateUserMutation.mutate({ id, updateUser });
        handleClose();
        actions.setSubmitting(false);
    }

    function _handleSubmit(values, actions) {
        _submitForm(values, actions);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit</DialogTitle>

            <Formik initialValues={formState} enableReinitialize onSubmit={_handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <EditForm />
                        <StyledButton type="submit" disabled={isSubmitting}>
                            Save
                        </StyledButton>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default DialogComponent;
const StyledButton = styled(Button)`
    &&& {
        height: 3rem;
        margin-top: 1.5rem;
        background-color: #000;
        color: white;
        width: 100%;
        padding: 1rem 1.5rem;
    }
`;
