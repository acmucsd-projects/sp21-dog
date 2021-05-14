import CustomButton from '../../buttons/CustomButton'
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

export default function JournalForm() {
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
                <Typography>Period</Typography>
                <div style={{ display: 'flex' }}>
                    <CustomButton type="search" selected={true}>
                        Week
                    </CustomButton>
                    <CustomButton type="search">Month</CustomButton>
                    <CustomButton type="search">Year</CustomButton>
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
                    <CustomButton type="search">Tasks</CustomButton>
                    <CustomButton type="search" selected={true}>
                        Points
                    </CustomButton>
                </div>
            </div>
        </>
    )
}
