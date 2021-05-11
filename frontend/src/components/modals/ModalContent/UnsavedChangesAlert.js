import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CustomButton from '../../buttons/CustomButton'

const useStyles = makeStyles((theme) => ({
    formRoot: {
        '& > p': {
            fontSize: '18px',
            fontWeight: 'bold',
        },
    },
}))

export default function UnsavedChangesAlert({ setUnsavedOpen, closeAll }) {
    const classes = useStyles()

    return (
        <div className={classes.formRoot}>
            <Typography>
                Hey, you’re about to close this menu without saving. Are you
                sure?
            </Typography>
            <div style={{ display: 'flex' }}>
                <CustomButton
                    type="settings"
                    variant="warning"
                    onClick={() => {
                        closeAll()
                    }}
                >
                    Don't Save
                </CustomButton>
                <CustomButton
                    type="settings"
                    variant="secondary"
                    onClick={() => {
                        setUnsavedOpen(false)
                    }}
                >
                    Cancel
                </CustomButton>
            </div>
        </div>
    )
}
