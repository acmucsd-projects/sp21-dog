import { Color } from '../../helpers/Color'
import { Page } from '../../helpers/Page'
import { makeStyles } from '@material-ui/core/styles'
import SearchbarLeaderboards from './SearchbarContent/SearchbarLeaderboards'
import SearchbarJournal from './SearchbarContent/SearchbarJournal'
import SearchbarTasks from './SearchbarContent/SearchbarTasks'
import { useAppContext } from '../../contexts/AppContext'
const useStyles = makeStyles({
    dropdown: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: Color.accent,
        alignItems: 'center',
        width: '100%',
    },
    select: {
        width: 'auto',
        height: '30px',
        border: 'none',
        padding: '2px 0px',
        backgroundColor: Color.accent,
        fontSize: '18px',
        textAlign: 'center',
        fontFamily: 'Trebuchet MS',
    },
    icon: {
        height: '26px',
        width: '26px',
    },
    wrapIconRight: {
        padding: '6px 6px',
        borderRadius: '0px;',
        borderLeft: 'solid 1px',
    },
    wrapIconLeft: {
        borderRadius: '0px;',
        borderRight: 'solid 1px',
        padding: '6px 6px',
    },
    middle: {
        width: '1px',
        height: '100%',
        borderRight: 'solid 1px',
    },
})
export default function Searchbar() {
    const classes = useStyles()
    const context = useAppContext()
    return (
        <div className={classes.dropdown}>
            {context.state.page === Page.leaderboards && (
                <SearchbarLeaderboards classes={classes} />
            )}
            {context.state.page === Page.journal && (
                <SearchbarJournal classes={classes} />
            )}
            {context.state.page === Page.tasks && !context.state.mapOpen && (
                <SearchbarTasks classes={classes} />
            )}
        </div>
    )
}
