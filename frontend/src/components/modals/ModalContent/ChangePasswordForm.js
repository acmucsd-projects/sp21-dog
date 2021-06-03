import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CustomButton from '../../buttons/CustomButton'
import { useTempContext } from '../../../contexts/TempContext'

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
    const tempContext = useTempContext()

    return (
        <div className={classes.formRoot}>
            <Typography>Old Password</Typography>
            <TextField
                id="old-password"
                variant="outlined"
                type="password"
                required
            />
            <Typography>New Password</Typography>
            <TextField
                id="new-password"
                variant="outlined"
                type="password"
                inputProps={{ minLength: 8 }}
                required
                onChange={(e) => {
                    tempContext.setState({
                        ...tempContext.state,
                        password: e.target.value,
                    })
                }}
            />
            <Typography>Confirm New Password</Typography>
            <TextField
                id="confirm-new-password"
                variant="outlined"
                type="password"
                inputProps={{ minLength: 8 }}
                required
                onChange={(e) =>
                    tempContext.setState({
                        ...tempContext.state,
                        confirmPassword: e.target.value,
                    })
                }
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
            <Typography style={{ textAlign: 'center', color: 'gray' }}>
                (View Only)
            </Typography>
        </div>
    )
}
