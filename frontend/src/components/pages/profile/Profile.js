import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import CustomButton from '../../buttons/CustomButton'
import LinearDeterminate from './LinearDeterminate'
import CustomDialog from '../../modals/CustomDialog'
import StatsChart from '../../charts/StatsChart'

export default function Profile() {
    const [editProfileOpen, setEditProfileOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const context = useAppContext()

    return (
        <div
            className="overflow-container"
            style={{
                width: '100%',
                padding: '4.347826086%',
                flexDirection: 'column',
            }}
        >
            <CustomDialog
                type="editProfile"
                open={editProfileOpen}
                setOpen={setEditProfileOpen}
            />
            <CustomDialog
                type="settings"
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
            <hr style={{ margin: '12px 0' }} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h3 style={{ fontSize: '18px', margin: '8px 0' }}>Level 35</h3>
                <p>30 Points to next level</p>
            </div>
            <LinearDeterminate />
            <div
                style={{
                    height: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <StatsChart />
                <div style={{ textAlign: 'center' }}>
                    <p>User since Apr 27, 2021</p>
                    <p>226 Total Points • 57 Tasks Completed</p>
                </div>
            </div>
        </div>
    )
}
