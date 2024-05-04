import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import { default as React } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, TextField } from "@mui/material";
OptionValueForm.propTypes = {
    option: PropTypes.object,
    onSubmit: PropTypes.func,
};

function OptionValueForm(props) {
    const { option } = props;
    console.log("option name is", option)
    const schema = yup.object().shape({
        value: yup.string().required('Please enter option value'),
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
            <br />
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center" >
                    <Grid item>
                        <TextField {...register("value")} id="standard-basic" label="Value" variant="standard" />
                        <p>{errors.value?.message}</p>
                    </Grid>
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

export default OptionValueForm;