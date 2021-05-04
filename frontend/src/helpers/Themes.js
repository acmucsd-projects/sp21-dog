import { createMuiTheme } from '@material-ui/core/styles'
import { Color } from './Color'

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'PT Sans',
    },
    overrides: {
        MuiAppBar: {
            root: {
                height: '8.152173913%',
                fontWeight: 'bold',
            },
            colorPrimary: {
                backgroundColor: Color.primary,
                color: Color.textColor,
            },
        },
        MuiBottomNavigation: {
            root: {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            },
        },
        MuiBottomNavigationAction: {
            root: {
                transition: 0,
                flex: 0,
                height: '100%',
                minWidth: '10.869565217%',
                maxHeight: '80.357142857%',
                borderRadius: '25px',
                '&$selected': {
                    backgroundColor: Color.accent,

                    '& button': {
                        backgroundColor: Color.blue,
                    },
                },
                '& span': {
                    width: 'auto',
                    height: '100%',
                    '& div': {
                        width: 'auto',
                        height: '80.67%',
                    },
                },
            },
            wrapper: {
                display: 'flex',
                flexDirection: 'row',
            },
            label: {
                textTransform: 'capitalize',
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
