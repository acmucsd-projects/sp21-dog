import React from 'react'
import data from '../data/leaderboard.json'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import FilterListIcon from '@material-ui/icons/FilterList'
import { Color } from '../helpers/Color'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: Color.primary,
    },
}))

export default function LeaderboardList() {
    const classes = useStyles()
    const [checked, setChecked] = React.useState([1])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    return (
        <List dense className={classes.root}>
            {data.map((item, i) => {
                const labelId = `checkbox-list-secondary-label-${i}`
                return (
                    <ListItem
                        key={i}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                        button
                    >
                        <ListItemText
                            id={labelId}
                            primary={`#${i + 1}`}
                            primaryTypographyProps={{
                                style: {
                                    fontSize: '18px',
                                    margin: '0 10px 0 10px',
                                },
                            }}
                        />
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${item.name}`}
                                src={`/static/images/avatar/${item.name}.jpg`}
                            />
                        </ListItemAvatar>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <ListItemText
                                id={labelId}
                                primary={item.name}
                                secondary={
                                    <>
                                        {/*<FilterListIcon />*/}
                                        {`@${item.username}`}
                                    </>
                                }
                                primaryTypographyProps={{
                                    style: {
                                        fontSize: '18px',
                                        fontWeight: '700',
                                    },
                                }}
                            />
                            <ListItemText
                                id={labelId}
                                primary={`${item.points / 10000}k pts`}
                                primaryTypographyProps={{
                                    style: {
                                        fontSize: '18px',
                                    },
                                }}
                            />
                        </div>
                    </ListItem>
                )
            })}
        </List>
    )
}
