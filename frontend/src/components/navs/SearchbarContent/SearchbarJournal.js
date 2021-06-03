import CustomDialog from '../../modals/CustomDialog'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Color } from '../../../helpers/Color'
import Icon from '@material-ui/core/Icon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

export default function SearchbarJournal({ classes }) {
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)
    return (
        <>
            <CustomDialog
                type="calendar"
                open={calendarOpen}
                setOpen={setCalendarOpen}
            />
            <CustomDialog
                type="view"
                open={viewOpen}
                setOpen={setViewOpen}
                keyName={'journalOptions'}
            />
            <IconButton
                className={classes.wrapIconLeft}
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setViewOpen(true)}
            >
                <VisibilityIcon
                    className={classes.icon}
                    style={{ color: Color.coreTheme }}
                />
            </IconButton>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <ChevronLeftIcon />
                <p>Last Week (Apr 18 - 24)</p>
                <ChevronRightIcon />
            </div>
            <IconButton
                className={classes.wrapIconRight}
                color="inherit"
                //onClick={() => setCalendarOpen(true)}
            >
                <Icon>
                    <img src={'./icons/calendar.svg'} />
                </Icon>
            </IconButton>
        </>
    )
}
