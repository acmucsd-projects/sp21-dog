import { Color } from '../helpers/Color'
import Dropdown from './Dropdown'
import IconButton from '@material-ui/core/IconButton'
import LanguageIcon from '@material-ui/icons/Language'
import FilterListIcon from '@material-ui/icons/FilterList'

export default function Searchbar() {
    return (
        <div className="dropdown" style={{ backgroundColor: Color.accent }}>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <LanguageIcon style={{ color: Color.coreTheme }} />
            </IconButton>
            <Dropdown />
            <Dropdown />
            <IconButton aria-label="show 4 new mails" color="inherit">
                <FilterListIcon style={{ color: Color.coreTheme }} />
            </IconButton>
        </div>
    )
}
