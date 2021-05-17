import Fab from '@material-ui/core/Fab'
import { Color } from '../../helpers/Color'

export default function FloatingActionButton({ onClick, imgSrc, style }) {
    return (
        <Fab
            style={{ ...style, backgroundColor: Color.primary }}
            aria-label="map"
            onClick={onClick}
        >
            <img
                src={imgSrc}
                style={{ width: '4.076086957vh', height: '4.076086957vh' }}
            />
        </Fab>
    )
}
