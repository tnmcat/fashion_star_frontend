import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
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
import {getUserInfo} from "../../../features/user/userSlice";

const UserProfileEditForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.userInfo); // Lấy userId từ Redux store
    console.log(user);
    const [formData, setFormData] = useState({
        userId: user.id,
        clientName: "",
        birthday: "",
        phoneNumber: "",
        gender: "",
    });

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5454/api/users/${user.userInfo}`
                );

                if (response.ok) {
                    const data = await response.json();
                    // Lưu thông tin người dùng vào state formData
                    setFormData({
                        clientName: data.clientName,
                        birthday: data.birthday,
                        phoneNumber: data.phone,
                        gender: data.gender,
                    });
                } else {
                    // Xử lý khi không thể lấy thông tin người dùng
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserInfo();
    }, [user]);
    console.log("user info11111", user);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
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

            const response = await fetch(
                `http://localhost:5454/api/users/${user.userId}/edit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add authorization token if needed
                    },
                    body: JSON.stringify(formData),
                }
            );
            console.log("user edit", response);
            if (response.ok) {
                const data = await response.json();
                // Mở modal thông báo cập nhật thành công
                setModalOpen(true);
            } else {
                // Xử lý lỗi khi gửi yêu cầu
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
                            <Avatar sx={{width: 100, height: 100, mb: 2}}>
                                <AccountCircleIcon />
                            </Avatar>
                            <Typography variant="h6" gutterBottom>
                                {formData.clientName}{" "}
                                {/* Hiển thị tên người dùng */}
                            </Typography>
                            <Typography gutterBottom>
                                <PhoneIcon /> {formData.phoneNumber}{" "}
                                {/* Hiển thị số điện thoại */}
                            </Typography>
                            <Typography gutterBottom>
                                <EmailIcon /> {formData.email}{" "}
                                {/* Hiển thị email */}
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
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        Your profile has been updated successfully.
                    </Typography>
                    <Button onClick={handleCloseModal} sx={{mt: 2}}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default UserProfileEditForm;
