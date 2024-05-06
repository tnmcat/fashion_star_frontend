import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, TextField, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import AddIcon from '@mui/icons-material/Add';
OptionForm.propTypes = {
    onSubmit: PropTypes.func,
};

function OptionForm(props) {
    const schema = yup.object().shape({
        optionName: yup.string().required('Please enter option name'),
        // Add more validation rules as needed
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (value) => {
        console.log('form submitted', value);
        const { onSubmit } = props;
        if (onSubmit) {
            onSubmit(value);
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    <Grid item>
                        <TextField fullWidth {...register("optionName")} id="standard-basic" label="Option name" variant="standard" />
                        <p>{errors.optionName?.message}</p>
                        <br /></Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" size="small">
                            <AddIcon />
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </>
    );
}

export default OptionForm;
