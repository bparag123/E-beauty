import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import {  Typography, Button, Card, CardActionArea, CardMedia, CardContent, CardActions } from '@mui/material'

const TreatmentItem = ({ data }) => {
    const { name, images, charge, duration, _id } = data
    const navigate = useNavigate()
    const viewHandler = () => {
        navigate(`${_id}`)
    }
    

    return (
        <Card variant='elevation' elevation={10} sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={viewHandler}>
                <CardMedia
                    component="img"
                    height="140"
                    image={images[0]}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        It will take around {duration * 60} minutes
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        $ {charge}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" onClick={viewHandler}>View</Button>
            </CardActions>

        </Card>
    );
}

export default TreatmentItem;
