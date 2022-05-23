import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Button, Card, CardImg, Form, CardBody, CardSubtitle, CardText, CardTitle, Input, Spinner, FormGroup, Label } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { bookSlot, checkAvailability } from '../../api/bookings';
import * as moment from 'moment'
import { getTreatmentById } from '../../api/treatments';
import { toast } from 'react-toastify';
import classes from './TreatmentDetail.module.css'

const TreatmentDetails = () => {
    console.log("Detail Component Rendered");
    const [treatmentData, setTreatmentData] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [slots, setSlots] = useState(null)
    const [selectedTime, setSelectedTime] = useState()
    const { id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedTime) {
            toast.error('Please Select Date!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }
        setIsLoading(state => true)
        const result = await bookSlot({
            datetime: selectedTime,
            teatmentId: treatmentData._id,
            duration: treatmentData.duration
        })
        setIsLoading(state => false)
        if (result) {
            toast.success('Your Treatment is Booked!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/treatments', { replace: true })
        }
    }


    const handleChange = async (e) => {
        setIsLoading(state => true);
        const result = await checkAvailability({ datetime: e.target.value, duration: treatmentData.duration })
        setSlots(state => result)
        setIsLoading(state => false)
    }

    const handleRadioChange = (e) => {
        console.log(e.target.value);
        console.log(slots.available[e.target.value]);
        setSelectedTime(state => slots.available[e.target.value].start)
    }

    const fetchTreatmentData = useCallback(async () => {
        const response = await getTreatmentById(id)
        setTreatmentData(state => response[0])
        console.log("Single Treatment", response[0]);
    }, [id])

    useLayoutEffect(() => {
        fetchTreatmentData()
    }, [fetchTreatmentData])

    return (
        <div>
            {treatmentData ? <Card outline>
                <CardBody>
                    <CardTitle tag="h5">
                        {treatmentData.name}
                    </CardTitle>
                    <CardImg src={treatmentData.images[0]} alt={treatmentData.name} className={classes['image']}></CardImg>
                    <CardSubtitle className="mb-2 text-muted" tag="h6" >
                        <h6>It will Take {treatmentData.duration * 60} Minutes</h6>
                    </CardSubtitle>
                    <CardText>
                        Rs. {treatmentData.charge} /-
                    </CardText>

                    {slots ? isLoading ? <Spinner>Loading...</Spinner> : <FormGroup tag="fieldset">
                        <legend>
                            Available Slots
                        </legend>
                        {slots ? isLoading ? <Spinner>Loading...</Spinner> : slots.available.map((ele, index) => {
                            return <FormGroup check key={index}>
                                <Input name="radio1" type="radio" value={index} onChange={handleRadioChange} />
                                {' '}
                                <Label check>
                                    {moment.utc(ele.start).format('hh:mm a')} - {moment.utc(ele.end).format('hh:mm a')}
                                </Label>
                            </FormGroup>


                        }) : ""}
                    </FormGroup> : ""}

                    <Form onSubmit={handleSubmit}>
                        <Input type='date' onChange={handleChange} className={classes['date_input']} />
                        <Button type='submit'>
                            Book Slot
                        </Button>
                    </Form>
                </CardBody>
            </Card> : <Spinner>
                Loading...</Spinner>}
        </div>
    );
}

export default TreatmentDetails;
