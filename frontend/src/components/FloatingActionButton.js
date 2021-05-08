import Fab from '@material-ui/core/Fab'
import { Color } from '../helpers/Color'

export default function FloatingActionButton({ onClick, imgSrc }) {
    return (
        <Fab
            style={{ backgroundColor: Color.primary }}
            aria-label="map"
            onClick={onClick}
        >
            <div style={{ display: 'flex' }}>
                <img src={imgSrc} />
            </div>
        </Fab>
    )
}
