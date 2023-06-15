import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, DialogTitle, Button } from '@mui/material';
import EditForm from '../forms/admin/EditForm';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import axios from 'axios';

import { loginSuccess } from '../../redux/authSlice';
import { createAxios } from '../../utils/http';
import adminApis from '../../apis/adminApis';

const DialogComponent = (props) => {
    const { onClose, open, id, form, slug, userCheck } = props;
    // const initialFormState = userCheck
    //     ? { name: '', email: '', admin: '', verified: '' }
    //     : { slug: '', name: '', videos: { desktop_tablet: [], mobile: [] }, images: [] };
    const initialFormState = { slug: '', name: '', videos: { desktop_tablet: [], mobile: [] }, images: [] };
    const queryClient = useQueryClient();
    const [formState, setFormState] = useState(initialFormState);
    const [slugUpdate, setSlugUpdate] = useState('');
    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [category, setCategory] = useState('bags');

    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    if (userCheck) {
        useQuery({
            queryKey: ['user'],
            queryFn: () => adminApis.getUser(axiosJWT, user?.accessToken, id),
            onSuccess: (data) => {
                setFormState(data);
            },
        });
    }
    if (category) {
        useQuery({
            queryKey: ['category'],
            queryFn: () => adminApis.getCategory(axiosJWT, user?.accessToken, slug),
            onSuccess: (data) => {
                setFormState(data);
            },
        });
    }

    //const uploadImagesMutation = useMutation(adminApis.uploadImagesProduct);

    // const updateUserMutation = useMutation({
    //     mutationFn: (data) => {
    //         console.log(data);
    //         adminApis.updateUser(axiosJWT, user?.accessToken, data);
    //     },
    //     onSuccess: () => {
    //         // Invalidate and refetch
    //         queryClient.invalidateQueries({ queryKey: ['users'] });
    //     },
    // });
    // console.log(formState);
    const handleClose = () => {
        onClose(false);
    };

    function _sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        console.log(values);
        // await _sleep(1000);
        // const updateUser = {
        //     name: values.name,
        //     email: values.email,
        //     verified: values.verified,
        //     admin: Boolean(values.admin),
        // };
        // console.log(updateUser);
        // updateUserMutation.mutate({ id, updateUser });
        // handleClose();
        // actions.setSubmitting(false);
    }

    // function _handleSubmit(values, actions) {
    //     _submitForm(values, actions);
    // }

    console.log(images, videos);
    function _handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('category', category);
        Array.from(images).forEach((item) => {
            formData.append('images', item);
        });
        Array.from(videos).forEach((item) => {
            formData.append('videos', item);
        });
        console.log(formData.getAll('images'));
        console.log(formData.getAll('videos'));
        axios
            .post('http://localhost:3001/upload-images', formData)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit</DialogTitle>

            <form onSubmit={_handleSubmit} encType="multipart/form-data">
                <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} />
                {/* <input type="text" onChange={(e) => setName(e.target.value)} value={'Test'} name="name" /> */}
                <input type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
                <input
                    type="file"
                    multiple
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={(e) => setVideos(e.target.files)}
                />

                <button type="submit">Submit</button>
            </form>

            {/* <Formik
                initialValues={formState}
                enableReinitialize
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <input type="text" onChange={props.handleChange} value={props.values.slug} name="slug" />
                        <input type="text" onChange={props.handleChange} value={props.values.name} name="name" />
                        <input
                            type="file"
                            multiple
                            name="images"
                            label="Images"
                            accept="image/*"
                            onChange={props.handleChange}
                        />
                        <input
                            type="file"
                            multiple
                            name="videos"
                            label="Videos"
                            accept="video/mp4,video/x-m4v,video/*"
                            onChange={props.handleChange}
                        />
                        {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <button type="submit">Submit</button>
                    </form>
                )}
                {form}
                <EditForm />
                <StyledButton type="submit" disabled={props.isSubmitting}>
                    Save
                </StyledButton>
            </Formik> */}
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
