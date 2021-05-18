import GreetingCard from '../../cards/GreetingCard'
import HomepageList from './HomepageList'

export default function Home() {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ margin: '10px' }}>
                <div style={{ marginBottom: '23px' }}>
                    <GreetingCard />
                </div>
                <HomepageList />
            </div>
        </div>
    )
}
