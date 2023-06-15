import styled from 'styled-components';
import { useState } from 'react';

import { InputField, InputFileField } from '../../common';
import FormLayout from '../FormLayout';

const EditFormCategories = () => {
    const [images, setImages] = useState();
    const [info, setInfo] = useState({});
    const handleChange = (e) => {
        setImages(e.target.files);
    };
    //URL.createObjectURL(file) tao url anh
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     const data = new FormData();
    //     data.append('file', file);
    //     data.append('upload_preset', 'upload');
    //     try {
    //     } catch (err) {}
    // };
    console.log(images);
    return (
        <FormLayout>
            <InputField name="slug" label="Slug" type="text" height={54} required />
            <InputField name="name" label="Name" type="text" height={54} required />
            <InputFileField name="videos" label="Videos" accept="image/*" />
            <InputFileField name="images" label="Images" accept="video/mp4,video/x-m4v,video/*" />
            {/* <InputField name="status" label="Status" type="text" height={54} required /> */}
            {/* {formik.errors.email && <p className="errorMsg"> {formik.errors.email} </p>} */}
        </FormLayout>
    );
};

export default EditFormCategories;
