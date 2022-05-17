import React from 'react';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import classes from './TreatmentItem.module.css'

const TreatmentItem = ({ data }) => {
    const { name, images, charge, duration } = data

    return (
        <div>
            <Card className={classes['treatment-card']}>
                <CardImg top srcSet={images} alt="treatment-img" />
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardSubtitle>Rs. {charge}</CardSubtitle>
                    <CardText>It will take around {duration * 60} minutes</CardText>
                    <Button color='info'>Book</Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default TreatmentItem;
