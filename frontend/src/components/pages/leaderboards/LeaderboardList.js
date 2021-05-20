import React from 'react'
import List from '@material-ui/core/List'
import LeaderboardListItem from './LeaderboardListItem'

export default function LeaderboardList({ onItemClick, data }) {
    const leaderboardListItems = data.map((user, i) => {
        return (
            <LeaderboardListItem
                key={i}
                user={user}
                i={i}
                onClick={onItemClick}
            />
        )
    })

    React.useEffect(() => {
        console.log(data)
    }, data)

    return <List dense>{leaderboardListItems}</List>
}
