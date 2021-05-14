import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { Color } from '../../helpers/Color'
import ProfileCard from '../cards/ProfileCard'
import ProfileContent from '../pages/profile/ProfileContent'

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent)

export default function ProfileDialog({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="edit-profile"
            open={open}
            disableBackdropClick={false}
            PaperProps={{
                style: {
                    backgroundColor: Color.primary,
                    height: '80%',
                },
            }}
        >
            <ProfileCard />
            <DialogContent dividers>
                <ProfileContent />
            </DialogContent>
        </Dialog>
    )
}
