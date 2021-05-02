import React from 'react'
import { Page } from '../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { useAppContext } from '../contexts/AppContext'
import Searchbar from './Searchbar'

const useStyles = makeStyles((theme) => ({
    root: {
        //height: '60px',
    },
    title: {
        flexGrow: 1,
        fontSize: 36,
        textTransform: 'capitalize',
    },
    topNavButton: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
    imageIcon: {
        display: 'flex',
        height: 'inherit',
        width: 'inherit',
    },
    iconRoot: {
        textAlign: 'center',
        width: '45px',
        height: '45px',
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
                    <div
                        className={classes.topNavButton}
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: Page.tasks,
                            })
                        }}
                    >
                        <Icon classes={{ root: classes.iconRoot }}>
                            <img
                                className={classes.imageIcon}
                                src="/logo.svg"
                            />
                        </Icon>
                    </div>

                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <div
                        className={classes.topNavButton}
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: Page.profile,
                            })
                        }}
                    >
                        <Icon classes={{ root: classes.iconRoot }}>
                            <img
                                className={classes.imageIcon}
                                src="/profilepic.svg"
                            />
                        </Icon>
                    </div>
                </div>
                {context.state.page == Page.leaderboards && <Searchbar />}
            </AppBar>
        </div>
    )
}
