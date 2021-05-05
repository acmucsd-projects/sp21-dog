import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'

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

export default function CustomIconButton({ src, onClick, style }) {
    const classes = useStyles()

    return (
        <Icon classes={{ root: classes.imageIcon }} onClick={onClick}>
            <img className={classes.imageIcon} src={src} />
        </Icon>
    )
}
