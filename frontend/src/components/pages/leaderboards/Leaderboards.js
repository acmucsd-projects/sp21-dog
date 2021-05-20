import React from 'react'
import LeaderboardList from './LeaderboardList'
import ProfileDialog from '../../modals/ProfileDialog'

export default function Leaderboards() {
    const [profileOpen, setProfileOpen] = React.useState(false)
    const [leaderboardData, setLeaderboardData] = React.useState([])

    const onItemClick = () => {
        setProfileOpen(true)
    }

    React.useEffect(() => {
        fetch(
            'https://cors-anywhere.herokuapp.com/https://taskathon-go.herokuapp.com/api/game/leaderboard'
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setLeaderboardData(data)
            })
            .catch((err) => {})
    }, [])

    return (
        <div className="overflow-container" style={{ margin: 0 }}>
            <ProfileDialog open={profileOpen} setOpen={setProfileOpen} />
            <div style={{ width: '100%' }}>
                <LeaderboardList
                    onItemClick={onItemClick}
                    data={leaderboardData}
                />
            </div>
        </div>
    )
}
