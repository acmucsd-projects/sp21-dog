import React from 'react'
import List from '@material-ui/core/List'
import LeaderboardListItem from './LeaderboardListItem'

export default function LeaderboardList({
    data,
    onItemClick,
    handleShowProfile,
}) {
    const leaderboardListItems = data.map((user, i) => {
        return (
            <LeaderboardListItem
                key={i}
                user={user}
                i={i}
                onClick={() => {
                    onItemClick()
                    handleShowProfile(user.username)
                }}
            />
        )
    })

    return <List dense>{leaderboardListItems}</List>
}
