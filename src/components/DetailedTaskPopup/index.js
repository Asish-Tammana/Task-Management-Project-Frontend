/* eslint-disable camelcase */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TaskManagementContext from '../../Context/taskManageContext'

import 'reactjs-popup/dist/index.css'

import './index.css'

class DetailedTaskPopup extends Component {
  state = {
    editValues: false,
    adminsList: [],
    allProfilesList: [],
  }

  enableEditing = () => {
    this.setState(
      {
        editValues: true,
      },
      this.getAllUsersDetails,
    )
  }

  disableEditing = () => {
    this.setState(
      {
        editValues: false,
      },
      this.getAllUsersDetails,
    )
  }

  getAllUsersDetails = async () => {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken} = userDetails

    const url = `https://task-management-l5o7.onrender.com/profiles/`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const responseAllProfilesList = data.returnResponse

    const adminUsernameList = responseAllProfilesList.filter(
      each => each.is_admin === 1,
    )

    const adminsList = adminUsernameList.map(each => ({label: each.username}))
    const allProfilesList = responseAllProfilesList.map(each => ({
      label: each.username,
    }))

    this.setState({
      adminsList,
      allProfilesList,
    })
  }

  render() {
    const {taskId, givenTasksList} = this.props
    const {editValues, allProfilesList, adminsList} = this.state

    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {loggedInUserDetails} = userDetails
    const {is_admin} = loggedInUserDetails

    return (
      <TaskManagementContext.Consumer>
        {value => {
          const {
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
            updateTaskDetailsInDB,
            updateDetailedTitle,
            updateDetailedDescription,
            updateAssignedBy,
            updateAssignedTo,
            updateAssignedDate,
            updateDeadLine,
          } = value
          return (
            <div className="popup-container">
              <Popup
                modal
                trigger={
                  <button type="button" className="transparent-button">
                    <KeyboardArrowRightIcon
                      onClick={() =>
                        getCompleteTaskDetails(givenTasksList, taskId)
                      }
                      sx={{cursor: 'pointer'}}
                    />
                  </button>
                }
              >
                {close => (
                  <>
                    <div>
                      <div className="detail-task-head-container">
                        <h3>Task Details</h3>
                        {!editValues && is_admin === 1 && (
                          <EditOutlinedIcon
                            sx={{cursor: 'pointer'}}
                            onClick={this.enableEditing}
                          />
                        )}
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <td className="attributes">Title</td>
                            {editValues ? (
                              <td>
                                <TextField
                                  id="standard-basic"
                                  variant="standard"
                                  value={detailedTitle}
                                  onChange={updateDetailedTitle}
                                  sx={{width: '100%'}}
                                />
                              </td>
                            ) : (
                              <td>: {detailedTitle}</td>
                            )}
                          </tr>
                          <tr>
                            <td className="attributes">Description</td>
                            {editValues ? (
                              <td>
                                <TextField
                                  id="standard-basic"
                                  variant="standard"
                                  value={detailedDescription}
                                  onChange={updateDetailedDescription}
                                  sx={{width: '100%', marginTop: 1}}
                                />
                              </td>
                            ) : (
                              <td>: {detailedDescription}</td>
                            )}
                          </tr>
                          <tr>
                            <td className="attributes">Assigned By</td>
                            {editValues ? (
                              <td>
                                <select
                                  className="detailed-assigned-to"
                                  name="assigned_by"
                                  value={detailedAssigned_by}
                                  onChange={updateAssignedBy}
                                >
                                  {adminsList.map(each => (
                                    <option
                                      key={each.label}
                                      value={each.label}
                                      className="detailed-assigned-to"
                                    >
                                      {each.label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            ) : (
                              <td>: {detailedAssigned_by}</td>
                            )}
                          </tr>
                          <tr>
                            <td className="attributes">Assigned To</td>
                            {editValues ? (
                              <td>
                                <select
                                  className="detailed-assigned-to"
                                  name="assigned_to"
                                  value={detailedAssigned_to}
                                  onChange={updateAssignedTo}
                                >
                                  {allProfilesList.map(each => (
                                    <option
                                      key={each.label}
                                      value={each.label}
                                      className="detailed-assigned-to"
                                    >
                                      {each.label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                            ) : (
                              <td>: {detailedAssigned_to}</td>
                            )}
                          </tr>
                          <tr>
                            <td className="attributes">Assigned Date</td>
                            {editValues ? (
                              <td>
                                <input
                                  className="date-input"
                                  type="date"
                                  value={detailedAssigned_date}
                                  onChange={updateAssignedDate}
                                />
                              </td>
                            ) : (
                              <td>: {detailedAssigned_date}</td>
                            )}
                          </tr>
                          <tr>
                            <td className="attributes">Deadline</td>
                            {editValues ? (
                              <td>
                                <input
                                  className="date-input"
                                  type="date"
                                  value={detailedDeadline}
                                  onChange={updateDeadLine}
                                />
                              </td>
                            ) : (
                              <td>: {detailedDeadline}</td>
                            )}
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
                      onClick={() => {
                        close()
                        this.disableEditing()
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => {
                        close()
                        updateTaskStatusInDB(taskId)
                        updateTaskDetailsInDB(taskId)
                      }}
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
