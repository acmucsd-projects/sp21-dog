import { createMuiTheme } from '@material-ui/core/styles'
import { Color } from './Color'

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'PT Sans',
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
                transition: 0,
                flex: 0,
                width: '200px',
                height: '60px',
                minWidth: '45px',
                maxHeight: '45px',
                borderRadius: '50%',
                '&$selected': {
                    backgroundColor: Color.accent,

                    '& button': {
                        backgroundColor: Color.blue,
                    },
                },
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
        MuiListItem: {
            gutters: {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
        MuiListItemText: {
            root: {
                flex: 'none',
            },
        },
    },
})
