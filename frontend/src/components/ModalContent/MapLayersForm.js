import CustomButton from '../CustomButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    formRoot: {
        '& > p': {
            fontSize: '18px',
            fontWeight: 'bold',
        },
    },
}))

export default function MapLayersForm() {
    const classes = useStyles()

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
                    <CustomButton type="search" selected={true}>
                        Hybrid
                    </CustomButton>
                    <CustomButton type="search">Satelite</CustomButton>
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
