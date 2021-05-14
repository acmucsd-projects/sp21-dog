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

export default function SignupForm() {
    const classes = useStyles()
    const context = useAppContext()

    const handleSave = () => {}

    return (
        <>
            <form className={classes.formRoot} noValidate autoComplete="off">
                <Typography>Email</Typography>
                <TextField id="email" variant="outlined" type="email" />
                <Typography>Password</Typography>
                <TextField id="password" variant="outlined" type="password" />
                <Typography>Confirm Password</Typography>
                <TextField id="password" variant="outlined" type="password" />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CustomButton
                        type="landing"
                        variant="primary"
                        halfWidth={true}
                    >
                        Sign Up
                    </CustomButton>
                </div>
                <hr />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        style={{ fontSize: '18px', fontWeight: 'bold' }}
                    >
                        Already have an account? Log in here!
                    </Typography>
                    <CustomButton
                        type="landing"
                        variant="secondary"
                        halfWidth={true}
                    >
                        Log In
                    </CustomButton>
                </div>
            </form>
        </>
    )
}
