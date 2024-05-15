import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from '@mui/material';
import { firebaseStorage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from "uuid";
StoreForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object // Make initialData optional
};

function StoreForm({ onSubmit, initialData = {} }) { // Provide a default value for initialData
    const schema = yup.object().shape({
        name: yup.string()
            .required('Please enter store name')
            .matches(/^[a-zA-Z0-9\s]+$/, 'Store name must contain only letters and numbers')
            .min(3, 'Store name must be at least 3 characters')
            .max(30, 'Store name must be at most 30 characters'),
        description: yup.string().required('Please enter the store description'),
        file: yup.mixed().required('Please upload an image'),
        // Add more validation rules as needed
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData
    });

    const [firebaseFile, setFirebaseFile] = useState('');
    const [progressPercent, setProgressPercent] = useState(0);
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(firebaseStorage, `files/${file.name} + ${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setFirebaseFile(downloadURL);
                    });
                }
            );
        }
    }
    useEffect(() => {
        if (initialData) {
            for (const key in initialData) {
                setValue(key, initialData[key]);
            }
        }
    }, [initialData, setValue]);

    const onSubmitHandler = (data) => {
        console.log(data);

        const formDataWithFile = { ...data, logo: firebaseFile };
        onSubmit(formDataWithFile);
    };

    return (
        <>
            <h1>Edit store</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <br />
                <TextField required
                    id="filled-required"
                    helperText="Store name must be not changed in 60 day next"
                    defaultValue="Hello World"
                    variant="filled"
                    fullWidth {...register("name")} label="Store Name" />
                <p>{errors.name?.message}</p>
                <br />
                <TextField
                    id="filled-multiline-static"
                    label="Store Description"
                    multiline
                    rows={3}
                    defaultValue=" "
                    variant="filled"
                    placeholder="Input your description to introduce your store"
                    fullWidth {...register("description")} />
                <p>{errors.description?.message}</p>

                <div className='text-titleFont mt-5'>
                    <label htmlFor="file" className='mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-5'>Store Logo</label>
                    <br></br>
                    <input  {...register("file")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " type="file" name="file" {...register("file")} onChange={handleFile} />
                    <small className='text-red-700 text-titleFont'>
                        {errors?.file && errors.file.message}
                    </small>
                    {firebaseFile && <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden' }}>
                            <img alt='product_image' src={firebaseFile} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                        </div>
                    </div>}
                    {!firebaseFile && <div className='outerbar'><div className='innerbar text-titleFont'>{progressPercent}%</div></div>}
                </div>
                <Button type="submit" variant="contained" size="small">
                    Save
                </Button>
            </form>
        </>
    );
}

export default StoreForm;
