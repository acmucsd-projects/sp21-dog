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
import { ListItemIcon } from '@material-ui/core'

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
    const [value, setValue] = React.useState()

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
    }, [context.state.page])

    return (
        <>
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
                            // justifyContent: 'center',
                        }}
                    >
                        <p className={classes.bottomDesc}>Start here!</p>
                        <ArrowRightAltIcon className={classes.arrow} />
                        <CustomButton
                            type="landing"
                            variant="primary"
                            onClick={() => {
                                context.setState({
                                    ...context.state,
                                    page: Page.home,
                                })
                            }}
                        >
                            Sign Up
                        </CustomButton>
                        <CustomButton
                            type="landing"
                            variant="secondary"
                            onClick={() => {
                                context.setState({
                                    ...context.state,
                                    page: Page.home,
                                })
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
