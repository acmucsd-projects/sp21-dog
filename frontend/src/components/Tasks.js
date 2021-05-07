import { Color } from '../helpers/Color'
import TasksList from './TasksList'

const Tasks = () => {
    return (
        <div class="overflow-container">
            <div style={{ width: '100%' }}>
                <TasksList />
            </div>
        </div>
    )
}

export default Tasks
