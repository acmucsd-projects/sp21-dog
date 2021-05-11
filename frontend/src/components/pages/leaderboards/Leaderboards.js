import React from 'react'
import LeaderboardList from './LeaderboardList'
import ProfileDialog from '../../modals/ProfileDialog'

export default function Leaderboards() {
    const [profileOpen, setProfileOpen] = React.useState(false)

    const onItemClick = () => {
        setProfileOpen(true)
    }

    return (
        <div class="overflow-container" style={{ margin: 0 }}>
            <ProfileDialog open={profileOpen} setOpen={setProfileOpen} />
            <div style={{ width: '100%' }}>
                <LeaderboardList onItemClick={onItemClick} />
            </div>
        </div>
    )
}
