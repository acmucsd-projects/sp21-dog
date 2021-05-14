import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
})

export default function LinearDeterminate() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={30} />
        </div>
    )
}
