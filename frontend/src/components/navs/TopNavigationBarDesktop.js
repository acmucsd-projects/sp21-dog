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
import Typography from '@material-ui/core/Typography'
import { useTempContext } from '../../contexts/TempContext'

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
        '&:hover': {
            cursor: 'pointer',
        },
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
    logoIconRoot: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'auto',
        height: '91.3%',
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
})

export default function TopNavigationBarDesktop() {
    const classes = useStyles()
    const context = useAppContext()
    const tempContext = useTempContext()
    const [value, setValue] = React.useState()
    const [loginOpen, setLoginOpen] = React.useState(false)
    const [signupOpen, setSignupOpen] = React.useState(false)

    const customSetLoginSignupOpen = (open) => {
        setLoginOpen(!loginOpen)
        setSignupOpen(!signupOpen)
    }

    const accountValidate = () => {}

    const confirmPasswordValidate = () => {
        console.log(tempContext.state)
        return tempContext.state.password === tempContext.state.confirmPassword
    }

    const orderedNavItems = [
        { page: Page.profile, iconSrc: '/icons/user.svg' },
        { page: Page.home, iconSrc: '/icons/home.svg' },
        { page: Page.tasks, iconSrc: '/icons/tasks.svg' },
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
    }, [context.state.page])

    return (
        <>
            <CustomDialog
                type="login"
                open={loginOpen}
                setOpen={setLoginOpen}
                setSignupOpen={customSetLoginSignupOpen}
                nextPage={Page.home}
            />
            <CustomDialog
                type="signup"
                open={signupOpen}
                setOpen={setSignupOpen}
                setLoginOpen={customSetLoginSignupOpen}
                nextPage={Page.home}
                validate={confirmPasswordValidate}
                errorMessage="Passwords do not match"
            />
            <div className={classes.bottomNavbar}>
                {context.state.page == Page.leaderboards && (
                    <LeaderboardBottom />
                )}
                {context.state.page != Page.landing && (
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon classes={{ root: classes.logoIconRoot }}>
                            <img
                                className={classes.imageIcon}
                                src="/logo.svg"
                            />
                        </Icon>
                        <Typography variant="h6" className={classes.landing}>
                            Taskathon
                        </Typography>
                        <Typography
                            variant="h6"
                            className={classes.landingBlue}
                        >
                            Go!
                        </Typography>
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
                        <Typography variant="h6" className={classes.landing}>
                            {context.state.page}
                        </Typography>
                        <Icon classes={{ root: classes.logoIconRoot }}>
                            <img
                                className={classes.imageIcon}
                                src="/profilepic.svg"
                            />
                        </Icon>
                    </div>
                )}
            </div>
        </>
    )
}
