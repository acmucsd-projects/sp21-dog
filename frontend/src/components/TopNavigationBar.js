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
        fontSize: 36,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    logo: {
        marginRight: '12px',
        '&:hover': {
            cursor: 'pointer',
        },
    },
}))

export default function TopNavigationBar() {
    const classes = useStyles()
    const context = useAppContext()
    const title = context.state.page

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div
                    style={{
                        display: 'flex',
                        margin: '0 24px',
                        alignItems: 'center',
                    }}
                >
                    <DirectionsRunIcon
                        className={classes.logo}
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: Page.tasks,
                            })
                        }}
                    />

                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton
                        edge="end"
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
                </div>
            </AppBar>
        </div>
    )
}
