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

export default function MapLayersForm({ keyName }) {
    const classes = useStyles()
    const tempContext = useTempContext()
    const mapTypeOptions = ['hybrid', 'satelite']

    const handleMapTypeToggle = (i) => {
        tempContext.setState({
            ...tempContext.state,
            [keyName]: {
                ...tempContext.state[keyName],
                mapLayers: {
                    ...tempContext.state[keyName].mapLayers,
                    mapType: mapTypeOptions[i],
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
                <Typography>Map Type</Typography>
                <div style={{ display: 'flex' }}>
                    <CustomButton
                        type="search"
                        selected={
                            mapTypeOptions[0] ===
                            tempContext.state[keyName].mapLayers.mapType
                        }
                        onClick={() => {
                            handleMapTypeToggle(0)
                        }}
                    >
                        {mapTypeOptions[0]}
                    </CustomButton>
                    <CustomButton
                        type="search"
                        selected={
                            mapTypeOptions[1] ===
                            tempContext.state[keyName].mapLayers.mapType
                        }
                        onClick={() => {
                            handleMapTypeToggle(1)
                        }}
                    >
                        {mapTypeOptions[1]}
                    </CustomButton>
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
                <Typography>Filter By</Typography>
                <CustomButton type="search" halfWidth={true}>
                    Task Type...
                </CustomButton>
            </div>
        </>
    )
}
