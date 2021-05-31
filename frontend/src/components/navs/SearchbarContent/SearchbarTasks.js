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

export default function SearchbarTasks({ classes }) {
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)

    const currentTime = new Date(Date.now())

    return (
        <>
            <CustomDialog
                type="filter"
                open={filterOpen}
                setOpen={setFilterOpen}
                keyName="tasksOptions"
            />
            <CustomDialog
                type="sort"
                open={sortOpen}
                setOpen={setSortOpen}
                keyName="tasksOptions"
            />
            <IconButton
                className={classes.wrapIconLeft}
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setSortOpen(true)}
            >
                <img className={classes.icon} src={'./icons/sort.svg'} />
            </IconButton>
            <div
                style={{
                    width: '100%',
                    fontSize: '2.173913043vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p>{`New Tasks in ${23 - currentTime.getHours()}hr ${
                60 - currentTime.getMinutes()
            }m`}</p>
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
