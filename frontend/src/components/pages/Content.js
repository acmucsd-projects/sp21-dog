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
import ProfileCard from '../cards/ProfileCard'
import SearchbarLeaderboards from '../navs/SearchbarContent/SearchbarLeaderboards'
import Searchbar from '../navs/Searchbar'
import TaskList from './tasks/TasksList'

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
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#0094FF',
                        backgroundImage: 'url(/map.png)',
                    }}
                >
                    {context.state.page === Page.tasks ? (
                        <>
                            <Map />

                            <div
                                style={{
                                    position: 'absolute',
                                    top: '10%',
                                    right: '0%',
                                    width: '40%',
                                    height: '50%',
                                }}
                            >
                                <Searchbar />
                                <Tasks />
                            </div>
                        </>
                    ) : (
                        <div
                            style={{
                                backgroundColor: Color.primary,
                                borderRadius: '15px',

                                margin: '3% 3%',
                                padding: '1%',
                            }}
                            className="content-wrapper"
                        >
                            {context.state.page === Page.landing && <Landing />}
                            {context.state.page === Page.profile && (
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <Profile />
                                    <hr />
                                    <div
                                        style={{
                                            flexDirection: 'column',
                                        }}
                                        className="content-wrapper"
                                    >
                                        <Searchbar />

                                        <div className="overflow-container">
                                            <Leaderboards />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {context.state.page === Page.home && (
                                <div style={{ display: 'flex', width: '100%' }}>
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
