import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import TaskListItem from './TaskListItem'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))

export default function TaskList() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Accordion style={{ display: 'none' }}>
                <AccordionSummary />
                <AccordionDetails />
            </Accordion>
            <TaskListItem />
            <TaskListItem />
            <TaskListItem />
            <Accordion style={{ display: 'none' }}>
                <AccordionSummary />
                <AccordionDetails />
            </Accordion>
        </div>
    )
}
