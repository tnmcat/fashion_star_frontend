import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
function RegisterForm(props) {
    const navigate = useNavigate();
    const schema = yup.object().shape({
        sellerName: yup.string().required('Please enter full name')
            .matches(/^[a-zA-Z0-9\s]+$/, 'Name must contain only letters and numbers'),
        birthDay: yup.date()
            .required('Please enter birthday')
            .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'You must be at least 18 years old'),
        phone: yup.string()
            .required('Please enter phone')
            .matches(/^\d+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 characters')
            .max(12, 'Phone number must be at most 12 characters'),
        email: yup.string()
            .required('Please enter email')
            .email('Please enter valid email'),
        password: yup.string()
            .required('Please enter password')
            .min(6, 'Password should be at least 6 characters')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/, 'Password must contain at least one letter and one number'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        storeName: yup.string()
            .required('Please enter store name')
            .matches(/^[a-zA-Z0-9\s]+$/, 'Store name must contain only letters and numbers')
            .min(3, 'Store name must be at least 3 characters')
            .max(30, 'Store name must be at most 30 characters'),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = async (value) => {
        console.log('register form', value);
        const { onSubmit } = props;
        //kiem tra component cha co goi onSubmit hay ko
        if (onSubmit) {
            await onSubmit(value)
        }
        //reset();
    }
    const defaultTheme = createTheme();
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField  {...register("sellerName")}
                                        autoComplete="given-name"
                                        name="sellerName"
                                        required
                                        fullWidth
                                        id="sellerName"
                                        label="Seller Name"
                                        autoFocus
                                        error={!!errors.sellerName}
                                        helperText={errors.sellerName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField    {...register("phone")}
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone"
                                        name="phone"
                                        error={!!errors.phone}
                                        helperText={errors.phone?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField   {...register("birthDay")}
                                        required
                                        fullWidth
                                        id="birthDay"
                                        label="Birthday"
                                        name="birthDay"
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={!!errors.birthDay}
                                        helperText={errors.birthDay?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField  {...register("storeName")}
                                        required
                                        fullWidth
                                        id="storeName"
                                        label="Store Name"
                                        name="storeName"
                                        autoComplete="sellerName"
                                        error={!!errors.storeName}
                                        helperText={errors.storeName?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField  {...register("email")}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField     {...register("password")}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        {...register("confirmPassword")}
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link onClick={() => { navigate("/") }} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </>


    );
}

export default RegisterForm;
