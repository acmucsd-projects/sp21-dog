import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CustomButton from '../../buttons/CustomButton'
import { useTempContext } from '../../../contexts/TempContext'

const useStyles = makeStyles((theme) => ({
    formRoot: {
        '& > p': {
            fontSize: '18px',
            fontWeight: 'bold',
        },
        '& > div': {
            width: '100%',
            marginBottom: '3.454894433%',
        },
        '& > div:last-child': {
            marginBottom: 0,
        },
    },
}))

export default function ProfileForm() {
    const classes = useStyles()
    const tempContext = useTempContext()

    return (
        <div className={classes.formRoot}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    Profile Icon
                </Typography>
                <div style={{ display: 'flex' }}>
                    <CustomButton
                        type="settings"
                        variant="secondary"
                        noVerticalMargin={true}
                    >
                        Change
                    </CustomButton>
                    <CustomButton
                        type="settings"
                        variant="secondary"
                        noVerticalMargin={true}
                    >
                        Remove
                    </CustomButton>
                </div>
            </div>
            <Typography>Display Name</Typography>
            <TextField
                id="display-name"
                variant="outlined"
                required
                value={tempContext.state.displayName}
                onChange={(e) => {
                    tempContext.setState({
                        ...tempContext.state,
                        displayName: e.target.value,
                    })
                }}
            />
            <Typography>Username</Typography>
            <TextField
                id="username"
                variant="outlined"
                required
                value={tempContext.state.username}
                onChange={(e) =>
                    tempContext.setState({
                        ...tempContext.state,
                        username: e.target.value,
                    })
                }
            />
            <Typography>Bio</Typography>
            <TextField
                id="bio"
                variant="outlined"
                multiline
                rows={10}
                required
                value={tempContext.state.bio}
                onChange={(e) =>
                    tempContext.setState({
                        ...tempContext.state,
                        bio: e.target.value,
                    })
                }
            />
        </div>
    )
}
