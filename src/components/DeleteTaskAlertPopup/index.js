import Popup from 'reactjs-popup'
import DeleteIcon from '@mui/icons-material/Delete'
import TaskManagementContext from '../../Context/taskManageContext'
import 'reactjs-popup/dist/index.css'

import './index.css'

const DeleteTaskAlertPopup = props => {
  const {taskId} = props

  return (
    <TaskManagementContext.Consumer>
      {value => {
        const {deleteTask} = value
        return (
          <div className="popup-container">
            <Popup modal style={{height: '50px'}} trigger={<DeleteIcon />}>
              {close => (
                <>
                  <div>
                    <p>Are you sure want to delete this task?</p>
                  </div>
                  <button
                    type="button"
                    className="no-button"
                    onClick={() => close()}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => deleteTask(taskId)}
                  >
                    Yes
                  </button>
                </>
              )}
            </Popup>
          </div>
        )
      }}
    </TaskManagementContext.Consumer>
  )
}
export default DeleteTaskAlertPopup
