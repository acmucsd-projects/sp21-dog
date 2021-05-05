import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CustomIconButton from './CustomIconButton'
import ProfileForm from './ProfileForm'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    headerButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
})

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, onSave, ...other } = props
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
                <CustomIconButton src="./back.svg" onClick={onClose} />
                <div style={{ margin: '0 16px 0 8px' }}>
                    <CustomIconButton src="./confirm.svg" onClick={onSave} />
                </div>
            </div>
        </div>
    )
})

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)

export default function EditProfileDialog({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        setOpen(false)
    }

    return (
        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby="edit-profile"
                open={open}
            >
                <DialogTitle
                    id="edit-profile-title"
                    onClose={handleClose}
                    onSave={handleSave}
                >
                    Edit Profile
                </DialogTitle>
                <DialogContent dividers>
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        </>
    )
}
