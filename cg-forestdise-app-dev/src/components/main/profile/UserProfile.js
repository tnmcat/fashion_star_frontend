import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Card,
    CardContent,
    Typography,
    Link,
    Avatar,
    Modal,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { getUserInfo } from "../../../features/user/userSlice";

const UserProfileEditForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.userId);
    const userInfo = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        clientName: "",
        birthday: "",
        phoneNumber: "",
        gender: "",
    });

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // Lấy thông tin người dùng từ Redux store và cập nhật vào state formData
        setFormData({
            clientName: userInfo.clientName,
            birthday: userInfo.birthday,
            phoneNumber: userInfo.phone,
            gender: userInfo.gender,
        });
    }, [userInfo]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            // Kiểm tra tính hợp lệ của birthday
            const today = new Date();
            const birthdayDate = new Date(formData.birthday);
            const age = today.getFullYear() - birthdayDate.getFullYear();
            const isUnder18 = age < 18;

            // Kiểm tra tính hợp lệ của phone
            const isPhoneValid = /^\d{10}$/.test(formData.phoneNumber);

            if (isUnder18) {
                alert("You must be at least 18 years old.");
                return;
            }

            if (!isPhoneValid) {
                alert(
                    "Phone number must be 10 digits and contain only numbers."
                );
                return;
            }

            // Gửi yêu cầu chỉnh sửa thông tin người dùng đến API
            const response = await fetch(
                `http://localhost:5454/api/users/${userId}/edit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add authorization token if needed
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                // Nếu yêu cầu thành công, hiển thị thông báo thành công
                setModalOpen(true);
            } else {
                // Nếu có lỗi từ API, xử lý lỗi
                const errorData = await response.json();
                alert(errorData.message); // Hiển thị thông báo lỗi từ API
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="py-10 px-15">
            <Grid container spacing={4}>
                <Grid item xs={12} lg={7}>
                    <Box className="border rounded-s-md shadow-md p-5 rounded-md border-zinc-400">
                        <Grid container spacing={3} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="name"
                                    name="clientName"
                                    label="Name"
                                    fullWidth
                                    autoComplete="given-name"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="birthday"
                                    name="birthday"
                                    label="Birthday"
                                    type="date"
                                    fullWidth
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    fullWidth
                                    autoComplete="phone-number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: <PhoneIcon />,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            value="male"
                                            name="gender"
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Male"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            value="female"
                                            name="gender"
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Female"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    onClick={handleSubmit}
                                    sx={{
                                        py: 1.5,
                                        mt: 2,
                                        bgcolor: "RGB(79 70 229)",
                                    }}
                                    size="large"
                                    variant="contained"
                                >
                                    Update Profile
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={6} lg={4}>
                    <Card>
                        <CardContent
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
                                <AccountCircleIcon />
                            </Avatar>
                            <Typography variant="h6" gutterBottom>
                                {formData.clientName}
                                {/* Hiển thị tên người dùng từ Redux store */}
                            </Typography>
                            <Typography gutterBottom>
                                <PhoneIcon /> {formData.phoneNumber}
                                {/* Hiển thị số điện thoại từ Redux store */}
                            </Typography>
                            {/* Hiển thị email từ Redux store */}
                            <Typography gutterBottom>
                                <EmailIcon /> {userInfo.email}
                            </Typography>
                            <Link
                                href="/change-password"
                                color="primary"
                                underline="hover"
                            >
                                <LockIcon /> Change Password
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Modal thông báo cập nhật thành công */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Update Successful
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Your profile has been updated successfully.
                    </Typography>
                    <Button onClick={handleCloseModal} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default UserProfileEditForm;
