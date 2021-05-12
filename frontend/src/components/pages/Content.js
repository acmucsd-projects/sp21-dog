import { useAppContext } from '../../contexts/AppContext'
import { Page } from '../../helpers/Page'
import { Color } from '../../helpers/Color'
import Journal from './journal/Journal'
import Leaderboards from './leaderboards/Leaderboards'
import Profile from './profile/Profile'
import Tasks from './tasks/Tasks'
import Home from './home/Home'
import Landing from './landing/Landing'
import TopNavigationBar from '../navs/TopNavigationBar'
import TopNavigationBarDesktop from '../navs/TopNavigationBarDesktop'
import BottomNavigationBar from '../navs/BottomNavigationBar'
import LeaderboardBottom from '../navs/LeaderboardBottom'
import Map from './map/Map'

export default function Content() {
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

    if (context.state.desktopView) {
        return (
            <>
                {!(context.state.page === Page.landing) && (
                    <TopNavigationBarDesktop />
                )}
                <div
                    className="content-wrapper"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#0094FF',
                        backgroundImage: 'url(/map.png)',
                    }}
                >
                    {context.state.page === Page.tasks ? (
                        <>
                            <Map />
                            <Tasks />
                        </>
                    ) : (
                        <div
                            style={{
                                backgroundColor: Color.primary,
                                borderRadius: '15px',
                                width: '50%',
                                height: '90%',
                            }}
                        >
                            {context.state.page === Page.landing && <Landing />}
                            {context.state.page === Page.profile && (
                                <div style={{ display: 'flex' }}>
                                    <Profile />
                                    <hr />
                                    <div
                                        className="content-wrapper"
                                        style={{ width: '50%', height: '90%' }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                            className="overflow-container"
                                        >
                                            <Leaderboards />
                                            <LeaderboardBottom />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {context.state.page === Page.home && (
                                <div style={{ display: 'flex' }}>
                                    <Home />
                                    <hr />
                                    <Journal />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>
        )
    }
    return (
        <>
            <TopNavigationBar />
            <div
                className="content-wrapper"
                style={{ backgroundColor: backgroundColor }}
            >
                {context.state.page === Page.landing && <Landing />}
                {context.state.page === Page.profile && <Profile />}
                {context.state.page === Page.leaderboards && <Leaderboards />}
                {context.state.page === Page.home && <Home />}
                {context.state.page === Page.tasks && <Tasks />}
                {context.state.page === Page.journal && <Journal />}
            </div>
            <BottomNavigationBar />
        </>
    )
}
