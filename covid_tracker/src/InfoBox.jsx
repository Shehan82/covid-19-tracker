import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox(props) {
    return (
    
            <Card className="infoBox">
                <CardContent>
                <Typography className="infoBox__title" color=" #03396c">
                    {props.title}
                </Typography>

                <h2 className="infoBox__cases">{props.cases} <small>today</small></h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {props.total} total
                </Typography>

                </CardContent>
            </Card>
        
    );
}

export default InfoBox;


