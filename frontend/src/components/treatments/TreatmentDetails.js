import React, { useState } from 'react';
import { Button, Card, Form, CardBody, CardSubtitle, CardText, CardTitle, Input, Spinner } from 'reactstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { bookSlot, checkAvailability } from '../../api/bookings';
import * as moment from 'moment'

const TreatmentDetails = () => {

    const treatmentData = useSelector(state => state.treatment.treatment)
    const [date, setDate] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [availability, setAvailability] = useState(null)
    const { id } = useParams();
    const { _id, name, duration, charge } = treatmentData.find((ele) => {
        return ele._id === id
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(state => true);
        const availableSlots = await checkAvailability({ datetime: date, duration })
        setAvailability(availableSlots)
        setIsLoading(state => false)
        console.log(availableSlots)
    }

    const handleChange = async (e) => {
        setDate(e.target.value)
        // i need to save the date in this format
        // const x = moment.utc(e.target.value + " 16:00").format()
    }

    return (

        <div>
            <Card outline>
                <CardBody>
                    <CardTitle tag="h5">
                        {name}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6" >
                        It will Take {duration * 60} Minutes
                    </CardSubtitle>
                    <CardText>
                        Rs. {charge} /-
                    </CardText>
                    <Form onSubmit={handleSubmit}>
                        <Input type='date' onChange={handleChange} />
                        <Button type='submit'>
                            Check Availability
                        </Button>
                    </Form>
                    {availability ? isLoading ? <Spinner>Loading...</Spinner> : availability.map((ele) => {
                        return <p>{ele}</p>
                    }) : ""}
                </CardBody>
            </Card>
        </div>
    );
}

export default TreatmentDetails;
