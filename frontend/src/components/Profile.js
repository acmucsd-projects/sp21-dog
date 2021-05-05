import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import CustomButton from './CustomButton'
import EditProfileDialog from './EditProfileDialog'
import LinearDeterminate from './LinearDeterminate'

export default function Profile() {
    const [editProfileOpen, setEditProfileOpen] = React.useState(false)
    const context = useAppContext()

    return (
        <div style={{ width: '100%', padding: '4.347826086%' }}>
            <EditProfileDialog
                open={editProfileOpen}
                setOpen={setEditProfileOpen}
            />
            <div
                style={{
                    display: 'flex',
                }}
            >
                <CustomButton
                    type="settings"
                    variant="secondary"
                    onClick={() => {
                        setEditProfileOpen(true)
                    }}
                >
                    Edit Profile
                </CustomButton>
                <CustomButton type="settings" variant="secondary">
                    Settings
                </CustomButton>
            </div>
            {context.state.bio.split('\n').map((str) => (
                <p>{str}</p>
            ))}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Level 35</h3>
                <p>30 Points to next level</p>
            </div>
            <LinearDeterminate />
            <div style={{ textAlign: 'center' }}>
                <p>User since Apr 27, 2021</p>
                <p>226 Total Points • 57 Tasks Completed</p>
            </div>
        </div>
    )
}
