import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Page } from '../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import LeaderboardBottom from './LeaderboardBottom'
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
    middleActionItemStyles: {
        //width: '200px',
        //height: '60px',
        minWidth: '20.77294686%',
        //height: '75%',
        borderRadius: '25px',
        backgroundColor: Color.background,
        '&$selected': {
            backgroundColor: Color.accent,
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
        { page: Page.journal, iconSrc: '/icons/journal.svg' },
        { page: Page.tasks, iconSrc: '/icons/tasks.svg' },
        { page: Page.map, iconSrc: '/icons/map.svg' },
        { page: Page.leaderboards, iconSrc: '/icons/trophy.svg' },
    ]

    const bottomNavItems = orderedNavItems.map((item, i) => {
        let itemClasses = {
            selected: classes.selected,
        }
        console.log(parseInt(orderedNavItems.length / 2))
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
                // position: 'sticky',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {context.state.page == Page.leaderboards && <LeaderboardBottom />}
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
        </div>
    )
}
