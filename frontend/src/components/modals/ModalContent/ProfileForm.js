import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
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
    const context = useAppContext()
    const tempContext = useTempContext()

    const regions = ['United States', 'Canada']
    const regionMenuItems = regions.map((item, i) => (
        <MenuItem value={i}>{item}</MenuItem>
    ))

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
            <Typography>Region</Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    labelId="region-label"
                    id="region"
                    value={regions.indexOf(tempContext.state.region)}
                    onChange={(e) =>
                        tempContext.setState({
                            ...tempContext.state,
                            region: regions[e.target.value],
                        })
                    }
                    label="Region"
                >
                    {regionMenuItems}
                </Select>
            </FormControl>
            <Typography>Bio</Typography>
            <TextField
                id="bio"
                variant="outlined"
                multiline
                rows={10}
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
