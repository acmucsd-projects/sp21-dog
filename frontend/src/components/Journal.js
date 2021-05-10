import React from 'react'
import { useAppContext } from '../contexts/AppContext'
import CustomButton from './CustomButton'
import LinearDeterminate from './LinearDeterminate'
import CustomDialog from './CustomDialog'
import StatsChart from './StatsChart'
import { Color } from '../helpers/Color'

export default function Journal() {
    const [editProfileOpen, setEditProfileOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const context = useAppContext()

    return (
        <div
            style={{
                width: '100%',
                padding: '4.347826086%',
                overflow: 'hidden',
            }}
            className="overflow-container"
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <StatsChart />
            </div>
            <hr style={{ margin: '12px 0' }} />
        </div>
    )
}
