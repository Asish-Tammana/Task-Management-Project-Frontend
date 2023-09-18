/* eslint-disable camelcase */
import {Component} from 'react'
import Popup from 'reactjs-popup'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import TaskManagementContext from '../../Context/taskManageContext'

import 'reactjs-popup/dist/index.css'

import './index.css'

class DetailedTaskPopup extends Component {
  render() {
    const {taskId} = this.props
    return (
      <TaskManagementContext.Consumer>
        {value => {
          const {
            myTasksList,
            detailedTitle,
            detailedDescription,
            detailedAssigned_by,
            detailedAssigned_to,
            detailedAssigned_date,
            detailedDeadline,
            detailedTask_status,
            getCompleteTaskDetails,
            updateTaskStatus,
            updateTaskStatusInDB,
          } = value
          return (
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button type="button" className="transparent-button">
                    <KeyboardArrowRightIcon
                      onClick={() =>
                        getCompleteTaskDetails(myTasksList, taskId)
                      }
                      sx={{cursor: 'pointer'}}
                    />
                  </button>
                }
              >
                {close => (
                  <>
                    <div>
                      <h3>Task Details</h3>
                      <table>
                        <tbody>
                          <tr>
                            <td className="attributes">Title</td>
                            <td>: {detailedTitle}</td>
                          </tr>
                          <tr>
                            <td className="attributes">Description</td>
                            <td>: {detailedDescription}</td>
                          </tr>
                          <tr>
                            <td className="attributes">Assigned By</td>
                            <td>: {detailedAssigned_by}</td>
                          </tr>
                          <tr>
                            <td className="attributes">Assigned To</td>
                            <td>: {detailedAssigned_to}</td>
                          </tr>
                          <tr>
                            <td className="attributes">Assigned Date</td>
                            <td>: {detailedAssigned_date}</td>
                          </tr>
                          <tr>
                            <td className="attributes">Deadline</td>
                            <td>: {detailedDeadline}</td>
                          </tr>
                          <tr>
                            <td className="attributes">Task Status</td>
                            <td>
                              <FormControl>
                                <RadioGroup
                                  row
                                  aria-labelledby="demo-row-radio-buttons-group-label"
                                  name="row-radio-buttons-group"
                                  value={detailedTask_status}
                                  onChange={updateTaskStatus}
                                >
                                  <FormControlLabel
                                    value="assigned"
                                    control={<Radio />}
                                    label="Assigned"
                                  />
                                  <FormControlLabel
                                    value="in_progress"
                                    control={<Radio />}
                                    label="In Progress"
                                  />
                                  <FormControlLabel
                                    value="done"
                                    control={<Radio />}
                                    label="Task Completed"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      className="no-button"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => updateTaskStatusInDB(taskId)}
                    >
                      Update
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
}
export default DetailedTaskPopup
