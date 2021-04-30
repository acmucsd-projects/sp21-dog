import { useAppContext } from '../contexts/AppContext'
import { Page } from '../helpers/Page'
import Journal from './Journal'
import Leaderboards from './Leaderboards'
import Map from './Map'
import Profile from './Profile'
import Tasks from './Tasks'

const Content = () => {
    const context = useAppContext()
    return (
        <>
            {context.state.page == Page.profile && <Profile />}
            {context.state.page == Page.journal && <Journal />}
            {context.state.page == Page.tasks && <Tasks />}
            {context.state.page == Page.map && <Map />}
            {context.state.page == Page.leaderboards && <Leaderboards />}
        </>
    )
}

export default Content
