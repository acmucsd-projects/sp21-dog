import Button from '@material-ui/core/Button'
import { Color } from '../../helpers/Color'

export default function CustomButton(props) {
    let buttonStyle = {
        fontWeight: 'bold',
        width: '100%',
        margin: '1.932367149%',
        lineHeight: '20px',
        textTransform: 'capitalize',
    }
    if (props.halfWidth) {
        buttonStyle = { ...buttonStyle, width: '50%' }
    }
    if (props.inheritWidth) {
        buttonStyle = { ...buttonStyle, width: 'inherit' }
    }
    if (props.type === 'landing') {
        buttonStyle = { ...buttonStyle, borderRadius: '25px', fontSize: '24px' }
        if (props.variant === 'primary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.coreTheme,
                // fontSize: '24px',
                fontSize: '3.260869565vh',
                height: '5.842391304vh',
                width: '53.8647343vw',
                fontFamily: 'Oswald',
                fontWeight: 'normal',
                textAlign: 'center',
                // border: '3px solid ' + Color.coreTheme,
                color: Color.primary,
            }
        } else if (props.variant === 'secondary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.primary,
                border: '3px solid ' + Color.coreTheme,
                fontSize: '3.260869565vh',
                height: '5.842391304vh',
                width: '53.8647343vw',
                fontFamily: 'Oswald',
                fontWeight: 'normal',
                // fontSize: '18px',
                color: Color.coreTheme,
            }
        } else if (props.variant === 'warning') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.primary,
                border: '3px solid ' + Color.warning,
                color: Color.warning,
            }
        }
    } else if (props.type === 'tasks') {
        buttonStyle = {
            ...buttonStyle,
            borderRadius: '10px',
            fontSize: '2.445652714vh',
            height: '5.163043478vh',
        }
        if (props.variant === 'primary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.primary,
                //border: '3px solid ' + Color.primary,
            }
        } else if (props.variant === 'secondary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.primary,
                border: '3px solid ' + Color.coreTheme,
                color: Color.coreTheme,
            }
        }
    } else if (props.type === 'settings') {
        buttonStyle = { ...buttonStyle, borderRadius: '10px', fontSize: '18px' }
        if (props.variant === 'primary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.accent,
                //border: '3px solid ' + Color.accent,
            }
        } else if (props.variant === 'secondary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.background,
                height: '5.027173913vh',
                fontSize: '2.445652174vh',
                //border: '3px solid ' + Color.background,
            }
        } else if (props.variant === 'warning') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.warningLight,
                //border: '3px solid ' + Color.warningLight,
            }
        }
    } else if (props.type === 'search') {
        buttonStyle = {
            ...buttonStyle,
            borderRadius: '25px',
            fontSize: '18px',
        }
        buttonStyle = {
            ...buttonStyle,
            backgroundColor: Color.background,
            //border: '3px solid ' + Color.background,
        }
        if (props.selected) {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.selection,
                //border: '3px solid ' + Color.background,
            }
        }
    }

    if (props.noVerticalMargin) {
        buttonStyle = {
            ...buttonStyle,
            marginTop: 0,
            marginBottom: 0,
        }
    }

    return props.submit === undefined || !props.submit ? (
        <Button
            style={buttonStyle}
            variant="contained"
            disableElevation
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </Button>
    ) : (
        <Button
            style={buttonStyle}
            variant="contained"
            disableElevation
            onClick={props.onClick}
            disabled={props.disabled}
            type="submit"
        >
            {props.children}
        </Button>
    )
}
