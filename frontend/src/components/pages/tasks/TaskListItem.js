import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import CustomButton from '../../buttons/CustomButton'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        width: '2.445652714vh',
        height: '2.445652714vh',
        marginRight: '2%',
    },
}))

export default function TaskListItem({ mapView, style }) {
    const classes = useStyles()
    let margin = '2.038043478vh 0'
    if (mapView) {
        margin = '1.086956522vh'
    }

    return (
        <Accordion style={{ margin: margin }}>
            <AccordionSummary
                style={{
                    padding: '0px 3.8647343vw',
                    height: 'auto',
                }}
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
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    height: '5.434782609vh',
                                    width: '5.434782609vh',
                                    marginRight: '3.8647343vw',
                                }}
                                alt={`logo`}
                                src={`/icons/nature.svg`}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            id={0}
                            primary={'Take a walk'}
                            secondary={'Emerald City Park'}
                            primaryTypographyProps={{
                                style: {
                                    fontSize: '2.445652174vh',
                                    fontWeight: '700',
                                },
                            }}
                            secondaryTypographyProps={{
                                style: {
                                    fontSize: '1.902173913vh',
                                },
                            }}
                        />
                    </div>
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <p style={{ fontSize: '2.173913043vh' }}>5 pts</p>
                        <p style={{ fontSize: '2.173913043vh' }}>0.8 mi</p>
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
                        {!mapView && (
                            <CustomButton type="tasks" variant="secondary">
                                View on Map
                            </CustomButton>
                        )}
                    </div>
                    <div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                height: '100%',
                                marginBottom: '2%',
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '4%',
                                    }}
                                >
                                    <img
                                        className={classes.imageIcon}
                                        src="/icons/nature.svg"
                                    />
                                    <p
                                        style={{
                                            fontSize: '2.173913043vh',
                                        }}
                                    >
                                        +5 Nature Pts
                                    </p>
                                </div>

                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        className={classes.imageIcon}
                                    >
                                        <img
                                            src="/icons/map.svg"
                                            style={{
                                                width: '70%',
                                                height: '70%',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                fontSize: '2.173913043vh',
                                            }}
                                        >
                                            15823 Fairfield Street
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '2.173913043vh',
                                            }}
                                        >
                                            Emerald City, EC 41852
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    height: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    className={classes.imageIcon}
                                >
                                    <img
                                        src="/icons/location.svg"
                                        style={{
                                            width: '70%',
                                            height: '70%',
                                        }}
                                    />
                                </div>
                                <p
                                    style={{
                                        fontSize: '2.173913043vh',
                                    }}
                                >
                                    0.8 miles away
                                </p>
                            </div>
                        </div>
                        <Typography
                            style={{
                                fontSize: '2.173913043vh',
                            }}
                        >
                            Go out and see the sunshine! Take a break from your
                            devices and enjoy what nature has to offer.
                        </Typography>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}
