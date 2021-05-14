import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

export default function Dropdown() {
    const classes = useStyles()
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
            <Select
                native
                //value={state.age}
                //onChange={handleChange}
                label="Age"
                inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
            </Select>
        </FormControl>
    )
}
