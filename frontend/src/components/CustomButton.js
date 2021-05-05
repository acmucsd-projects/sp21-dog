import Button from '@material-ui/core/Button'
import { Color } from '../helpers/Color'

export default function CustomButton(props) {
    let buttonStyle = {
        fontWeight: 'bold',
        width: '100%',
        margin: '1.932367149%',
        lineHeight: '20px',
        textTransform: 'capitalize',
    }

    if (props.type === 'landing') {
        buttonStyle = { ...buttonStyle, borderRadius: '25px', fontSize: '24px' }
        if (props.variant === 'primary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.coreTheme,
                border: '3px solid ' + Color.coreTheme,
                color: Color.primary,
            }
        } else if (props.variant === 'secondary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.primary,
                border: '3px solid ' + Color.coreTheme,
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
        buttonStyle = { ...buttonStyle, borderRadius: '10px', fontSize: '18px' }
        if (props.variant === 'primary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.primary,
                border: '3px solid ' + Color.primary,
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
                border: '3px solid ' + Color.accent,
            }
        } else if (props.variant === 'secondary') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.background,
                border: '3px solid ' + Color.background,
            }
        } else if (props.variant === 'warning') {
            buttonStyle = {
                ...buttonStyle,
                backgroundColor: Color.warningLight,
                border: '3px solid ' + Color.warningLight,
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

    return (
        <Button
            style={buttonStyle}
            variant="contained"
            disableElevation
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}
