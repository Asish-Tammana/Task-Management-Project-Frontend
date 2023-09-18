/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Box from '@mui/material/Box'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Sidebar from '../Sidebar'
import Navbar from '../NavBar'
import TaskManagementContext from '../../Context/taskManageContext'
import './index.css'

class Dashboard extends Component {
  componentDidMount() {
    this.changeActiveTab()
  }

  changeActiveTab = () => {
    const {updateActiveState, getTaskStatistics} = this.props
    updateActiveState('DASHBOARD')
    getTaskStatistics()
  }

  render() {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {loggedInUserDetails} = userDetails
    const {name} = loggedInUserDetails

    return (
      <TaskManagementContext.Consumer>
        {value => {
          const {
            assignedTasks,
            in_progressTasks,
            doneTasks,
            getTaskStatistics,
          } = value

          const data = [
            {
              count: assignedTasks,
              taskStatus: 'Assigned',
            },
            {
              count: in_progressTasks,
              taskStatus: 'In Progress',
            },
            {
              count: doneTasks,
              taskStatus: 'Task Done',
            },
          ]

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
                <Box sx={{width: '16%', minHeight: '100vh'}}>
                  <Sidebar />
                </Box>
                <Box sx={{padding: 2, width: '84%', paddingTop: 10}}>
                  <h1 style={{color: 'white'}}>Hey! {name}</h1>
                  <p style={{color: 'white', fontSize: '20px'}}>
                    You are doing grate!!! Have a look on your work statistics.
                  </p>
                  <ResponsiveContainer width="80%" height={400}>
                    <PieChart>
                      <Pie
                        cx="40%"
                        cy="40%"
                        data={data}
                        startAngle={0}
                        endAngle={360}
                        innerRadius="40%"
                        outerRadius="70%"
                        dataKey="count"
                      >
                        <Cell
                          name={`Assigned - ${assignedTasks}`}
                          fill="#c84d6c"
                        />
                        <Cell
                          name={`In Progress - ${in_progressTasks}`}
                          fill="#e5bf59"
                        />
                        <Cell
                          name={`Finished Tasks - ${doneTasks}`}
                          fill="#4074c8"
                        />
                      </Pie>
                      <Legend
                        iconType="circle"
                        layout="vertical"
                        verticalAlign="top"
                        align="right"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Box>
          )
        }}
      </TaskManagementContext.Consumer>
    )
  }
}

export default Dashboard
