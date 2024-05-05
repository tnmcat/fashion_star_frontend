import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Container, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Change Password
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={10} md={6}>
                            <TextField
                                fullWidth
                                required
                                id="email"
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <EmailIcon />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <TextField
                                fullWidth
                                required
                                id="oldPassword"
                                name="oldPassword"
                                label="Old Password"
                                type="password"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <LockIcon />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={10} md={6}>
                            <TextField
                                fullWidth
                                required
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                type="password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <LockIcon />
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, bgcolor: "RGB(79 70 229)" }}
                            >
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default ChangePasswordPage;
