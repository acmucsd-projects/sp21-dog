import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { usePageContext } from '../../../contexts/PageContext'
import { Page } from '../../../helpers/Page'
import CustomButton from '../../buttons/CustomButton'

const useStyles = makeStyles((theme) => ({
    formRoot: {
        '& > p': {
            fontSize: '18px',
            fontWeight: 'bold',
        },
    },
}))

export default function LogoutAlert({ setLogoutAlertOpen, closeAll }) {
    const classes = useStyles()
    const pageContext = usePageContext()

    const logout = () => {
        pageContext.setState({
            ...pageContext.state,
            page: Page.landing,
        })
    }

    return (
        <div className={classes.formRoot}>
            <Typography>Hey, you’re about to log out. Are you sure?</Typography>
            <div style={{ display: 'flex' }}>
                <CustomButton
                    type="settings"
                    variant="warning"
                    onClick={() => {
                        logout()
                        closeAll()
                    }}
                >
                    Log Out
                </CustomButton>
                <CustomButton
                    type="settings"
                    variant="secondary"
                    onClick={() => {
                        setLogoutAlertOpen(false)
                    }}
                >
                    Cancel
                </CustomButton>
            </div>
        </div>
    )
}
