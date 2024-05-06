import React from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
//  watching #2 1:45:30
const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="py-10 px-15">
            <div>
                <Grid container spacing={4}>
                    <Grid item xs={12} lg={7}>
                        <Box className="border rounded-s-md shadow-md p-5 rounded-md border-zinc-400">
                            <form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstName"
                                            name="firstName"
                                            label="First Name"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastName"
                                            name="lastName"
                                            label="Last Name"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="streetAddress"
                                            name="streetAddress"
                                            label="Address"
                                            fullWidth
                                            autoComplete="given-name"
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            label="City"
                                            fullWidth
                                            autoComplete="city"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="state"
                                            name="state"
                                            label="State/Province/Region"
                                            fullWidth
                                            autoComplete="given-name"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="zip"
                                            name="zip"
                                            label="Zip / Postal code"
                                            fullWidth
                                            autoComplete="shipping postal"
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            sx={{
                                                py: 1.5,
                                                mt: 2,
                                                bgcolor: "RGB(79 70 229)",
                                            }}
                                            size="large"
                                            variant="contained"
                                            type="submit"
                                        >
                                            Update Profile
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default UserProfile;
