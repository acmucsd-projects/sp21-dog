import { monthName } from '../../../helpers/Utils'
import LinearDeterminate from './LinearDeterminate'
import StatsChart from '../../charts/StatsChart'

export default function ProfileContent({ data }) {
    if (data === undefined) {
        return <div></div>
    }

    let joinDate = new Date(data.joinDate)

    return (
        <div style={{ height: '100%', fontFamily: 'PT Sans, Trebuchet MS' }}>
            {data.bio != null && (
                <>
                    {data.bio.split('\n').map((str) => (
                        <p>{str}</p>
                    ))}
                    <hr style={{ margin: '12px 0' }} />
                </>
            )}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h3
                    style={{ fontSize: '18px', margin: '8px 0' }}
                >{`Level ${data.level}`}</h3>
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
                <StatsChart stats={data} />
                <div style={{ textAlign: 'center' }}>
                    <p>{`User since ${monthName(
                        joinDate.getMonth()
                    )} ${joinDate.getDay()}, ${joinDate.getFullYear()}`}</p>
                    <p>
                        {`${data.points} Total Points • ${data.tasksCompleted} Tasks
                        Completed`}
                    </p>
                </div>
            </div>
        </div>
    )
}
