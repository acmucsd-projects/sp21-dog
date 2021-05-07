import { useAppContext } from '../contexts/AppContext'
import { Page } from '../helpers/Page'
import { Color } from '../helpers/Color'
import Journal from './Journal'
import Leaderboards from './Leaderboards'
import Map from './Map'
import Profile from './Profile'
import Tasks from './Tasks'
import Home from './Home'

const Content = () => {
    const context = useAppContext()

    let backgroundColor = Color.primary
    if (context.state.page === Page.tasks) {
        backgroundColor = Color.coreTheme
    }

    return (
        <div
            class="content-wrapper"
            style={{ backgroundColor: backgroundColor }}
        >
            {context.state.page === Page.profile && <Profile />}
            {context.state.page === Page.leaderboards && <Leaderboards />}
            {context.state.page === Page.home && <Home />}
            {context.state.page === Page.tasks && <Tasks />}
            {context.state.page === Page.journal && <Journal />}
        </div>
    )
}

export default Content
