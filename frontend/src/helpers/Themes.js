import { createMuiTheme } from '@material-ui/core/styles'
import { Color } from './Color'

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Oswald',
    },
    overrides: {
        MuiAppBar: {
            root: {
                fontWeight: 'bold',
            },
            colorPrimary: {
                backgroundColor: Color.primary,
                color: Color.textColor,
            },
        },
        MuiBottomNavigationAction: {
            root: {
                minWidth: '40px',
            },
            label: {
                textTransform: 'capitalize',
            },
        },
        MuiSvgIcon: {
            root: {
                fontSize: '44px',
            },
        },
        MuiBottomNavigationAction: {
            label: {
                textTransform: 'capitalize',
            },
        },
    },
})
