import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        display: 'flex',
        width: 'inherit',
    },
    numberDisplay: {
        width: '22.946859903%',
        textAlign: 'center',
    },
}))

export default function LeaderboardListItem({ user, i, onClick }) {
    const classes = useStyles()
    const labelId = `checkbox-list-secondary-label-${i}`

    return (
        <ListItem
            style={{
                display: 'flex',
            }}
            onClick={onClick}
            button
        >
            <div className={classes.numberDisplay}>
                <ListItemText
                    id={labelId}
                    primary={`#${i + 1}`}
                    primaryTypographyProps={{
                        style: {
                            fontFamily: 'Oswald',
                            fontSize: '18px',
                        },
                    }}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <ListItemAvatar>
                    <Avatar
                        alt={`Avatar n°${user.name}`}
                        src={`/static/images/avatar/${user.name}.jpg`}
                    />
                </ListItemAvatar>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <ListItemText
                        id={labelId}
                        primary={user.name}
                        secondary={
                            <div
                                style={{
                                    display: 'flex',
                                    width: '34.28%',
                                    height: '34.28%',
                                }}
                            >
                                <img
                                    className={classes.imageIcon}
                                    style={{ marginRight: '7.614696363%' }}
                                    src="/icons/nature.svg"
                                />
                                {`@${user.username}`}
                            </div>
                        }
                        primaryTypographyProps={{
                            style: {
                                fontSize: '18px',
                                fontWeight: '700',
                            },
                        }}
                    />
                </div>
            </div>
            <div className={classes.numberDisplay}>
                <ListItemText
                    id={labelId}
                    primary={`${user.points / 10000}k pts`}
                    primaryTypographyProps={{
                        style: {
                            fontFamily: 'Oswald',
                            fontSize: '18px',
                        },
                    }}
                />
            </div>
        </ListItem>
    )
}
