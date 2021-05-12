import CustomDialog from '../../modals/CustomDialog'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Color } from '../../../helpers/Color'
import CustomIconButton from '../../buttons/CustomIconButton'
import Icon from '@material-ui/core/Icon'

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
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => setViewOpen(true)}
            >
                <VisibilityIcon
                    className={classes.icon}
                    style={{ color: Color.coreTheme }}
                />
            </IconButton>
            <select
                className={classes.select}
                defaultValue="Points"
                name="3242"
                id="g"
            >
                <option value="po">Points</option>
                <option value="fs">Tasks</option>
            </select>
            <div className={classes.middle}></div>
            <select
                className={classes.select}
                defaultValue="All Time"
                name="gfd"
                id="f"
            >
                <option value="fs">All Time</option>
                <option value="">This Year</option>
                <option value="">This Month</option>
                <option value="">This Week</option>
            </select>
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
