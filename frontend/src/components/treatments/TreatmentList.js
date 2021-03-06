import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getAllTreatments } from '../../store/custom-actions';
import TreatmentItem from './TreatmentItem';
import classes from './TreatmentList.module.css';

const TreatmentList = () => {

    const treatments = useSelector(state => state.treatment.treatment)
    const authSlice = useSelector(state => state.user)
    const { isLoggedIn } = authSlice
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true })
        } else {
            dispatch(getAllTreatments())
        }
    }, [dispatch, navigate, isLoggedIn])

    return (
        <div className={classes['treatment-wrapper']}>
            <Grid container spacing={1}>
                {treatments.length === 0 ? "No Treatments Available" :
                    treatments.map((ele, index) => <Grid item xs={6} md={4} key={index}>
                        <TreatmentItem data={ele} />
                    </Grid>)
                }
            </Grid>
        </div>
    );
}

export default TreatmentList;
