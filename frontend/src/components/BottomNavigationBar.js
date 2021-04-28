import React from 'react'
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
        width: 500,
    },
})

export default function BottomNavigationBar() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

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
            <BottomNavigationAction label="User" icon={<PersonIcon />} />
            <BottomNavigationAction label="Journal" icon={<MenuBookIcon />} />
            <BottomNavigationAction label="Tasks" icon={<ListAltIcon />} />
            <BottomNavigationAction label="Map" icon={<PublicIcon />} />
            <BottomNavigationAction label="Leader" icon={<StarIcon />} />
        </BottomNavigation>
    )
}
