import { useAppContext } from '../../contexts/AppContext'
import { Page } from '../../helpers/Page'
import { Color } from '../../helpers/Color'
import Journal from './journal/Journal'
import Leaderboards from './leaderboards/Leaderboards'
import Profile from './profile/Profile'
import Tasks from './tasks/Tasks'
import Home from './home/Home'
import Landing from './landing/Landing'

const Content = () => {
    const context = useAppContext()

    let backgroundColor = Color.primary
    if (context.state.page === Page.tasks) {
        if (context.state.mapOpen) {
            backgroundColor = Color.primary
        } else {
            backgroundColor = Color.coreTheme
        }
    } else if (context.state.page === Page.home) {
        backgroundColor = Color.accent
    }

    return (
        <div
            class="content-wrapper"
            style={{ backgroundColor: backgroundColor }}
        >
            {context.state.page === Page.landing && <Landing />}
            {context.state.page === Page.profile && <Profile />}
            {context.state.page === Page.leaderboards && <Leaderboards />}
            {context.state.page === Page.home && <Home />}
            {context.state.page === Page.tasks && <Tasks />}
            {context.state.page === Page.journal && <Journal />}
        </div>
    )
}

export default Content
