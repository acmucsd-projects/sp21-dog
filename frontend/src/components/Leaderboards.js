import LeaderboardList from './LeaderboardList'
import { makeStyles } from '@material-ui/core/styles'
import { Color } from '../helpers/Color'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: Color.primary,
        width: '100%',
    },
}))

const Leaderboards = () => {
    const classes = useStyles()
    return (
        <div class="overflow-container">
            <div className={classes.root}>
                <LeaderboardList />
            </div>
        </div>
    )
}

export default Leaderboards
