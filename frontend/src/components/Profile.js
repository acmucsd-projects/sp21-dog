import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import CustomButton from './CustomButton'
import LinearDeterminate from './LinearDeterminate'
import CustomDialog from './CustomDialog'

export default function Profile() {
    const [editProfileOpen, setEditProfileOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const context = useAppContext()

    return (
        <div style={{ width: '100%', padding: '4.347826086%' }}>
            <CustomDialog
                type="editProfile"
                open={editProfileOpen}
                setOpen={setEditProfileOpen}
            />
            <CustomDialog
                type="calendar"
                open={settingsOpen}
                setOpen={setSettingsOpen}
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
                <CustomButton
                    type="settings"
                    variant="secondary"
                    onClick={() => {
                        setSettingsOpen(true)
                    }}
                >
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
