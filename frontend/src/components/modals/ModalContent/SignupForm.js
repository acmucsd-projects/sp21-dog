import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LoopIcon from '@material-ui/icons/Loop'
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

export default function SignupForm({ loading, setLoginOpen }) {
    const classes = useStyles()
    const tempContext = useTempContext()

    return (
        <>
            <div className={classes.formRoot}>
                <Typography>Email</Typography>
                <TextField
                    id="email"
                    variant="outlined"
                    type="email"
                    required
                    onChange={(e) =>
                        tempContext.setState({
                            ...tempContext.state,
                            email: e.target.value,
                        })
                    }
                />
                <Typography>Password</Typography>
                <TextField
                    id="password"
                    variant="outlined"
                    type="password"
                    inputProps={{ minLength: 8 }}
                    required
                    onChange={(e) =>
                        tempContext.setState({
                            ...tempContext.state,
                            password: e.target.value,
                        })
                    }
                />
                <Typography>Confirm Password</Typography>
                <TextField
                    id="confirmPassword"
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
                    <CustomButton
                        type="landing"
                        variant="primary"
                        halfWidth={true}
                        submit={true}
                        disabled={loading}
                    >
                        {loading === true ? (
                            <LoopIcon
                                className="spin"
                                style={{
                                    height: 'auto',
                                    width: '17%',
                                    padding: 0,
                                }}
                            />
                        ) : (
                            'Sign Up'
                        )}
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
                        onClick={() => setLoginOpen(true)}
                    >
                        Log In
                    </CustomButton>
                </div>
            </div>
        </>
    )
}
