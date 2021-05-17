import { useAppContext } from '../../../contexts/AppContext'
import LinearDeterminate from './LinearDeterminate'
import StatsChart from '../../charts/StatsChart'

export default function ProfileContent() {
    const context = useAppContext()

    return (
        <div
            style={{
                height: '100%',
                fontFamily: 'PT Sans',
                fontSize: '2.173913043vh',
            }}
        >
            {context.state.bio.split('\n').map((str) => (
                <p>{str}</p>
            ))}
            <hr
                style={{
                    margin: '1.630434783vh 0',
                }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h3
                    style={{
                        fontSize: '2.445652174vh',
                        margin: '1.086956522vh 0',
                    }}
                >
                    Level 35
                </h3>
                <p
                    style={{
                        fontSize: '2.173913043vh',
                    }}
                >
                    30 Points to next level
                </p>
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
                <div
                    style={{
                        fontSize: '2.173913043vh',
                        textAlign: 'center',
                    }}
                >
                    <p>User since Apr 27, 2021</p>
                    <p>226 Total Points • 57 Tasks Completed</p>
                </div>
            </div>
        </div>
    )
}
