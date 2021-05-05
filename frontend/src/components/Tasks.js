import { Color } from '../helpers/Color'
import TasksList from './TasksList'

const Tasks = () => {
    return (
        <div class="overflow-container">
            <div style={{ width: '100%' }}>
                <div style={{ margin: '10px' }}>
                    <TasksList />
                </div>
            </div>
        </div>
    )
}

export default Tasks
