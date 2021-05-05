import { Color } from '../helpers/Color'
import CustomButton from './CustomButton'
import CustomizedDialogs from './CustomizedDialogs'
import LinearDeterminate from './LinearDeterminate'

export default function Profile() {
    return (
        <div style={{ width: '100%', padding: '4.347826086%' }}>
            <div
                style={{
                    display: 'flex',
                }}
            >
                <CustomizedDialogs />
                <CustomButton type="settings" variant="secondary">
                    Edit Profile
                </CustomButton>
                <CustomButton type="settings" variant="secondary">
                    Settings
                </CustomButton>
            </div>
            <p>Hey there!!</p>
            <p>
                My name is Elizabeth and I love going out on adventures! When
                I’m not out hiking or mountain climbing, I like to hangout with
                friends at the park. Everyone should always enjoy nature at some
                point during their day!
            </p>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Level 35</h3>
                <p>30 Points to next level</p>
            </div>
            <LinearDeterminate />
            <div style={{ textAlign: 'center' }}>
                <p>User since Apr 27, 2021</p>
                <p>226 Total Points • 57 Tasks Completed</p>
            </div>
        </div>
    )
}
