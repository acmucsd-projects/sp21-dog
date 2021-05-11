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
}) {
    const context = useAppContext()
    const tempContext = useTempContext()

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
            setOpen(false)
        }
    }

    const handleSave = () => {
        setOpen(false)
        context.setState({ ...context.state, ...tempContext.state })
    }

    React.useEffect(() => {
        tempContext.setState(context.state)
    }, [])

    let title = 'title'
    let content = null
    let backgroundColor = Color.primary
    let buttonOptions = null
    if (type === 'editProfile') {
        title = 'Edit Profile'
        content = <ProfileForm />
    } else if (type === 'settings') {
        title = 'settings'
        content = <SettingsForm setEditPasswordOpen={setEditPasswordOpen} />
    } else if (type === 'calendar') {
        title = 'calendar'
        content = <CalendarForm />
    } else if (type === 'editPassword') {
        title = 'change password'
        content = <ChangePasswordForm setEditPasswordOpen={setOpen} />
        buttonOptions = 'noTopSubmit'
    } else if (type === 'filter') {
        title = 'filter'
        content = <FilterForm />
    } else if (type === 'sort') {
        title = 'sort'
        content = <SortForm />
    } else if (type === 'mapLayers') {
        title = 'map layers'
        content = <MapLayersForm />
    } else if (type === 'unsaved') {
        title = 'unsaved changes'
        buttonOptions = 'noTop'
        content = (
            <UnsavedChangesAlert setUnsavedOpen={setOpen} closeAll={closeAll} />
        )
    } else if (type === 'logout') {
        title = 'log out'
        buttonOptions = 'noTopSubmit'
        content = <LogoutAlert />
    } else if (type === 'login') {
        title = 'welcome back!'
        buttonOptions = 'noTopSubmit'
        content = <LoginForm />
    } else if (type === 'signup') {
        title = 'welcome!'
        buttonOptions = 'noTopSubmit'
        content = <SignupForm />
        backgroundColor = Color.accent
    } else if (type === 'journalView') {
        title = 'view'
        content = <JournalForm />
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
                    <DialogContent dividers>{content}</DialogContent>
                </form>
            </Dialog>
        </>
    )
}
