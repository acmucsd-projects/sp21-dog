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
    return (
        <>
            <CustomDialog
                type="filter"
                open={filterOpen}
                setOpen={setFilterOpen}
            />
            <CustomDialog type="sort" open={sortOpen} setOpen={setSortOpen} />
            <IconButton
                className={classes.wrapIconLeft}
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setSortOpen(true)}
            >
                <Icon>
                    <img src={'./icons/sort.svg'} />
                </Icon>
            </IconButton>
            <p>New Tasks in 23hr 59m</p>
            <IconButton
                className={classes.wrapIconRight}
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setFilterOpen(true)}
            >
                <Icon>
                    <img src={'./icons/filter.svg'} />
                </Icon>
            </IconButton>
        </>
    )
}
