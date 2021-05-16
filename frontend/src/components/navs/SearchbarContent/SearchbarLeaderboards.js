import CustomDialog from '../../modals/CustomDialog'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Color } from '../../../helpers/Color'
import CustomIconButton from '../../buttons/CustomIconButton'
import Icon from '@material-ui/core/Icon'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

export default function SearchbarLeaderboards({ classes }) {
    const [filterOpen, setFilterOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)

    return (
        <>
            <CustomDialog
                type="filter"
                open={filterOpen}
                setOpen={setFilterOpen}
                keyName="leaderboardOptions"
            />
            <CustomDialog
                type="view"
                open={viewOpen}
                setOpen={setViewOpen}
                keyName="leaderboardOptions"
            />
            <IconButton
                className={classes.wrapIconLeft}
                color="inherit"
                onClick={() => setViewOpen(true)}
            >
                <img className={classes.icon} src={'./icons/view.svg'} />
            </IconButton>
            <div
                style={{
                    width: '100%',
                    fontSize: '2.173913043vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <ChevronLeftIcon className={classes.arrow} />
                <p>Last Week (Apr 18 - 24)</p>
                <ChevronRightIcon className={classes.arrow} />
            </div>
            <IconButton
                className={classes.wrapIconRight}
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setFilterOpen(true)}
            >
                <img className={classes.icon} src={'./icons/filter.svg'} />
            </IconButton>
        </>
    )
}
