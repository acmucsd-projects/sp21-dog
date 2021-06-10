import { Page } from '../../helpers/Page'
import { Color } from '../../helpers/Color'
import Journal from './journal/Journal'
import Leaderboards from './leaderboards/Leaderboards'
import Profile from './profile/Profile'
import Tasks from './tasks/Tasks'
import Home from './home/Home'
import Landing from './landing/Landing'
import BottomNavigationBar from '../navs/BottomNavigationBar'
import TopNavigationBar from '../navs/TopNavigationBar'
import { usePageContext } from '../../contexts/PageContext'

const Content = () => {
    const pageContext = usePageContext()

    let backgroundColor = Color.primary

    let backgroundStyle = {
        backgroundImage: 'url(/Map.png)',
        backgroundSize: 'cover',
        backgroundColor: Color.coreTheme,
    }
    if (pageContext.state.page !== Page.landing) {
        if (pageContext.state.page === Page.tasks) {
            if (pageContext.state.mapOpen) {
                backgroundColor = Color.primary
            } else {
                backgroundColor = Color.coreTheme
            }
        } else if (pageContext.state.page === Page.home) {
            backgroundColor = Color.accent
        }
        backgroundStyle = { backgroundColor: backgroundColor }
    }

    return (
        <div style={{ height: '100%' }}>
            {pageContext.state.page !== Page.landing && <TopNavigationBar />}
            <div className="main-container" style={backgroundStyle}>
                <div
                    className={
                        pageContext.state.mapOpen
                            ? 'content-wrapper'
                            : 'content-wrapper content-wrapper-maxWidth'
                    }
                >
                    {pageContext.state.page === Page.landing && <Landing />}
                    {pageContext.state.page === Page.profile && <Profile />}
                    {pageContext.state.page === Page.leaderboards && (
                        <Leaderboards />
                    )}
                    {pageContext.state.page === Page.home && <Home />}
                    {pageContext.state.page === Page.tasks && <Tasks />}
                    {pageContext.state.page === Page.journal && <Journal />}
                </div>
            </div>
            {pageContext.state.page !== Page.landing && <BottomNavigationBar />}
        </div>
    )
}

export default Content
