import React from 'react'
import List from '@material-ui/core/List'
import data from '../../../data/leaderboard.json'
import LeaderboardListItem from './LeaderboardListItem'

export default function LeaderboardList({ onItemClick }) {
    const [checked, setChecked] = React.useState([1])

    return (
        <List dense>
            {data.map((user, i) => {
                return (
                    <LeaderboardListItem
                        key={i}
                        user={user}
                        i={i}
                        onClick={onItemClick}
                    />
                )
            })}
        </List>
    )
}
