import { useAppContext } from '../contexts/AppContext'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import CustomButton from './CustomButton'

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

export default function ProfileForm() {
    const classes = useStyles()
    const context = useAppContext()

    return (
        <form className={classes.formRoot} noValidate autoComplete="off">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography style={{ fontWeight: 'bold' }}>
                    Profile Icon
                </Typography>
                <div style={{ display: 'flex' }}>
                    <CustomButton
                        type="settings"
                        variant="secondary"
                        noVerticalMargin={true}
                    >
                        Change
                    </CustomButton>
                    <CustomButton
                        type="settings"
                        variant="secondary"
                        noVerticalMargin={true}
                    >
                        Remove
                    </CustomButton>
                </div>
            </div>
            <Typography>Display Name</Typography>
            <TextField
                id="display-name"
                variant="outlined"
                required
                value={context.state.displayName}
            />
            <Typography>Username</Typography>
            <TextField
                id="username"
                variant="outlined"
                value={context.state.username}
            />
            <Typography>Region</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="region-label"
                    id="region"
                    value={0}
                    //onChange={handleChange}
                    label="Region"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>United States</MenuItem>
                </Select>
            </FormControl>
            <Typography>Bio</Typography>
            <TextField
                id="bio"
                variant="outlined"
                multiline
                rows={10}
                value={context.state.bio}
            />
        </form>
    )
}
