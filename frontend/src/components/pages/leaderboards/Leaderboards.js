import React from 'react'
import LeaderboardList from './LeaderboardList'
import ProfileDialog from '../../modals/ProfileDialog'

export default function Leaderboards() {
    const [profileOpen, setProfileOpen] = React.useState(false)

    const onItemClick = () => {
        setProfileOpen(true)
    }

    React.useEffect(() => {
        fetch('https://taskathon-go.herokuapp.com/api/game/leaderboard', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {})
    }, [])

    return (
        <div class="overflow-container" style={{ margin: 0 }}>
            <ProfileDialog open={profileOpen} setOpen={setProfileOpen} />
            <div style={{ width: '100%' }}>
                <LeaderboardList onItemClick={onItemClick} />
            </div>
        </div>
    )
}
