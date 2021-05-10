import LeaderboardList from './LeaderboardList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const Leaderboards = () => {
    const classes = useStyles()
    return (
        <div class="overflow-container" style={{ margin: 0 }}>
            <div style={{ width: '100%' }}>
                <LeaderboardList />
            </div>
        </div>
    )
}

export default Leaderboards
