import StoreIcon from '@mui/icons-material/Store';
import { Avatar, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
CompleteForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,

};
function CompleteForm({ onSubmit }) {
    const [isChecked, setIsChecked] = useState(false); // Trạng thái của checkbox

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked); // Cập nhật trạng thái của checkbox khi thay đổi
    };
    const handleClick = () => {
        onSubmit();
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid container justifyContent="center" spacing={2} sx={{ margin: '50px 0' }}>
                <form>
                    <Grid item xs={12} sx={{ margin: '10px 0', textAlign: 'center' }}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Avatar sx={{ width: 100, height: 100, backgroundColor: 'primary.main' }}>
                                    <StoreIcon sx={{ width: 60, height: 60 }} />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ margin: '50px 0', textAlign: 'center' }}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />} // Sử dụng trạng thái và hàm xử lý thay đổi của checkbox
                                        label={
                                            <>
                                                I hereby agree and confirm that all my personal information and <br />
                                                data ('personal data') stated above are accurate
                                            </>
                                        }
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ margin: '10px 0', textAlign: 'center' }}>
                        <Button onClick={handleClick} variant="contained" size="large" disabled={!isChecked}> {/* Sử dụng trạng thái của checkbox để kích hoạt hoặc vô hiệu hóa nút button */}
                            Create Store
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Box>
    );
}

export default CompleteForm;
