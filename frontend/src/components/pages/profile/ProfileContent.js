import { useAppContext } from '../../../contexts/AppContext'
import LinearDeterminate from './LinearDeterminate'
import StatsChart from '../../charts/StatsChart'

export default function ProfileContent({ data }) {
    const context = useAppContext()

    return (
        <div style={{ height: '100%', fontFamily: 'PT Sans' }}>
            {context.state.bio.split('\n').map((str) => (
                <p>{str}</p>
            ))}
            <hr style={{ margin: '12px 0' }} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h3 style={{ fontSize: '18px', margin: '8px 0' }}>Level 35</h3>
                <p>30 Points to next level</p>
            </div>
            <LinearDeterminate />
            <div
                style={{
                    height: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <StatsChart />
                <div style={{ textAlign: 'center' }}>
                    <p>User since Apr 27, 2021</p>
                    <p>226 Total Points • 57 Tasks Completed</p>
                </div>
            </div>
        </div>
    )
}
