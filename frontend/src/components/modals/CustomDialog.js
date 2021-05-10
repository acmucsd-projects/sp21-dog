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

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
})

const DialogTitle = withStyles(styles)((props) => {
    const {
        children,
        classes,
        onClose,
        onSave,
        noTopSubmitButton,
        ...other
    } = props

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
                {noTopSubmitButton ? (
                    <div style={{ margin: '0 16px 0 8px' }}>
                        <CustomIconButton
                            src={
                                props.whiteButtons
                                    ? './icons/back-white.svg'
                                    : './icons/back-accent.svg'
                            }
                            onClick={onClose}
                        />
                    </div>
                ) : (
                    <>
                        <CustomIconButton
                            src="./icons/back-accent.svg"
                            onClick={onClose}
                        />
                        <div style={{ margin: '0 16px 0 8px' }}>
                            <CustomIconButton
                                src="./icons/confirm.svg"
                                onClick={onSave}
                            />
                        </div>
                    </>
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

export default function CustomDialog({ type, open, setOpen }) {
    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        setOpen(false)
    }

    let title = 'title'
    let content = null
    let backgroundColor = Color.primary
    let noTopSubmitButton = false
    if (type === 'editProfile') {
        title = 'Edit Profile'
        content = <ProfileForm />
    } else if (type === 'settings') {
        title = 'settings'
        content = <SettingsForm />
    } else if (type === 'calendar') {
        title = 'calendar'
        content = <CalendarForm />
    } else if (type === 'changePassword') {
        title = 'change password'
        content = <ChangePasswordForm />
        noTopSubmitButton = true
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
        noTopSubmitButton = true
        content = <UnsavedChangesAlert />
    } else if (type === 'logout') {
        title = 'log out'
        noTopSubmitButton = true
        content = <LogoutAlert />
    } else if (type === 'login') {
        title = 'welcome back!'
        noTopSubmitButton = true
        content = <LoginForm />
    } else if (type === 'signup') {
        title = 'welcome!'
        noTopSubmitButton = true
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
                <DialogTitle
                    id="edit-profile-title"
                    onClose={handleClose}
                    onSave={handleSave}
                    noTopSubmitButton={noTopSubmitButton}
                    whiteButtons={backgroundColor != Color.primary}
                >
                    {title}
                </DialogTitle>
                <DialogContent dividers>{content}</DialogContent>
            </Dialog>
        </>
    )
}
