import React from 'react'
import List from '@material-ui/core/List'
import data from '../../../data/leaderboard.json'
import LeaderboardListItem from './LeaderboardListItem'

export default function LeaderboardList() {
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
        <List dense>
            {data.map((user, i) => {
                return <LeaderboardListItem key={i} user={user} i={i} />
            })}
        </List>
    )
}
