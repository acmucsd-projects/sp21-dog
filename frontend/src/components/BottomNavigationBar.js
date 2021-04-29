import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Page } from '../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ListAltIcon from '@material-ui/icons/ListAlt'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import PersonIcon from '@material-ui/icons/Person'
import PublicIcon from '@material-ui/icons/Public'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles({
    root: {
        height: '80px',
    },
})

export default function BottomNavigationBar() {
    const classes = useStyles()
    const context = useAppContext()
    const [value, setValue] = React.useState()

    const order = [
        Page.profile,
        Page.journal,
        Page.tasks,
        Page.map,
        Page.leaderboards,
    ]

    React.useEffect(() => {
        setValue(order.indexOf(context.state.page))
    }, [context.state.page])

    return (
        <BottomNavigation
            style={{ width: '100%' }}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                label="user"
                icon={<PersonIcon />}
                onClick={() => {
                    context.setState({ ...context.state, page: Page.profile })
                }}
            />
            <BottomNavigationAction
                label={Page.journal}
                icon={<MenuBookIcon />}
                onClick={() => {
                    context.setState({ ...context.state, page: Page.journal })
                }}
            />
            <BottomNavigationAction
                label={Page.tasks}
                icon={<ListAltIcon />}
                onClick={() => {
                    context.setState({ ...context.state, page: Page.tasks })
                }}
            />
            <BottomNavigationAction
                label={Page.map}
                icon={<PublicIcon />}
                onClick={() => {
                    context.setState({ ...context.state, page: Page.map })
                }}
            />
            <BottomNavigationAction
                label="leader"
                icon={<StarIcon />}
                onClick={() => {
                    context.setState({
                        ...context.state,
                        page: Page.leaderboards,
                    })
                }}
            />
        </BottomNavigation>
    )
}
