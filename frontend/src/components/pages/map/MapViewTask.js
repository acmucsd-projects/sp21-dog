import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import TaskListItem from '../tasks/TaskListItem'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))

export default function MapViewTask({ task }) {
    const classes = useStyles()

    return (
        <div className="content-wrapper content-wrapper-maxWidth">
            <Accordion style={{ display: 'none' }}>
                <AccordionSummary />
                <AccordionDetails />
            </Accordion>
            <TaskListItem mapView={true} task={task} />
            <Accordion style={{ display: 'none' }}>
                <AccordionSummary />
                <AccordionDetails />
            </Accordion>
        </div>
    )
}
