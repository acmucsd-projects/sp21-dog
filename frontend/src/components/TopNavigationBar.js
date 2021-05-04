import React from 'react'
import { Page } from '../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { useAppContext } from '../contexts/AppContext'
import Searchbar from './Searchbar'

const useStyles = makeStyles((theme) => ({
    topNavbar: {
        width: '100%',
        height: '100%',
        padding: '0 1.932367149%',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
        fontSize: 36,
        textTransform: 'capitalize',
        fontFamily: 'Oswald',
    },
    topNavButton: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    imageIcon: {
        display: 'flex',
        height: 'inherit',
        width: 'inherit',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    logoIconRoot: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'auto',
        height: '91.3%',
    },
    profileIconRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 'auto',
        height: '86.62%',
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
        <>
            <AppBar position="static">
                <div className={classes.topNavbar}>
                    <div
                        className={classes.topNavButton}
                        onClick={() => {
                            context.setState({
                                ...context.state,
                                page: Page.tasks,
                            })
                        }}
                    >
                        <Icon classes={{ root: classes.logoIconRoot }}>
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
                        <Icon classes={{ root: classes.profileIconRoot }}>
                            <img
                                className={classes.imageIcon}
                                src="/profilepic.svg"
                            />
                        </Icon>
                    </div>
                </div>
            </AppBar>
            {/*context.state.page == Page.leaderboards && <Searchbar />*/}
        </>
    )
}
