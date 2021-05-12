import AvatarCard from '../../cards/AvatarCard'
import HomepageList from './HomepageList'

export default function Home({ style }) {
    return (
        <div style={{ width: '100%', ...style }}>
            <div style={{ margin: '10px' }}>
                <div style={{ marginBottom: '23px' }}>
                    <AvatarCard />
                </div>
                <HomepageList />
            </div>
        </div>
    )
}
