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
        MuiBottomNavigation: {
            root: {
                display: 'flex',
                alignItems: 'center',
            },
        },
        MuiBottomNavigationAction: {
            root: {
                minWidth: '45px',
                maxHeight: '45px',
                transition: 0,
                flex: 0,
            },
            label: {
                textTransform: 'capitalize',
            },
            wrapper: {},
        },
        MuiSvgIcon: {
            root: {
                fontSize: '44px',
            },
        },
        MuiSvgIcon: {
            root: {
                fontSize: '44px',
            },
        },
    },
})
