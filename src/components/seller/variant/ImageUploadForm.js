import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

const ImageUploadForm = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    // Xử lý sự kiện khi người dùng chọn một file
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewUrl('');
        }
    };

    // Xử lý sự kiện khi người dùng nhấn nút "Upload"
    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile); // Gọi hàm callback để xử lý việc tải lên hình ảnh
        } else {
            alert('Please select a file before uploading.');
        }
    };

    return (
        <Grid container spacing={2} alignItems="center">
            {/* Input file */}
            <Grid item xs={8}>
                <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileChange} // Xử lý sự kiện khi người dùng chọn một file
                />
                {/* Label để kích hoạt sự kiện chọn file */}
                <label htmlFor="image-upload">
                    <Button variant="contained" component="span">
                        Choose Image
                    </Button>
                </label>
                {/* Hiển thị hình ảnh đã chọn */}
                {previewUrl && (
                    <img src={previewUrl} alt="Selected Image" style={{ width: '30%', marginTop: 10 }} />
                )}
            </Grid>
            {/* Nút "Upload" */}
            <Grid item xs={4}>
                <Button variant="contained" onClick={handleUpload}>
                    Upload
                </Button>
            </Grid>
        </Grid>
    );
};

export default ImageUploadForm;
