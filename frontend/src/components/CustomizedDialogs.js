import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import CustomIconButton from './CustomIconButton'
import CustomButton from './CustomButton'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
    formRoot: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
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
    const { children, classes, onClose, ...other } = props
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
                    <CustomIconButton src="./confirm.svg" />
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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions)

export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(true)

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Open dialog
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Profile
                </DialogTitle>
                <DialogContent dividers>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography gutterBottom>Profile Icon</Typography>
                        <div style={{ display: 'flex' }}>
                            <CustomButton type="settings" variant="secondary">
                                Change
                            </CustomButton>
                            <CustomButton type="settings" variant="secondary">
                                Remove
                            </CustomButton>
                        </div>
                    </div>
                    <form
                        className={styles.formRoot}
                        noValidate
                        autoComplete="off"
                    >
                        <Typography gutterBottom>Display Name</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                        <Typography gutterBottom>Username</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                        <Typography gutterBottom>Region</Typography>
                        <FormControl
                            variant="outlined"
                            className={styles.formControl}
                        >
                            <InputLabel id="demo-simple-select-outlined-label">
                                Age
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                //value={age}
                                //onChange={handleChange}
                                label="Age"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography gutterBottom>Bio</Typography>
                        <TextField
                            id="outlined-basic"
                            label="Outlined"
                            variant="outlined"
                        />
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
