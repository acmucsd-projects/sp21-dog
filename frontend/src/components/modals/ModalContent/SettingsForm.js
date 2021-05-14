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

export default function SettingsForm() {
    const classes = useStyles()
    const context = useAppContext()

    const handleSave = () => {}

    return (
        <form className={classes.formRoot} noValidate autoComplete="off">
            <Typography>Email</Typography>
            <TextField id="email" variant="outlined" type="email" />
            <Typography>Password</Typography>
            <TextField id="password" variant="outlined" type="password" />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton
                    type="landing"
                    variant="warning"
                    halfWidth={true}
                    onClick={handleSave}
                >
                    Log Out
                </CustomButton>
            </div>
        </form>
    )
}
