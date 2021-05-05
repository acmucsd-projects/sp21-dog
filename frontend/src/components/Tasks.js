import { Color } from '../helpers/Color'
import TasksList from './TasksList'

const Tasks = () => {
    return (
        <div style={{ backgroundColor: Color.coreTheme, width: '100%' }}>
            <div style={{ margin: '10px' }}>
                <TasksList />
            </div>
        </div>
    )
}

export default Tasks
