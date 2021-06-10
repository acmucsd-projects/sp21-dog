import React from 'react'
import { Page } from '../../helpers/Page'
import { Color } from '../../helpers/Color'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { useAppContext } from '../../contexts/AppContext'
import Searchbar from './Searchbar'
import ProfileCard from '../cards/ProfileCard'
import { usePageContext } from '../../contexts/PageContext'

const useStyles = makeStyles((theme) => ({
    topNavbar: {
        width: '100%',
        height: '100%',
        padding: '0 1.932367149%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    break: {
        flexBasis: '100%',
        height: 0,
    },
    landing: {
        marginLeft: '5px',
        fontSize: 36,
        textTransform: 'capitalize',
        fontFamily: 'Oswald',
    },
    landingBlue: {
        marginLeft: '5px',
        fontSize: 36,
        width: 'auto',
        textTransform: 'capitalize',
        fontFamily: 'Oswald',
        color: Color.coreTheme,
    },
    title: {
        flexGrow: 1,
        fontSize: 36,
        textTransform: 'capitalize',
        fontFamily: 'Oswald',
        textAlign: 'center',
    },
    topNavButton: {
        height: '50px',
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
}))

export default function TopNavigationBar() {
    const classes = useStyles()
    const context = useAppContext()
    const pageContext = usePageContext()
    const title = pageContext.state.page

    return (
        <>
            <AppBar
                position="static"
                style={{
                    height: 'auto',
                    minHeight: '8.152173913%',
                    position: 'sticky',
                    top: 0,
                }}
            >
                {pageContext.state.page == Page.landing && (
                    <div>
                        <div className={classes.topNavbar}>
                            <div
                                className={classes.topNavButton}
                                onClick={() => {
                                    pageContext.setState({
                                        ...pageContext.state,
                                        page: Page.landing,
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

                            <Typography
                                variant="h6"
                                className={classes.landing}
                            >
                                Taskathon
                            </Typography>
                            <Typography
                                variant="h6"
                                className={classes.landingBlue}
                            >
                                Go!
                            </Typography>
                        </div>
                    </div>
                )}
                {pageContext.state.page != Page.landing && (
                    <div className={classes.topNavbar}>
                        <div
                            className={classes.topNavButton}
                            onClick={() => {
                                pageContext.setState({
                                    ...pageContext.state,
                                    page: Page.home,
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
                                pageContext.setState({
                                    ...pageContext.state,
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
                )}
                <Searchbar />
                {pageContext.state.page == Page.profile && (
                    <ProfileCard data={context.state} />
                )}
            </AppBar>
        </>
    )
}
