import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        display: 'flex',
        height: 'inherit',
        width: 'inherit',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    iconRoot: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 'auto',
        height: '91.3%',
    },
}))

export default function CustomIconButton({ src, onClick, type, className }) {
    const classes = useStyles()

    return (
        <button
            className={className}
            style={{
                border: 0,
                backgroundColor: 'transparent',
                padding: 0,
                borderRadius: '15px',
            }}
            type={type}
        >
            <Icon classes={{ root: classes.imageIcon }} onClick={onClick}>
                <img className={classes.imageIcon} src={src} />
            </Icon>
        </button>
    )
}
