import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import CustomButton from '../../buttons/CustomButton'
import CustomDialog from '../../modals/CustomDialog'
import ProfileContent from './ProfileContent'

export default function Profile() {
    const [editProfileOpen, setEditProfileOpen] = React.useState(false)
    const [editPasswordOpen, setEditPasswordOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [unsavedOpen, setUnsavedOpen] = React.useState(false)
    const context = useAppContext()

    const customSetEditPasswordOpen = (open) => {
        setEditPasswordOpen(open)
        setSettingsOpen(!open)
    }

    const closeAll = () => {
        setUnsavedOpen(false)
        setSettingsOpen(false)
        setEditProfileOpen(false)
    }

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
                setUnsavedOpen={setUnsavedOpen}
            />
            <CustomDialog
                type="settings"
                open={settingsOpen}
                setOpen={setSettingsOpen}
                setEditPasswordOpen={customSetEditPasswordOpen}
                setUnsavedOpen={setUnsavedOpen}
            />
            <CustomDialog
                type="editPassword"
                open={editPasswordOpen}
                setOpen={customSetEditPasswordOpen}
            />
            <CustomDialog
                type="unsaved"
                open={unsavedOpen}
                setOpen={setUnsavedOpen}
                closeAll={closeAll}
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
            <ProfileContent />
        </div>
    )
}
