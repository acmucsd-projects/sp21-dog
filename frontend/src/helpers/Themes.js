import { createMuiTheme } from '@material-ui/core/styles'
import { Color } from './Color'

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Oswald',
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: Color.primary,
                color: Color.textColor,
            },
            root: {
                fontWeight: 'bold',
            },
        },
        MuiBottomNavigationAction: {
            label: {
                textTransform: 'capitalize',
            },
        },
    },
})
