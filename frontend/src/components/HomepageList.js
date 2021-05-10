import HomepageListItem from './HomepageListItem'

export default function HomepageList() {
    const cardsOrder = ['nearbyTasks', 'streaks', 'journal', 'leaderboards']

    const listItems = cardsOrder.map((item, i) => {
        return <HomepageListItem type={item} style={{ marginBottom: '18px' }} />
    })

    return <div>{listItems}</div>
}
