import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: '15px',
        width: '100%',
        height: '75px',
        display: 'flex',
        alignItems: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
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
                        primary={'Good morning, Elizabeth!'}
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
