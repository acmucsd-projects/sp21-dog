import React from 'react'
import { useAppContext } from '../../contexts/AppContext'
import CustomButton from '../buttons/CustomButton'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import { Page } from '../../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LeaderboardBottom from './LeaderboardBottom'
import Icon from '@material-ui/core/Icon'
import { Color } from '../../helpers/Color'
import CustomDialog from '../modals/CustomDialog'
import { useTempContext } from '../../contexts/TempContext'
import { objToFormData } from '../../helpers/Utils'
import { useAuthContext } from '../../contexts/AuthContext'

const useStyles = makeStyles({
    bottomNavbar: {
        display: 'flex',
        backgroundColor: Color.primary,
        flexDirection: 'column',
        // height: '8.152173913%',
        justifyContent: 'center',
        boxShadow:
            '0px -2px 4px -1px rgb(0 0 0 / 20%),' +
            '0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)',
    },
    root: {
        width: '100%',
        maxWidth: '1000px',
        minWidth: '100px',
        justifyContent: 'space-evenly',
    },
    imageIcon: {
        height: 'inherit',
        width: 'inherit',
    },
    iconRoot: {
        textAlign: 'center',
        width: 'auto',
        height: '100%',
    },
    bottomDesc: {
        margin: 'auto',
        fontSize: '24px',
        width: '500px',
        fontFamily: 'Oswald',
        textAlign: 'center',
    },
    arrow: {
        margin: 'auto',
    },
    middleActionItemStyles: {
        minWidth: '20.77294686%',
        borderRadius: '25px',
        backgroundColor: Color.background,
        '&$selected': {
            backgroundColor: Color.accent,
        },
        '& span': {
            width: 'auto',
            height: '100%',
            '& div': {
                width: 'auto',
                height: '96.8%',
            },
        },
    },
    selected: {},
})

export default function BottomNavigationBar() {
    const classes = useStyles()
    const context = useAppContext()
    const auth = useAuthContext()
    const tempContext = useTempContext()
    const [value, setValue] = React.useState()
    const [loginOpen, setLoginOpen] = React.useState(false)
    const [signupOpen, setSignupOpen] = React.useState(false)

    const customSetLoginSignupOpen = (open) => {
        setLoginOpen(!loginOpen)
        setSignupOpen(!signupOpen)
    }

    const registerRequestParams = {
        url: 'https://taskathon-go.herokuapp.com/api/users/register',
        params: {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + auth.state.token,
            }),
            body: objToFormData({
                username: tempContext.state.email.split('@')[0],
                email: tempContext.state.email,
                password: tempContext.state.password,
            }),
        },
    }

    const loginRequestParams = {
        url: 'https://taskathon-go.herokuapp.com/api/users/login',
        params: {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + auth.state.token,
            }),
            body: objToFormData({
                username: tempContext.state.username,
                password: tempContext.state.password,
            }),
        },
    }

    const saveRequestToken = (data) => {
        auth.setState({ ...auth.state, token: data.jwt })
    }

    const signupValidate = () => {
        if (tempContext.state.password === tempContext.state.confirmPassword) {
            return true
        }
        return false
    }

    const orderedNavItems = [
        { page: Page.profile, iconSrc: '/icons/user.svg' },
        { page: Page.leaderboards, iconSrc: '/icons/trophy.svg' },
        { page: Page.home, iconSrc: '/icons/home.svg' },
        { page: Page.tasks, iconSrc: '/icons/tasks.svg' },
        { page: Page.journal, iconSrc: '/icons/journal.svg' },
    ]

    const bottomNavItems = orderedNavItems.map((item, i) => {
        let itemClasses = {
            selected: classes.selected,
        }
        if (
            orderedNavItems.length % 2 !== 0 &&
            i === parseInt(orderedNavItems.length / 2)
        ) {
            itemClasses = {
                root: classes.middleActionItemStyles,
                selected: classes.selected,
            }
        }

        return (
            <BottomNavigationAction
                key={i}
                disableRipple={false}
                classes={itemClasses}
                icon={
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Icon classes={{ root: classes.iconRoot }}>
                            <img
                                className={classes.imageIcon}
                                src={item.iconSrc}
                            />
                        </Icon>
                    </div>
                }
                onClick={() => {
                    context.setState({
                        ...context.state,
                        page: item.page,
                        mapOpen: false,
                    })
                }}
            />
        )
    })

    React.useEffect(() => {
        setValue(
            orderedNavItems.map((item) => item.page).indexOf(context.state.page)
        )
    }, [context.state.page, auth.state.token])

    return (
        <>
            <CustomDialog
                type="login"
                open={loginOpen}
                setOpen={setLoginOpen}
                setSignupOpen={customSetLoginSignupOpen}
                requestParams={loginRequestParams}
                nextPage={Page.home}
                handleRequestData={saveRequestToken}
            />
            <CustomDialog
                type="signup"
                open={signupOpen}
                setOpen={setSignupOpen}
                setLoginOpen={customSetLoginSignupOpen}
                requestParams={registerRequestParams}
                validate={signupValidate}
                errorMessage="Passwords do not match"
            />
            <div className={classes.bottomNavbar}>
                {context.state.page == Page.leaderboards && (
                    <LeaderboardBottom />
                )}
                {context.state.page == Page.landing && (
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            padding: '0 13px',
                        }}
                    >
                        <p className={classes.bottomDesc}>Start here!</p>
                        <ArrowRightAltIcon className={classes.arrow} />
                        <CustomButton
                            type="landing"
                            variant="primary"
                            onClick={() => {
                                setSignupOpen(true)
                            }}
                        >
                            Sign Up
                        </CustomButton>
                        <CustomButton
                            type="landing"
                            variant="secondary"
                            onClick={() => {
                                setLoginOpen(true)
                            }}
                        >
                            Log In
                        </CustomButton>
                    </div>
                )}
                {context.state.page != Page.landing && (
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <BottomNavigation
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue)
                            }}
                            showLabels
                            className={classes.root}
                        >
                            {bottomNavItems}
                        </BottomNavigation>
                    </div>
                )}
            </div>
        </>
    )
}
