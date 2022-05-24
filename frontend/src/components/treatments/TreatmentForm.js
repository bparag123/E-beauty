import React, { useState } from 'react';
import { TextField } from "@mui/material"
import { useFormik } from 'formik'
import TreatmentSchema from '../../schema/treatment.schema';
import LoadingButton from '@mui/lab/LoadingButton';
import { createTreatment } from '../../api/treatments';
import { useNavigate } from 'react-router-dom'
import classes from './TreatmentForm.module.css'

const TreatmentForm = () => {
    console.log("Form Rerendered");
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const sendData = async (data) => {
        return await createTreatment(data)
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            duration: '',
            charge: '',
            file: ''
        },
        validationSchema: TreatmentSchema,
        onSubmit: (values) => {
            console.log(values);
            setIsLoading(state => true)
            const result = sendData(values)
            result.then((data) => {
                navigate('/treatments', { replace: true })
            })
            setIsLoading(state => false)
        },
    })

    return (
        <div className={classes['treatment_form_wrapper']}>
            <TextField label="Treatment Name" type="text" variant='standard'
                error={formik.touched.name && formik.errors.name} helperText={formik.errors.name && formik.touched.name && formik.errors.name}
                {...formik.getFieldProps('name')}
            />
            <TextField label="Treatment Charge" variant='standard' type="number"
                error={formik.touched.charge && formik.errors.charge} helperText={formik.errors.charge && formik.touched.charge && formik.errors.charge}
                {...formik.getFieldProps('charge')}
            />
            <TextField label="Treatment Duration" variant='standard' type="number"
                error={formik.touched.duration && formik.errors.duration} helperText={formik.errors.duration && formik.touched.duration && formik.errors.duration}
                {...formik.getFieldProps('duration')}
            />

            <TextField
                variant='standard'
                type="file"
                id='file'
                onClick={(e) => {
                    formik.setFieldTouched('file', true)
                }}
                onChange={(e) => {
                    formik.setFieldValue("file", e.target.files[0]);
                }}
                error={formik.touched.file && formik.errors.file}
                helperText={formik.errors.file && formik.touched.file && formik.errors.file}
            />
            <LoadingButton loading={isLoading} variant="contained" onClick={formik.handleSubmit}>
                Create
            </LoadingButton>
        </div>
    );
}

export default TreatmentForm;
