import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import ReactCountryFlag from 'react-country-flag'

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        display: 'flex',
        width: 'inherit',
        marginRight: '7.614696363%',
    },
    numberDisplay: {
        width: '22.946859903%',
        textAlign: 'center',
    },
}))

export default function LeaderboardListItem({ user, i, onClick }) {
    const classes = useStyles()
    const labelId = `checkbox-list-secondary-label-${i}`

    let pointsLabel = `${user.points} pts`
    if (pointsLabel >= 1000) {
        pointsLabel = `${user.points / 1000}k pts`
    }

    return (
        <ListItem
            style={{
                display: 'flex',
                height: '8.831521739vh',
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
                            fontSize: '2.445652174vh',
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
                        alt={`Profile picture for ${user.displayName}`}
                        style={{
                            width: '5.434782609vh',
                            height: '5.434782609vh',
                            marginRight: '3.8647343vw',
                        }}
                        src={'profilepic.svg'}
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
                        primary={
                            user.displayName != null
                                ? user.displayName
                                : user.username
                        }
                        secondary={
                            <div
                                style={{
                                    display: 'flex',
                                    width: '34.28%',
                                    height: '34.28%',
                                    fontSize: '1.902173913vh'
                                    alignItems: 'center',
                                }}
                            >
                                <ReactCountryFlag
                                    countryCode="US"
                                    style={{ marginRight: '7.614696363%' }}
                                    svg
                                />
                                {`@${user.username}`}
                            </div>
                        }
                        primaryTypographyProps={{
                            style: {
                                fontSize: '2.445652174vh',
                                fontWeight: '700',
                            },
                        }}
                    />
                </div>
            </div>
            <div className={classes.numberDisplay}>
                <ListItemText
                    id={labelId}
                    primary={pointsLabel}
                    primaryTypographyProps={{
                        style: {
                            fontFamily: 'Oswald',
                            fontSize: '2.445652174vh',
                        },
                    }}
                />
            </div>
        </ListItem>
    )
}
