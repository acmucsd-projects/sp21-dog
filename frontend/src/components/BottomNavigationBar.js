import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Page } from '../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Icon from '@material-ui/core/Icon'
import { Color } from '../helpers/Color'
import { ListItemIcon } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        maxWidth: '1000px',
        minWidth: '100px',
        height: '60px',
        justifyContent: 'space-evenly',
    },
    imageIcon: {
        height: 'inherit',
        width: 'inherit',
    },
    iconRoot: {
        textAlign: 'center',
        width: '25px',
        height: '25px',
    },
    actionItemStyles: {
        width: '200px',
        height: '60px',
        borderRadius: '50%',
        '&$selected': {
            backgroundColor: Color.accent,

            '& button': {
                backgroundColor: Color.blue,
            },
        },
    },
    selected: {},
    button: {
        backgroundColor: 'blue',
    },
})

export default function BottomNavigationBar() {
    const classes = useStyles()
    const context = useAppContext()
    const [value, setValue] = React.useState()

    const orderedNavItems = [
        { page: Page.profile, iconSrc: '/icons/user.svg' },
        { page: Page.journal, iconSrc: '/icons/journal.svg' },
        { page: Page.tasks, iconSrc: '/icons/tasks.svg' },
        { page: Page.map, iconSrc: '/icons/map.svg' },
        { page: Page.leaderboards, iconSrc: '/icons/trophy.svg' },
    ]

    const bottomNavItems = orderedNavItems.map((item, i) => {
        return (
            <BottomNavigationAction
                key={i}
                disableRipple={true}
                classes={{
                    root: classes.actionItemStyles,
                    selected: classes.selected,
                }}
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
                    context.setState({ ...context.state, page: item.page })
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
        <div
            style={{
                backgroundColor: Color.primary,
                width: '100%',
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
    )
}
