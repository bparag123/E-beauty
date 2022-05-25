import React from 'react';
import { Grid, Skeleton } from '@mui/material'

const LoadingSkeleton = ({ className, nXs, nMd, total }) => {

    return (
        <div className={className}>
            <Grid container spacing={3} >
                {Array.from(new Array(total)).map((_, index) => {
                    return <Grid item xs={Math.floor(12 / nXs)} md={Math.floor(12 / nMd)} key={index}>
                        <Skeleton variant="rectangular" animation="wave" height={118} />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                        <Skeleton animation='wave' />
                    </Grid>
                })}
            </Grid>
        </div>
    );
}

export default LoadingSkeleton;
