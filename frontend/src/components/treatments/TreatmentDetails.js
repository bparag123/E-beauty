import React, { useCallback, useLayoutEffect, useState } from 'react';
// import { Button, Card, CardImg, Form, CardBody, CardSubtitle, CardText, CardTitle, Input, Spinner, FormGroup, Label } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { bookSlot, checkAvailability } from '../../api/bookings';
import * as moment from 'moment'
import { getTreatmentById } from '../../api/treatments';
import { toast } from 'react-toastify';
import classes from './TreatmentDetail.module.css'
import { ButtonBase, Grid, Paper, styled, Typography, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { colors } from '../colors';
console.log(colors);
const TreatmentDetails = () => {
    console.log("Detail Component Rendered");
    const [treatmentData, setTreatmentData] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [slots, setSlots] = useState(null)
    const [selectedTime, setSelectedTime] = useState()
    const [open, setOpen] = useState(false)
    const { id } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedTime) {
            toast.error('Please Select Slot!', {
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
            treatmentId: treatmentData._id,
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
            navigate('/dashboard', { replace: true })
        }
    }


    const handleChange = async (e) => {
        setIsLoading(state => true);
        const result = await checkAvailability({ datetime: e.target.value, duration: treatmentData.duration })
        setSlots(state => result)
        setOpen(state => !state)
        setIsLoading(state => false)
    }
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

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

    const handleClose = () => {
        setOpen(state => !state);
    }

    useLayoutEffect(() => {
        console.log(selectedTime);
        fetchTreatmentData()
    }, [fetchTreatmentData, selectedTime])

    return (
        <div className={classes['detail-wrapper']} >
            {treatmentData ? <div>
                <Paper
                    sx={{
                        p: 5,
                        margin: 'auto',
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                <Img alt={treatmentData.name} src={treatmentData.images[0]} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div" color={colors.main}>
                                        {treatmentData.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom color={colors.muted}>
                                        It will Take {treatmentData.duration * 60} Minutes
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {slots ? isLoading ? <></> : <>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-describedby="dialog-desc"
                                            >
                                                <DialogTitle color={colors.main}>{"Available Slots"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="dialog-desc">
                                                        <FormControl>
                                                            <FormLabel id="radio-group-label">Select a Slot to Book</FormLabel>

                                                            {slots ? isLoading ? "Loading" :
                                                                <RadioGroup aria-labelledby="radio-group-label" defaultValue="female" name="radio-buttons-group">
                                                                    {slots.available.map((ele, index) => {
                                                                        return <FormControlLabel value={index} control={<Radio />} onChange={handleRadioChange} label={`${moment.utc(ele.start).format('hh:mm a')} - ${moment.utc(ele.end).format('hh:mm a')}`} />
                                                                    })}
                                                                </RadioGroup> : "Loading"}
                                                        </FormControl>

                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <LoadingButton loading={isLoading} variant="contained" type='submit' onClick={handleSubmit}>
                                                        Book
                                                    </LoadingButton>
                                                </DialogActions>
                                            </Dialog>

                                        </> : ""}
                                    </Typography>
                                </Grid>
                                <Grid item sx>
                                    <TextField
                                        id="date"
                                        label="Check Availability On"
                                        type="date"
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={handleChange}
                                    />

                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" component="div" color={colors.main}>
                                    $ {treatmentData.charge}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div> : ""
            }
        </div >
    );
}

export default TreatmentDetails;
