import { Color } from '../../helpers/Color'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import ReactCountryFlag from 'react-country-flag'

const useStyles = makeStyles({
    dropdown: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: Color.primary,
        alignItems: 'center',
        fontFamily: 'PT Sans, Trebuchet MS',
        width: '100%',
    },
    root: {
        minWidth: 275,
        width: '100%',
        height: '98px',
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

export default function ProfileCard({ data }) {
    const classes = useStyles()

    if (data === undefined) {
        return <div></div>
    }

    if (data === undefined) {
        return <div></div>
    }

    return (
        <div className={classes.dropdown}>
            <Card className={classes.root}>
                <CardContent style={{ width: '100%' }}>
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
                                        width: '88.13%',
                                        height: '88.13%',
                                    }}
                                    alt={`profile picture`}
                                    src={`/profilepic.svg`}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                id={0}
                                primary={
                                    data.displayName != null
                                        ? data.displayName
                                        : data.username
                                }
                                secondary={
                                    <div
                                        style={{
                                            display: 'flex',
                                            width: '50%',
                                            height: '50%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ReactCountryFlag
                                            countryCode="US"
                                            style={{
                                                marginRight: '7.614696363%',
                                            }}
                                            svg
                                        />
                                        {`@${data.username}`}
                                    </div>
                                }
                                primaryTypographyProps={{
                                    style: {
                                        fontSize: '24px',
                                        fontWeight: '700',
                                    },
                                }}
                                secondaryTypographyProps={{
                                    style: {
                                        fontSize: '18px',
                                        color: Color.textColor,
                                    },
                                }}
                            />
                        </div>
                        <div
                            style={{
                                width: '57px',
                                height: '57px',
                                backgroundColor: Color.accent,
                                borderRadius: '50%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Lv
                            </p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                {data.level}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
