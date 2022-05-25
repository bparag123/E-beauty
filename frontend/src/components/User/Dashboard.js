import React, { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookingOfUser } from '../../api/bookings'
import { useSelector } from 'react-redux'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import * as moment from 'moment'
import LoadingSkeleton from '../UI/LoadingSkeleton'
import classes from './Dashboard.module.css'
import { colors } from '../colors';

const Dashboard = () => {
    const authSlice = useSelector(state => state.user)
    const [isLoading, setIsLoading] = useState(false)
    const [bookings, setBookings] = useState([])
    const { isLoggedIn } = authSlice
    const navigate = useNavigate()

    const fetchData = async () => {
        return await getBookingOfUser()
    }

    useLayoutEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true })
        } else {
            setIsLoading(state => true)
            fetchData().then(data => {
                console.log("Data of User Bookings", data);
                setBookings(state => data)
                setIsLoading(state => false)
            })
        }
    }, [navigate, isLoggedIn])

    return (

        <div>
            {isLoading ? <LoadingSkeleton className={classes['skeleton']} nXs={2} nMd={4} total={8} /> : ''}
            <div className={classes['booking_wrapper']}>
                <Grid container spacing={2}>
                    {bookings.map((ele, index) => {
                        let treatment = ele.treatmentId
                        return <Grid item md={4} xs={6}>

                            <Card variant="elevation" elevation={5} key={index}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={treatment.images[0]}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" color={colors.main}>
                                            {treatment.name}
                                        </Typography>
                                        <Typography variant="body2" color={colors.muted}>
                                            Appointment On <Typography component="span" sx={
                                                {
                                                    color: colors.main,
                                                    fontWeight: 400
                                                }
                                            }>{moment.utc(ele.datetime).format('MMMM Do YYYY')}</Typography>
                                        </Typography>
                                        <Typography variant="body2" color={colors.muted}>
                                            {`${moment.utc(ele.datetime).format('hh:mm a')} to ${moment.utc(ele.datetime).add(ele.duration, 'h').format('hh:mm a')}`}
                                        </Typography>

                                    </CardContent>
                                </CardActionArea>

                            </Card>
                        </Grid>
                    })}

                </Grid>
            </div>
        </div>
    );
}

export default Dashboard;
