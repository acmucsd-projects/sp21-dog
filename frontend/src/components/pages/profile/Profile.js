import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useTempContext } from '../../../contexts/TempContext'
import CustomButton from '../../buttons/CustomButton'
import CustomDialog from '../../modals/CustomDialog'
import ProfileContent from './ProfileContent'

export default function Profile() {
    const tempContext = useTempContext()

    const [editProfileOpen, setEditProfileOpen] = React.useState(false)
    const [editPasswordOpen, setEditPasswordOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [unsavedOpen, setUnsavedOpen] = React.useState(false)
    const [logoutAlertOpen, setLogoutAlertOpen] = React.useState(false)

    const customSetEditPasswordOpen = (open) => {
        setEditPasswordOpen(open)
        setSettingsOpen(!open)
    }

    const closeAll = () => {
        setUnsavedOpen(false)
        setSettingsOpen(false)
        setEditProfileOpen(false)
        setLogoutAlertOpen(false)
    }

    const confirmPasswordValidate = () => {
        if (tempContext.state.password === tempContext.state.confirmPassword) {
            //fetch here
            return true
        }
        return false
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
                setLogoutAlertOpen={setLogoutAlertOpen}
            />
            <CustomDialog
                type="editPassword"
                open={editPasswordOpen}
                setOpen={customSetEditPasswordOpen}
                validate={confirmPasswordValidate}
                errorMessage="Old password is incorrect or passwords do not match"
            />
            <CustomDialog
                type="unsaved"
                open={unsavedOpen}
                setOpen={setUnsavedOpen}
                closeAll={closeAll}
            />
            <CustomDialog
                type="logout"
                open={logoutAlertOpen}
                setOpen={setLogoutAlertOpen}
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
