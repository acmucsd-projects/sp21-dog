import React from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CustomButton from '../../buttons/CustomButton'
import { useTempContext } from '../../../contexts/TempContext'
import ChangePasswordForm from './ChangePasswordForm'

const useStyles = makeStyles((theme) => ({
    formRoot: {
        '& > p': {
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

export default function SettingsForm({ setEditPasswordOpen }) {
    const classes = useStyles()
    const context = useAppContext()
    const tempContext = useTempContext()

    const [openPassword, setOpenPassword] = React.useState(false)

    const handleSave = () => {}

    React.useEffect(() => {
        tempContext.setState({
            email: context.state.email,
            password: context.state.password,
        })
    }, [])

    return (
        <>
            {openPassword ? (
                <ChangePasswordForm />
            ) : (
                <div className={classes.formRoot}>
                    <Typography>Email</Typography>
                    <TextField
                        id="email"
                        variant="outlined"
                        type="email"
                        required
                        value={tempContext.state.email}
                        onChange={(e) => {
                            tempContext.setState({
                                ...tempContext,
                                email: e.target.value,
                            })
                        }}
                    />
                    <Typography>Password</Typography>
                    <TextField
                        id="password"
                        variant="outlined"
                        type="password"
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <CustomButton
                                    type="settings"
                                    variant="secondary"
                                    inheritWidth={true}
                                    onClick={() => {
                                        setEditPasswordOpen(true)
                                    }}
                                >
                                    Change
                                </CustomButton>
                            ),
                        }}
                        value={tempContext.state.password}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <CustomButton
                            type="landing"
                            variant="warning"
                            halfWidth={true}
                            onClick={handleSave}
                        >
                            Log Out
                        </CustomButton>
                    </div>
                </div>
            )}
        </>
    )
}
