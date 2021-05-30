import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { useTempContext } from '../../../contexts/TempContext'
import CustomButton from '../../buttons/CustomButton'
import CustomDialog from '../../modals/CustomDialog'
import ProfileContent from './ProfileContent'
import ProfileCard from '../../cards/ProfileCard'
import { objToFormData } from '../../../helpers/Utils'
import { useAuthContext } from '../../../contexts/AuthContext'

export default function Profile() {
    const context = useAppContext()
    const tempContext = useTempContext()
    const auth = useAuthContext()

    const [profileData, setProfileData] = React.useState()
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

    /*const editEmailParams = {
        url: `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}/edit-email`,
        params: {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + auth.state.token,
            }),
            body: objToFormData({
                email: tempContext.state.email,
            }),
        },
    }*/

    const editProfileParams = {
        url: `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}/edit`,
        params: {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + auth.state.token,
            }),
            body: objToFormData({
                displayName: tempContext.state.displayName,
                username: tempContext.state.username,
                bio: tempContext.state.bio,
            }),
        },
    }

    /*const editPasswordParams = {
        url: `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}/edit-password`,
        params: {
            method: 'POST',
            headers: new Headers({
                Authorization: 'Bearer ' + auth.state.token,
            }),
            body: objToFormData({
                oldPassword: null,
                newPassword: 'password',
            }),
        },
    }*/

    React.useEffect(() => {
        fetch(
            `https://taskathon-go.herokuapp.com/api/users/user/${context.state.username}/edit`,
            {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + auth.state.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                context.setState({
                    ...context.state,
                    email: data.email || '',
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
                requestParams={editProfileParams}
            />
            <CustomDialog
                type="settings"
                open={settingsOpen}
                setOpen={setSettingsOpen}
                setEditPasswordOpen={customSetEditPasswordOpen}
                setUnsavedOpen={setUnsavedOpen}
                setLogoutAlertOpen={setLogoutAlertOpen}
                //requestParams={editEmailParams}
            />
            <CustomDialog
                type="editPassword"
                open={editPasswordOpen}
                setOpen={customSetEditPasswordOpen}
                validate={confirmPasswordValidate}
                errorMessage="Old password is incorrect or passwords do not match"
                //requestParams={editPasswordParams}
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
            <ProfileContent data={context.state} />
        </div>
    )
}
