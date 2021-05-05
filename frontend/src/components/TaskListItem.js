import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import CustomButton from './CustomButton'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        width: '9.95%',
        marginRight: '2%',
    },
}))

export default function TaskListItem() {
    const classes = useStyles()

    return (
        <Accordion>
            <AccordionSummary
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ListItemAvatar>
                            <Avatar
                                alt={`logo`}
                                src={`/icons/stats/nature.svg`}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            id={0}
                            primary={'Take a walk'}
                            secondary={'Emerald City Park'}
                            primaryTypographyProps={{
                                style: {
                                    fontSize: '18px',
                                    fontWeight: '700',
                                },
                            }}
                        />
                    </div>
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <p>5 pts</p>
                        <p>0.8 mi</p>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div style={{ width: '100%' }}>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <CustomButton type="tasks" variant="primary">
                            Share
                        </CustomButton>
                        <CustomButton type="tasks" variant="secondary">
                            View on Map
                        </CustomButton>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <div
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <img
                                    className={classes.imageIcon}
                                    src="/icons/stats/nature.svg"
                                />
                                <p>+5 Nature Pts</p>
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                }}
                            >
                                <img
                                    className={classes.imageIcon}
                                    src="/icons/stats/nature.svg"
                                />
                                <div>
                                    <p>15823 Fairfield Street</p>
                                    <p>Emerald City, EC 41852</p>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                            }}
                        >
                            <img
                                className={classes.imageIcon}
                                src="/icons/stats/nature.svg"
                            />
                            <p>0.8 miles away</p>
                        </div>
                    </div>
                    <Typography>
                        Go out and see the sunshine! Take a break from your
                        devices and enjoy what nature has to offer.
                    </Typography>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
