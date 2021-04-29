import React from 'react'
import { Page } from '../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import { useAppContext } from '../contexts/AppContext'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
}))

export default function TopNavigationBar() {
    const classes = useStyles()
    const context = useAppContext()
    const title = context.state.page

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: Page.tasks,
                            })
                        }}
                    >
                        <DirectionsRunIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: Page.profile,
                            })
                        }}
                    >
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}
