import { useAppContext } from '../../contexts/AppContext'
import { Page } from '../../helpers/Page'
import { Color } from '../../helpers/Color'
import Journal from './journal/Journal'
import Leaderboards from './leaderboards/Leaderboards'
import Profile from './profile/Profile'
import Tasks from './tasks/Tasks'
import Home from './home/Home'
import Landing from './landing/Landing'
import { usePageContext } from '../../contexts/PageContext'

const Content = () => {
    const pageContext = usePageContext()

    let backgroundColor = Color.primary
    if (pageContext.state.page === Page.tasks) {
        if (pageContext.state.mapOpen) {
            backgroundColor = Color.primary
        } else {
            backgroundColor = Color.coreTheme
        }
    } else if (pageContext.state.page === Page.home) {
        backgroundColor = Color.accent
    }

    return (
        <div
            className="content-wrapper"
            style={{ backgroundColor: backgroundColor }}
        >
            {pageContext.state.page === Page.landing && <Landing />}
            {pageContext.state.page === Page.profile && <Profile />}
            {pageContext.state.page === Page.leaderboards && <Leaderboards />}
            {pageContext.state.page === Page.home && <Home />}
            {pageContext.state.page === Page.tasks && <Tasks />}
            {pageContext.state.page === Page.journal && <Journal />}
        </div>
    )
}

export default Content
