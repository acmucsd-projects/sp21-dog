import CustomButton from '../../buttons/CustomButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useTempContext } from '../../../contexts/TempContext'

const useStyles = makeStyles((theme) => ({
    formRoot: {
        '& > p': {
            fontSize: '18px',
            fontWeight: 'bold',
        },
    },
}))

export default function JournalForm({ keyName }) {
    const classes = useStyles()
    const tempContext = useTempContext()
    const periodOptions = ['week', 'month', 'year', 'all']
    const displayDataOptions = ['tasks', 'points']

    const handlePeriodToggle = (i) => {
        tempContext.setState({
            ...tempContext.state,
            [keyName]: {
                ...tempContext.state[keyName],
                view: {
                    ...tempContext.state[keyName].view,
                    timePeriod: periodOptions[i],
                },
            },
        })
    }

    const handleDisplayDataToggle = (i) => {
        tempContext.setState({
            ...tempContext.state,
            [keyName]: {
                ...tempContext.state[keyName],
                view: {
                    ...tempContext.state[keyName].view,
                    displayData: displayDataOptions[i],
                },
            },
        })
    }

    return (
        <>
            <div
                className={classes.formRoot}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography>Period</Typography>
                <div style={{ display: 'flex' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '8px',
                        }}
                    >
                        <div style={{ display: 'flex' }}>
                            <CustomButton
                                type="search"
                                selected={
                                    periodOptions[0] ===
                                    tempContext.state[keyName].view.timePeriod
                                }
                                onClick={() => {
                                    handlePeriodToggle(0)
                                }}
                            >
                                {periodOptions[0]}
                            </CustomButton>
                            <CustomButton
                                type="search"
                                selected={
                                    periodOptions[1] ===
                                    tempContext.state[keyName].view.timePeriod
                                }
                                onClick={() => {
                                    handlePeriodToggle(1)
                                }}
                            >
                                {periodOptions[1]}
                            </CustomButton>
                            <CustomButton
                                type="search"
                                selected={
                                    periodOptions[2] ===
                                    tempContext.state[keyName].view.timePeriod
                                }
                                onClick={() => {
                                    handlePeriodToggle(2)
                                }}
                            >
                                {periodOptions[2]}
                            </CustomButton>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <CustomButton
                                type="search"
                                selected={
                                    periodOptions[3] ===
                                    tempContext.state[keyName].view.timePeriod
                                }
                                onClick={() => {
                                    handlePeriodToggle(3)
                                }}
                            >
                                {periodOptions[3]}
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={classes.formRoot}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography>Display Data</Typography>
                <div style={{ display: 'flex' }}>
                    <CustomButton
                        type="search"
                        selected={
                            displayDataOptions[0] ===
                            tempContext.state[keyName].view.displayData
                        }
                        onClick={() => {
                            handleDisplayDataToggle(0)
                        }}
                    >
                        {displayDataOptions[0]}
                    </CustomButton>
                    <CustomButton
                        type="search"
                        selected={
                            displayDataOptions[1] ===
                            tempContext.state[keyName].view.displayData
                        }
                        onClick={() => {
                            handleDisplayDataToggle(1)
                        }}
                    >
                        {displayDataOptions[1]}
                    </CustomButton>
                </div>
            </div>
        </>
    )
}
