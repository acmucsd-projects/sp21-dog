import React from 'react'
import LeaderboardList from './LeaderboardList'
import ProfileDialog from '../../modals/ProfileDialog'

export default function Leaderboards() {
    const [profileOpen, setProfileOpen] = React.useState(false)
    const [leaderboardData, setLeaderboardData] = React.useState([])
    const [profileData, setProfileData] = React.useState()

    const onItemClick = () => {
        setProfileOpen(true)
    }

    const handleShowProfile = (username) => {
        fetch(`https://taskathon-go.herokuapp.com/api/users/user/${username}`)
            .then((response) => response.json())
            .then((data) => {
                setProfileData(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        fetch('https://taskathon-go.herokuapp.com/api/game/leaderboard')
            .then((response) => response.json())
            .then((data) => {
                setLeaderboardData(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div
            className="overflow-container"
            style={{ margin: 0, height: '99%' }}
        >
            <ProfileDialog
                open={profileOpen}
                setOpen={setProfileOpen}
                data={profileData}
            />
            <div style={{ width: '100%' }}>
                <LeaderboardList
                    onItemClick={onItemClick}
                    data={leaderboardData}
                    handleShowProfile={handleShowProfile}
                />
            </div>
        </div>
    )
}
