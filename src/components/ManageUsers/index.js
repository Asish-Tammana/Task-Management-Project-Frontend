import {Component} from 'react'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {CardActionArea} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import Sidebar from '../Sidebar'
import Navbar from '../NavBar'
// import TaskManagementContext from '../../Context/taskManageContext'

class ManageUsers extends Component {
  state = {
    allProfilesList: [],
  }

  componentDidMount() {
    this.getAllUsersDetails()
  }

  getAllUsersDetails = async () => {
    const {updateActiveState} = this.props
    updateActiveState('MANAGEUSERS')

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
    this.setState({
      allProfilesList: data.returnResponse,
    })
  }

  deleteUser = async userId => {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken} = userDetails

    const url = `https://task-management-l5o7.onrender.com/profiles/${userId}`

    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      this.getAllUsersDetails()
    }
  }

  render() {
    const {allProfilesList} = this.state

    return (
      <Box>
        <Navbar />
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            margin: 0,
          }}
          className="dashboard"
        >
          <Box sx={{width: '16%', minHeight: '100vh'}}>
            <Sidebar />
          </Box>
          <Box sx={{padding: 2, width: '84%', paddingTop: 10}}>
            <h1 style={{color: 'white'}}>Manage Users</h1>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}
            >
              {allProfilesList.map(each => {
                const userImage =
                  each.gender === 'Male'
                    ? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1695032072~exp=1695032672~hmac=917e7ffb247b72e4e6e0573451788d643def831c4628ea736d7388276b0cc576'
                    : 'https://img.freepik.com/free-vector/illustration-businesswoman_53876-5857.jpg?w=740&t=st=1695032115~exp=1695032715~hmac=0f4f17bfdf4649c5bb83fc6cf457d473fee4f22caf12674bbcc9fda75ae4ab6c'

                return (
                  <Card sx={{width: '25%', margin: 1}} key={each.id}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="150"
                        image={userImage}
                        alt={each.username}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {each.name}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <Typography variant="body2" color="text.secondary">
                              {each.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {each.is_admin === 0 ? 'Employee' : 'Admin'}
                            </Typography>
                          </div>

                          <DeleteIcon
                            onClick={() => this.deleteUser(each.id)}
                          />
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default ManageUsers
