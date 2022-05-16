import React from 'react';
import { useSelector } from 'react-redux'

const TreatmentList = () => {

    const treatments = useSelector(state => state.treatment)
    console.log(treatments);

    return (
        <div>
            {treatments.map(ele => {
                return <p>{ele.name}</p>
            })}
        </div >
    );
}

export default TreatmentList;
