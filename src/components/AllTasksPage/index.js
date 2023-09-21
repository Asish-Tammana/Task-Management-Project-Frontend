/* eslint-disable no-else-return */
/* eslint-disable camelcase */
import {Component} from 'react'
import Box from '@mui/material/Box'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import 'reactjs-popup/dist/index.css'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Sidebar from '../Sidebar'
import Navbar from '../NavBar'
import DetailedTaskPopup from '../DetailedTaskPopup'
import DeleteTaskAlertPopup from '../DeleteTaskAlertPopup'

const columns = [
  {id: 'title', label: 'Task', minWidth: 200},
  {
    id: 'assigned_date',
    label: 'Assigned Date',
    minWidth: 120,
    align: 'right',
  },
  {
    id: 'deadline',
    label: 'Last Date',
    minWidth: 120,
    align: 'right',
  },
  {
    id: 'assigned_by',
    label: 'Assigned By',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'assigned_to',
    label: 'Assigned To',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'task_status',
    label: 'Task Status',
    minWidth: 130,
    align: 'right',
  },
  {
    id: 'open_task',
    label: 'Check Details',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'delete_button',
    label: 'Delete',
    minWidth: 100,
    align: 'center',
  },
]

class AllTasksPage extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  }

  componentDidMount() {
    this.changeActiveTab()
  }

  changeActiveTab = () => {
    const {updateActiveState, getAllTasks} = this.props
    updateActiveState('ALLTASKS')
    getAllTasks()
  }

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage})
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      page: 0,
      rowsPerPage: +event.target.value,
    })
  }

  render() {
    const {page, rowsPerPage} = this.state
    const {tasksList} = this.props

    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))

    const {loggedInUserDetails} = userDetails
    const {is_admin} = loggedInUserDetails

    if (is_admin !== 1) {
      return <Redirect to="/tasks" />
    }

    return (
      <Box>
        <Navbar />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'row',
            minHeight: '100vh',
            margin: 0,
          }}
          className="dashboard"
        >
          <Box sx={{width: '16%'}}>
            <Sidebar />
          </Box>
          <Box sx={{padding: 2, width: '84%', paddingTop: 10}}>
            <h1 style={{color: 'white'}}>All Tasks</h1>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
              <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map(column => {
                        let output = null

                        if (column.id !== 'delete_button') {
                          output = (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{minWidth: column.minWidth}}
                            >
                              {column.label}
                            </TableCell>
                          )
                        } else if (
                          column.id === 'delete_button' &&
                          is_admin === 1
                        ) {
                          output = (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{minWidth: column.minWidth}}
                            >
                              {column.label}
                            </TableCell>
                          )
                        }

                        return output
                      })}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tasksList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(row => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.title}
                        >
                          {columns.map(column => {
                            const valu = row[column.id]

                            if (
                              column.id === 'delete_button' &&
                              is_admin === 1
                            ) {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  sx={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  <DeleteTaskAlertPopup
                                    taskId={row.id}
                                    givenTasksList={tasksList}
                                  />
                                </TableCell>
                              )
                            } else if (column.id === 'open_task') {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{minWidth: column.minWidth}}
                                >
                                  <DetailedTaskPopup
                                    taskId={row.id}
                                    givenTasksList={tasksList}
                                  />
                                </TableCell>
                              )
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof valu === 'number'
                                  ? column.format(valu)
                                  : valu}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={tasksList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default AllTasksPage
