import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllTreatments } from '../../store/custom-actions';
import TreatmentItem from './TreatmentItem';
import classes from './TreatmentList.module.css'

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
        <>
            <div className={classes['treatment-list']}>
                {treatments.length === 0 ? "No Treatments Available" :
                    treatments.map((ele, index) => <TreatmentItem data={ele} key={index} />)
                }
            </div >
        </>



    );
}

export default TreatmentList;
