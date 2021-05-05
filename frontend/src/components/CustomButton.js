import Button from '@material-ui/core/Button'
import { Color } from '../helpers/Color'

export default function CustomButton(props) {
    return (
        <Button
            style={{
                ...props.style,
                borderRadius: '10px',
                backgroundColor: Color.background,
                width: '100%',
                margin: '1.932367149%',
                textTransform: 'capitalize',
            }}
            variant="contained"
            disableElevation
        >
            {props.children}
        </Button>
    )
}
