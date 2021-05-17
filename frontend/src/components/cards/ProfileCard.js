import { Color } from '../../helpers/Color'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { useAppContext } from '../../contexts/AppContext'

const useStyles = makeStyles({
    dropdown: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: Color.primary,
        alignItems: 'center',
        fontFamily: 'PT Sans',
        width: '100%',
    },
    root: {
        minWidth: 275,
        width: '100%',
        height: '13.31521739vh',
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

export default function ProfileCard() {
    const classes = useStyles()
    const context = useAppContext()

    return (
        <div className={classes.dropdown}>
            <Card className={classes.root}>
                <CardContent
                    style={{
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        width: '10.19021739vh',
                                        height: '10.19021739vh',
                                        marginRight: '1.93236715vw',
                                    }}
                                    alt={`profile picture`}
                                    src={`/profilepic.svg`}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                id={0}
                                primary={context.state.displayName}
                                secondary={
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '50%',
                                            height: '50%',
                                        }}
                                    >
                                        <img
                                            className={classes.imageIcon}
                                            style={{
                                                height: '4.076086957vh',
                                                width: '4.076086957vh',
                                                marginRight: '1.93236715vw',
                                            }}
                                            src="/icons/nature.svg"
                                        />
                                        {`@${context.state.username}`}
                                    </div>
                                }
                                primaryTypographyProps={{
                                    style: {
                                        fontSize: '3.260869565vh',
                                        fontWeight: '700',
                                    },
                                }}
                                secondaryTypographyProps={{
                                    style: {
                                        fontSize: '2.445652174vh',
                                        color: Color.textColor,
                                    },
                                }}
                            />
                        </div>
                        <div
                            style={{
                                width: '7.7744565217vh',
                                height: '7.7744565217vh',
                                backgroundColor: Color.accent,
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '1.902173913vh',
                                    fontWeight: 'bold',
                                }}
                            >
                                Lv
                            </p>
                            <p
                                style={{
                                    fontSize: '3.260869565vh',
                                    fontWeight: 'bold',
                                }}
                            >
                                35
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
