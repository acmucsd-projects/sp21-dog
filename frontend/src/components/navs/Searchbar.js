import { Color } from '../../helpers/Color'
import CustomDialog from '../modals/CustomDialog'
import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import LanguageIcon from '@material-ui/icons/Language'
import FilterListIcon from '@material-ui/icons/FilterList'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    dropdown: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: Color.accent,
        alignItems: 'center',
        width: '100%',
        // boxShadow:
        //     '0px 2px 4px 1px rgb(0 0 0 / 20%),' +
        //     '0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    },
    select: {
        width: 'auto',
        height: '30px',
        border: 'none',
        padding: '2px 0px',
        backgroundColor: Color.accent,
        fontSize: '18px',
        textAlign: 'center',
        fontFamily: 'Trebuchet MS',
    },
    icon: {
        height: '26px',
        width: '26px',
    },
    wrapIconRight: {
        padding: '6px 6px',
        borderRadius: '0px;',
        borderLeft: 'solid 1px',
    },
    wrapIconLeft: {
        borderRadius: '0px;',
        borderRight: 'solid 1px',
        padding: '6px 6px',
    },
    middle: {
        width: '1px',
        height: '100%',
        borderRight: 'solid 1px',
    },
})
export default function Searchbar() {
    const classes = useStyles()
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    return (
        <div className={classes.dropdown}>
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
            >
                <LanguageIcon
                    className={classes.icon}
                    style={{ color: Color.coreTheme }}
                />
            </IconButton>
            <select
                className={classes.select}
                defaultValue="Points"
                name="3242"
                id="g"
                // onClick={() => setSortOpen(true)}
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
                // onClick={() => setFilterOpen(true)}
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
            >
                <FilterListIcon
                    className={classes.icon}
                    style={{ color: Color.coreTheme }}
                />
            </IconButton>
        </div>
    )
}
