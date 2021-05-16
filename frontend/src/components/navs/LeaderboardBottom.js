import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import { Color } from '../../helpers/Color'

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        display: 'flex',
        height: 'inherit',
        width: 'inherit',
    },
    iconRoot: {
        textAlign: 'center',
        width: '9.661835749vw',
        height: '5.434782609vh',
        margin: '0.6793478261vh 1.207729469vw',
    },
    container: {
        textAlign: 'left',
    },
    biggerText: {
        fontSize: '2.445652174vh',
        margin: 0,
        fontWeight: 700,
    },
    smallerText: {
        fontSize: '1.902173913vh',
        fontWeight: 400,
        margin: 0,
    },
}))
export default function LeaderboardBottom() {
    const classes = useStyles()
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: Color.accent,
            }}
        >
            <Icon classes={{ root: classes.iconRoot }}>
                <img className={classes.imageIcon} src="/profilepic.svg" />
            </Icon>
            <div className={classes.container}>
                <p className={classes.biggerText}>
                    You're in 2nd place with 19k pts!
                </p>
                <p className={classes.smallerText}>
                    19k pts behind the next person
                </p>
            </div>
        </div>
    )
}
