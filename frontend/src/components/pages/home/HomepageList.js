import { useAppContext } from '../../../contexts/AppContext'
import HomepageListItem from './HomepageListItem'

export default function HomepageList() {
    const cardsOrder = ['nearbyTasks', 'streaks', 'journal', 'leaderboards']
    const context = useAppContext()

    const listItems = cardsOrder.map((item, i) => {
        return (
            <HomepageListItem
                key={i}
                type={item}
                style={{ marginBottom: '18px' }}
            />
        )
    })

    if (context.state.desktopView) {
        return (
            <>
                <div style={{ display: 'flex' }}>{listItems[0]}</div>
                <div style={{ display: 'flex' }}>
                    {listItems[1]}
                    {listItems[2]}
                </div>
                <div style={{ display: 'flex' }}>{listItems[3]}</div>
            </>
        )
    }

    return <div>{listItems}</div>
}
