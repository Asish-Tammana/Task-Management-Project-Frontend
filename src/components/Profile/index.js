import {Component} from 'react'
import Box from '@mui/material/Box'
import Cookies from 'js-cookie'

import Sidebar from '../Sidebar'
import Navbar from '../NavBar'

// import TaskManagementContext from '../../Context/taskManageContext'
import './index.css'

class Profile extends Component {
  componentDidMount() {
    this.changeActiveTab()
  }

  changeActiveTab = () => {
    const {updateActiveState} = this.props
    updateActiveState('PROFILE')
  }

  render() {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {loggedInUserDetails} = userDetails
    const {name, description, username, gender} = loggedInUserDetails

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
            <h1 style={{color: 'white'}}> My Profile</h1>
            <Box sx={{boxShadow: 3, backgroundColor: 'white', padding: 3}}>
              <h1>{name}</h1>
              <p>{description}</p>
              <p>
                <span className="profile-heading">Username</span> : {username}
              </p>
              <p>
                <span className="profile-heading">Gender</span> : {gender}
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Profile
