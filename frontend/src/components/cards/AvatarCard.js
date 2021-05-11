import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { useAppContext } from '../../contexts/AppContext'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        width: '100%',
        height: '75px',
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

export default function AvatarCard() {
    const classes = useStyles()
    const context = useAppContext()

    return (
        <Card className={classes.root}>
            <CardContent>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <ListItemAvatar>
                        <Avatar alt={`sun`} src={`/icons/sun.svg`} />
                    </ListItemAvatar>
                    <ListItemText
                        id={0}
                        primary={`Good morning, ${context.state.displyName}!`}
                        secondary={'Ready to kick start the day?'}
                        primaryTypographyProps={{
                            style: {
                                fontSize: '18px',
                                fontWeight: '700',
                            },
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
