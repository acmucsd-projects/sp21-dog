import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import CustomIconButton from '../buttons/CustomIconButton'
import ProfileForm from './ModalContent/ProfileForm'
import SettingsForm from './ModalContent/SettingsForm'
import CalendarForm from './ModalContent/CalendarForm'
import ChangePasswordForm from './ModalContent/ChangePasswordForm'
import FilterForm from './ModalContent/FilterForm'
import SortForm from './ModalContent/SortForm'
import MapLayersForm from './ModalContent/MapLayersForm'
import UnsavedChangesAlert from './ModalContent/UnsavedChangesAlert'
import LogoutAlert from './ModalContent/LogoutAlert'
import LoginForm from './ModalContent/LoginForm'
import SignupForm from './ModalContent/SignupForm'
import { Color } from '../../helpers/Color'
import JournalForm from './ModalContent/JournalForm'
import { useTempContext } from '../../contexts/TempContext'
import { useAppContext } from '../../contexts/AppContext'
import { Page } from '../../helpers/Page'
import Alert from '@material-ui/lab/Alert'
import { testFormData } from '../../helpers/Utils'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
})

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, buttonOptions, ...other } = props

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <MuiDialogTitle
                disableTypography
                className={classes.root}
                {...other}
            >
                <Typography variant="h6">{children}</Typography>
            </MuiDialogTitle>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {buttonOptions === 'noTopSubmit' ? (
                    <div style={{ margin: '0 16px 0 8px' }}>
                        <CustomIconButton
                            src={
                                props.whiteButtons
                                    ? './icons/back-white.svg'
                                    : './icons/back-accent.svg'
                            }
                            onClick={onClose}
                            type="button"
                        />
                    </div>
                ) : (
                    buttonOptions !== 'noTop' && (
                        <>
                            <CustomIconButton
                                src="./icons/back-accent.svg"
                                onClick={onClose}
                                type="button"
                            />
                            <div style={{ margin: '0 16px 0 8px' }}>
                                <CustomIconButton
                                    src="./icons/confirm.svg"
                                    type="submit"
                                />
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    )
})

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)

export default function CustomDialog({
    type,
    open,
    setOpen,
    setUnsavedOpen,
    closeAll,
    setEditPasswordOpen,
    setLoginOpen,
    setSignupOpen,
    setLogoutAlertOpen,
    validate,
    errorMessage,
    nextPage,
    requestParams,
    keyName,
    handleRequestData,
}) {
    const context = useAppContext()
    const tempContext = useTempContext()

    const [error, setError] = React.useState(false)
    const [dialogErrorMessage, setDialogErrorMessage] = React.useState(
        errorMessage
    )
    const [loading, setLoading] = React.useState(false)

    function equals(obj1, obj2) {
        return Object.keys(obj1).every((key) => {
            return obj1[key] === obj2[key]
        })
    }

    const handleClose = () => {
        if (
            setUnsavedOpen !== undefined &&
            !equals(tempContext.state, context.state)
        ) {
            setUnsavedOpen(true)
        } else {
            tempContext.setState(context.state)
            setOpen(false)
            setLoading(false)
        }
    }

    const saveAndClose = () => {
        const temp = Object.keys(tempContext.state)
            .filter((key) => !key.includes('password'))
            .reduce((obj, key) => {
                obj[key] = tempContext.state[key]
                return obj
            }, {})
        setOpen(false)
        setLoading(false)
        if (nextPage !== undefined) {
            context.setState(
                {
                    ...context.state,
                    ...temp,
                    page: nextPage,
                },
                tempContext.setState(context.state)
            )
        } else {
            context.setState(
                { ...context.state, ...temp }
                //tempContext.setState(context.state)
            )
        }
    }

    const checkRequest = () => {
        if (requestParams) {
            setLoading(true)
            fetch(requestParams.url, requestParams.params)
                .then((response) => {
                    if (
                        response.status === 200 ||
                        response.status === 201 ||
                        response.status === 204
                    ) {
                        saveAndClose()
                    } else {
                        setError(true)
                        setDialogErrorMessage(response.statusText)
                    }
                    setLoading(false)
                    return response.json()
                })
                .then((data) => {
                    if (handleRequestData !== undefined) {
                        handleRequestData(data)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            saveAndClose()
        }
    }

    const handleSave = () => {
        if (validate !== undefined) {
            if (validate()) {
                setError(false)
                checkRequest()
            } else {
                setError(true)
                setDialogErrorMessage(errorMessage)
            }
        } else {
            checkRequest()
        }
    }

    React.useEffect(() => {
        tempContext.setState(context.state)
    }, [context.state.mapOpen])

    let title = 'title'
    let content = null
    let backgroundColor = Color.primary
    let buttonOptions = null
    if (type === 'editProfile') {
        title = 'Edit Profile'
        content = <ProfileForm />
    } else if (type === 'settings') {
        title = 'settings'
        content = (
            <SettingsForm
                setEditPasswordOpen={setEditPasswordOpen}
                setLogoutAlertOpen={setLogoutAlertOpen}
            />
        )
    } else if (type === 'calendar') {
        title = 'calendar'
        content = <CalendarForm />
    } else if (type === 'editPassword') {
        title = 'change password'
        content = <ChangePasswordForm setEditPasswordOpen={setOpen} />
        buttonOptions = 'noTop'
    } else if (type === 'filter') {
        title = 'filter'
        content = <FilterForm keyName={keyName} />
    } else if (type === 'sort') {
        title = 'sort'
        content = <SortForm keyName={keyName} />
    } else if (type === 'mapLayers') {
        title = 'map layers'
        content = <MapLayersForm keyName={keyName} />
    } else if (type === 'unsaved') {
        title = 'unsaved changes'
        buttonOptions = 'noTop'
        content = (
            <UnsavedChangesAlert
                setUnsavedOpen={setOpen}
                closeAll={() => {
                    tempContext.setState(context.state)
                    closeAll()
                }}
            />
        )
    } else if (type === 'logout') {
        title = 'log out'
        buttonOptions = 'noTop'
        content = (
            <LogoutAlert
                setLogoutAlertOpen={setOpen}
                closeAll={() => closeAll()}
            />
        )
    } else if (type === 'login') {
        title = 'welcome back!'
        buttonOptions = 'noTopSubmit'
        content = <LoginForm setSignupOpen={setSignupOpen} loading={loading} />
    } else if (type === 'signup') {
        title = 'welcome!'
        buttonOptions = 'noTopSubmit'
        content = <SignupForm setLoginOpen={setLoginOpen} loading={loading} />
        backgroundColor = Color.accent
    } else if (type === 'view') {
        title = 'view'
        content = <JournalForm keyName={keyName} />
    }

    return (
        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby="edit-profile"
                open={open}
                disableBackdropClick={false}
                PaperProps={{
                    style: {
                        backgroundColor: backgroundColor,
                    },
                }}
            >
                <form
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSave()
                    }}
                >
                    <DialogTitle
                        id="edit-profile-title"
                        onClose={handleClose}
                        buttonOptions={buttonOptions}
                        whiteButtons={backgroundColor != Color.primary}
                    >
                        {title}
                    </DialogTitle>
                    {error && (
                        <Alert severity="error">{dialogErrorMessage}</Alert>
                    )}
                    <DialogContent dividers>{content}</DialogContent>
                </form>
            </Dialog>
        </>
    )
}
