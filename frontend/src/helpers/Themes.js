import { createMuiTheme } from '@material-ui/core/styles'
import { Color } from './Color'

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'PT Sans, Trebuchet MS',
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
                flexDirection: 'row',
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
        MuiButton: {
            root: {
                lineHeight: '35px',
            },
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: '18px',
                backgroundColor: Color.primary,
            },
        },
        MuiDialogTitle: {
            root: {
                padding: '0 0 0 18px !important',
                '& h6': {
                    fontSize: '36px',
                    fontFamily: 'Oswald',
                    textTransform: 'capitalize',
                },
            },
        },
        MuiDialog: {
            paper: {
                borderRadius: '15px',
                width: '86.714975845%',
            },
        },
        MuiAccordion: {
            root: {
                backgroundColor: Color.background,
            },
            rounded: {
                borderRadius: '20px',
            },
        },
        MuiAccordionSummary: {
            root: {
                backgroundColor: Color.primary,
                borderRadius: '20px',
            },
        },
        MuiCardContent: {
            root: {
                padding: '0 12px',
                '&:last-child': {
                    paddingBottom: 0,
                },
            },
        },
    },
})
