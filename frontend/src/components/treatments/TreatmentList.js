import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllTreatments } from '../../store/custom-actions';
import TreatmentItem from './TreatmentItem';
import classes from './TreatmentList.module.css'

const TreatmentList = () => {

    const treatments = useSelector(state => state.treatment.treatment)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllTreatments())
    }, [dispatch])

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
