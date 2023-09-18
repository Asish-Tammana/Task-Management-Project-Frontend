import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TaskManagementContext from '../../Context/taskManageContext'

export default function Navbar() {
  return (
    <TaskManagementContext.Consumer>
      {value => {
        const {handleLogout} = value
        return (
          <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                  Task Management
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
        )
      }}
    </TaskManagementContext.Consumer>
  )
}
