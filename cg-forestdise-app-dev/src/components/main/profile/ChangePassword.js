import React, {useState} from "react";
import {
    Container,
    Paper,
    Grid,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const validateNewPassword = (password) => {
        const regex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateNewPassword(formData.newPassword)) {
            alert(
                "Mật khẩu mới cần ít nhất 8 ký tự và bao gồm ít nhất một ký tự đặc biệt!"
            );
            return;
        }

        fetch("http://localhost:5454/api/register/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data === "Incorrect old password") {
                    alert("Mật khẩu cũ không chính xác!");
                } else {
                    alert("Mật khẩu đã được thay đổi thành công!");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Container maxWidth="md" sx={{mt: 8}}>
            <Paper elevation={3} sx={{p: 4}}>
                <Typography variant="h4" align="center">
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
                                    startAdornment: <EmailIcon />,
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
                                    startAdornment: <LockIcon />,
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
                                    startAdornment: <LockIcon />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 2, bgcolor: "primary.main"}}
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
