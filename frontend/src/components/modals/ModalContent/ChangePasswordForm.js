import { useAppContext } from '../../../contexts/AppContext'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CustomButton from '../../buttons/CustomButton'

const useStyles = makeStyles((theme) => ({
    formRoot: {
        '& > p': {
            fontWeight: 'bold',
        },
        '& > div': {
            width: '100%',
            marginBottom: '3.454894433%',
        },
        '& > div:last-child': {
            marginBottom: 0,
        },
    },
}))

export default function ChangePasswordForm({ setEditPasswordOpen }) {
    const classes = useStyles()

    return (
        <div className={classes.formRoot}>
            <Typography>Old Password</Typography>
            <TextField
                id="old-password"
                variant="outlined"
                type="password"
                required
                onChange={() => {}}
            />
            <Typography>New Password</Typography>
            <TextField
                id="new-password"
                variant="outlined"
                type="password"
                required
            />
            <Typography>Confirm New Password</Typography>
            <TextField
                id="confirm-new-password"
                variant="outlined"
                type="password"
                required
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton type="settings" variant="primary" submit={true}>
                    Confirm
                </CustomButton>
                <CustomButton
                    type="settings"
                    variant="secondary"
                    onClick={() => {
                        setEditPasswordOpen(false)
                    }}
                >
                    Cancel
                </CustomButton>
            </div>
        </div>
    )
}
