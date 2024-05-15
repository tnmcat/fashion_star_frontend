import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RegisterForm from './RegisterForm';
import StoreForm from './StoreRegisterForm';
import { Paper } from '@mui/material';
import StoreRegisterForm from './StoreRegisterForm';
import TaxRegisterForm from './TaxRegisterForm';
import IdentityForm from './IdentityForm';
import CompleteForm from './CompleteForm';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { createNewStore } from '../../../features/seller_feature/store/sellerStoreSlice';
import { useNavigate } from 'react-router-dom';

const steps = ['Store Information', 'Tax Information', 'Identify Information', 'Complete'];

export default function StoreRegisterPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };


    const [formValues, setFormValues] = useState({
        store: {},
        tax: {},
        identity: {},

    });

    const handleSubmitStoreForm = (value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            store: value
        }));
    };

    const handleSubmitTaxForm = (value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            tax: value
        }));
    };

    const handleSubmitIdentityForm = (value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            identity: value
        }));
    };
    const dispatch = useDispatch();
    const seller = useSelector((state) => state.seller.sellerInfo);
    const navigate = useNavigate();
    const handleSubmitCompleteForm = async () => {
        const completeFormData = {
            name: formValues.store.name,
            logo: formValues.store.logo,
            description: formValues.store.description,
            pickup_city: formValues.store.pickup_city,
            pickup_district: formValues.store.pickup_district,
            pickup_ward: formValues.store.pickup_ward,
            pickup_street: formValues.store.pickup_street,

            type: formValues.tax.type,
            tax_num: formValues.tax.tax_num,
            certificate_image: formValues.tax.certificate_image,
            tax_city: formValues.tax.tax_city,
            tax_district: formValues.tax.tax_district,
            tax_ward: formValues.tax.tax_ward,
            tax_street: formValues.tax.tax_street,

            identity_type: formValues.identity.identity_type,
            identity_num: formValues.identity.identity_num,
            identity_image_1: formValues.identity.identity_image_1,
            identity_image_2: formValues.identity.identity_image_2,
        };
        console.log(completeFormData)
        try {
            const store_result = await dispatch(createNewStore({ sellerId: seller.id, storeData: completeFormData }));
            const store = unwrapResult(store_result);

            console.log(store);
            setTimeout(() => {
                if (store.status) {
                    navigate("/waiting-store-confirm");
                }
                navigate("/selling");
            }, 0);
        } catch (error) {
            console.log('fail to login', error);

        }
    };


    useEffect(() => {
        console.log(formValues);
    }, [formValues]);

    return (

        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
            <Paper elevation={3} sx={{ width: '100%', maxWidth: '1200px', m: 1, p: 2 }}>

                <Box sx={{ width: '100%' }}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {/* Render form based on active step */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {activeStep === 0 && <StoreRegisterForm defaultValues={formValues} onSubmit={handleSubmitStoreForm} />}
                                    {activeStep === 1 && <TaxRegisterForm defaultValues={formValues} onSubmit={handleSubmitTaxForm} />}
                                    {activeStep === 2 && <IdentityForm defaultValues={formValues} onSubmit={handleSubmitIdentityForm} />}
                                    {activeStep === 3 && <CompleteForm defaultValues={formValues} onSubmit={handleSubmitCompleteForm} />}
                                </Box>


                                {/* Add more conditions for additional steps */}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                                        Next
                                    </Button>
                                    {/* {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Step {activeStep + 1} already completed
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1
                                                    ? 'Finish'
                                                    : 'Complete Step'}
                                            </Button>
                                        ))} */}
                                </Box>
                            </React.Fragment>
                        )}
                    </div>
                </Box>

            </Paper>
        </Box>

    );
}
