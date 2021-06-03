import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CustomButton from '../../buttons/CustomButton'
import LoopIcon from '@material-ui/icons/Loop'
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

export default function LoginForm({ loading, setSignupOpen }) {
    const classes = useStyles()
    const tempContext = useTempContext()

    return (
        <>
            <div className={classes.formRoot}>
                <Typography>Username</Typography>
                <TextField
                    id="username"
                    variant="outlined"
                    type="username"
                    required
                    onChange={(e) =>
                        tempContext.setState({
                            ...tempContext.state,
                            username: e.target.value,
                        })
                    }
                />
                <Typography>Password</Typography>
                <TextField
                    id="password"
                    variant="outlined"
                    type="password"
                    onChange={(e) =>
                        tempContext.setState({
                            ...tempContext.state,
                            password: e.target.value,
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
                            'Log In'
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
                        No account? Create one here, it’s easy!
                    </Typography>
                    <CustomButton
                        type="landing"
                        variant="secondary"
                        halfWidth={true}
                        onClick={() => setSignupOpen(true)}
                    >
                        Sign Up
                    </CustomButton>
                </div>
            </div>
        </>
    )
}
