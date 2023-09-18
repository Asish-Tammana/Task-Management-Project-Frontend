/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import FormatListNumberedRoundedIcon from '@mui/icons-material/FormatListNumberedRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import AssignmentIcon from '@mui/icons-material/Assignment'
import PersonIcon from '@mui/icons-material/Person'
import Login from './components/Login'
import SignUp from './components/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import Tasks from './components/TasksPage'
import AllTasksPage from './components/AllTasksPage'
import Profile from './components/Profile'
import ManageUsers from './components/ManageUsers'
import NotFound from './components/NotFound'
import TaskManagementContext from './Context/taskManageContext'
import './App.css'

const sidebarNavItems = [
  {
    display: 'Dashboard',
    icon: <SpaceDashboardIcon />,
    to: '/',
    tabId: 'DASHBOARD',
  },
  {
    display: 'Tasks',
    icon: <FormatListNumberedRoundedIcon />,
    to: '/tasks',
    tabId: 'TASKS',
  },
  {
    display: 'All Tasks',
    icon: <AssignmentIcon />,
    to: '/all-tasks',
    tabId: 'ALLTASKS',
  },
  {
    display: 'Manage Users',
    icon: <ManageAccountsIcon />,
    to: '/manage-users',
    tabId: 'MANAGEUSERS',
  },
  {
    display: 'Profile',
    icon: <PersonIcon />,
    to: '/profile',
    tabId: 'PROFILE',
  },
]

class App extends Component {
  state = {
    nameInput: '',
    usernameInput: '',
    passwordInput: '',
    loginErrorMsg: '',
    genderInput: '',
    signUpResponse: '',
    activeTab: 'DASHBOARD',
    description:
      'Passionate problem solver and code enthusiast dedicated to crafting efficient solutions for complex challenges.',
    assignedTasks: 0,
    in_progressTasks: 0,
    doneTasks: 0,
    myTasksList: [],
    allTasksList: [],
    detailedTitle: null,
    detailedDescription: null,
    detailedAssigned_by: null,
    detailedAssigned_to: null,
    detailedAssigned_date: null,
    detailedDeadline: null,
    detailedTask_status: null,
    visibleLoader: false,
  }

  updateName = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  updateUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  updatePassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  updateGender = event => {
    this.setState({
      genderInput: event.target.value,
    })
  }

  updateDetailedTitle = event => {
    console.log(event.target.value)
    this.setState({
      detailedTitle: event.target.value,
    })
  }

  updateDetailedDescription = event => {
    console.log(event.target.value)
    this.setState({
      detailedDescription: event.target.value,
    })
  }

  updateAssignedBy = event => {
    console.log(event.target.value)
    this.setState({
      detailedAssigned_by: event.target.value,
    })
  }

  updateAssignedTo = event => {
    console.log(event.target.value)
    this.setState({
      detailedAssigned_to: event.target.value,
    })
  }

  updateAssignedDate = event => {
    console.log(event.target.value)
    this.setState({
      detailedAssigned_date: event.target.value,
    })
  }

  updateDeadLine = event => {
    console.log(event.target.value)
    this.setState({
      detailedDeadline: event.target.value,
    })
  }

  getCompleteTaskDetails = async (givenTasksList, taskId) => {
    const taskObjIndex = givenTasksList.findIndex(each => each.id === taskId)
    const taskObj = givenTasksList[taskObjIndex]

    this.setState({
      detailedTitle: taskObj.title,
      detailedDescription: taskObj.description,
      detailedAssigned_by: taskObj.assigned_by,
      detailedAssigned_to: taskObj.assigned_to,
      detailedAssigned_date: taskObj.assigned_date,
      detailedDeadline: taskObj.deadline,
      detailedTask_status: taskObj.task_status,
    })
  }

  updateTaskStatus = event => {
    this.setState({
      detailedTask_status: event.target.value,
    })
  }

  updateTaskStatusInDB = async taskId => {
    const url = `https://task-management-l5o7.onrender.com/updateTaskStatus/${taskId}/`
    const {detailedTask_status} = this.state

    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken, loggedInUserDetails} = userDetails

    const reqBody = {
      update_task_status: detailedTask_status,
    }

    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(reqBody),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    this.getAllTasks()
    this.getMyTasks()
  }

  updateTaskDetailsInDB = async taskId => {
    const {
      detailedTitle,
      detailedDescription,
      detailedAssigned_by,
      detailedAssigned_to,
      detailedAssigned_date,
      detailedDeadline,
      detailedTask_status,
    } = this.state

    const url = `https://task-management-l5o7.onrender.com/updateTaskDetails/${taskId}/`

    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken, loggedInUserDetails} = userDetails

    const reqBody = {
      title: detailedTitle,
      description: detailedDescription,
      assigned_date: detailedAssigned_date,
      assigned_by: detailedAssigned_by,
      assigned_to: detailedAssigned_to,
      task_status: detailedTask_status,
    }

    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(reqBody),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    this.getAllTasks()
    this.getMyTasks()
  }

  getAllTasks = async () => {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken} = userDetails

    const url = 'https://task-management-l5o7.onrender.com/all-tasks/'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    this.setState({
      allTasksList: data.returnResponse,
    })
  }

  getMyTasks = async () => {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken, loggedInUserDetails} = userDetails
    const {username} = loggedInUserDetails

    const url = `https://task-management-l5o7.onrender.com/tasks/${username}/`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    this.setState({
      myTasksList: data.returnResponse,
    })
  }

  getTaskStatistics = async () => {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken, loggedInUserDetails} = userDetails
    const {username} = loggedInUserDetails

    const url = `https://task-management-l5o7.onrender.com/myTasks/${username}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const {returnResponse} = data
    const {assigned, done, in_progress} = returnResponse

    this.setState({
      assignedTasks: assigned,
      in_progressTasks: in_progress,
      doneTasks: done,
    })
  }

  handleLogin = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state

    this.setState({
      visibleLoader: true,
    })

    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }

    const url = 'https://task-management-l5o7.onrender.com/login/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const {jwtToken, loggedInUserDetails} = data
      const {
        id,
        name,
        username,
        gender,
        description,
        is_admin,
      } = loggedInUserDetails

      this.setState({
        nameInput: '',
        usernameInput: '',
        passwordInput: '',
        loginErrorMsg: '',
        genderInput: '',
        signUpResponse: '',
        description,
      })

      const cookieData = JSON.stringify(data)

      Cookies.set('user_details_task_management', cookieData, {
        expires: 30,
      })

      this.setState({
        visibleLoader: false,
      })

      const {history} = this.props

      history.replace('/')
    } else {
      this.setState({
        loginErrorMsg: data.returnResponse,
        visibleLoader: false,
      })
    }
  }

  handleSignUp = async event => {
    event.preventDefault()

    this.setState({
      visibleLoader: true,
    })

    const {
      nameInput,
      usernameInput,
      passwordInput,
      genderInput,
      description,
    } = this.state

    const newUserDetails = {
      name: nameInput,
      username: usernameInput,
      password: passwordInput,
      gender: genderInput,
      description,
    }

    const url = 'https://task-management-l5o7.onrender.com/signup/'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newUserDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    this.setState({
      visibleLoader: false,
    })

    this.setState({
      nameInput: '',
      usernameInput: '',
      passwordInput: '',
      loginErrorMsg: '',
      genderInput: '',
      signUpResponse: data.returnResponse,
    })

    if (response.ok) {
      const {history} = this.props

      setTimeout(() => {
        history.replace('/login')
      }, 3000)
    }
  }

  handleLogout = () => {
    Cookies.remove('user_details_task_management')
    const {history} = this.props
    history.replace('/login')
  }

  updateActiveState = currTabId => {
    this.setState({
      activeTab: currTabId,
    })
  }

  deleteTask = async taskId => {
    const userDetails = JSON.parse(Cookies.get('user_details_task_management'))
    const {jwtToken, loggedInUserDetails} = userDetails
    const {username} = loggedInUserDetails

    const url = `https://task-management-l5o7.onrender.com/tasks/${taskId}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      this.getMyTasks()
    }
  }

  render() {
    const {
      nameInput,
      usernameInput,
      passwordInput,
      genderInput,
      signUpResponse,
      loginErrorMsg,
      tabsList,
      description,
      activeTab,
      assignedTasks,
      in_progressTasks,
      doneTasks,
      allTasksList,
      myTasksList,
      detailedTitle,
      detailedDescription,
      detailedAssigned_by,
      detailedAssigned_to,
      detailedAssigned_date,
      detailedDeadline,
      detailedTask_status,
      visibleLoader,
    } = this.state

    return (
      <TaskManagementContext.Provider
        value={{
          nameInput,
          usernameInput,
          passwordInput,
          genderInput,
          signUpResponse,
          loginErrorMsg,
          tabsList,
          description,
          sidebarNavItems,
          activeTab,
          assignedTasks,
          in_progressTasks,
          doneTasks,
          myTasksList,
          detailedTitle,
          detailedDescription,
          detailedAssigned_by,
          detailedAssigned_to,
          detailedAssigned_date,
          detailedDeadline,
          detailedTask_status,
          visibleLoader,
          updateUsername: this.updateUsername,
          updatePassword: this.updatePassword,
          updateName: this.updateName,
          onSubmitFailure: this.onSubmitFailure,
          updateGender: this.updateGender,
          handleSignUp: this.handleSignUp,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          updateActiveState: this.updateActiveState,
          getTaskStatistics: this.getTaskStatistics,
          getMyTasks: this.getMyTasks,
          deleteTask: this.deleteTask,
          getCompleteTaskDetails: this.getCompleteTaskDetails,
          updateTaskStatus: this.updateTaskStatus,
          updateTaskStatusInDB: this.updateTaskStatusInDB,
          updateTaskDetailsInDB: this.updateTaskDetailsInDB,
          getAllTasks: this.getAllTasks,
          updateDetailedTitle: this.updateDetailedTitle,
          updateDetailedDescription: this.updateDetailedDescription,
          updateAssignedBy: this.updateAssignedBy,
          updateAssignedTo: this.updateAssignedTo,
          updateAssignedDate: this.updateAssignedDate,
          updateDeadLine: this.updateDeadLine,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute
            exact
            path="/"
            render={() => (
              <Dashboard
                updateActiveState={this.updateActiveState}
                getTaskStatistics={this.getTaskStatistics}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/tasks"
            render={() => (
              <Tasks
                tasksList={myTasksList}
                updateActiveState={this.updateActiveState}
                getMyTasks={this.getMyTasks}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/all-tasks"
            render={() => (
              <AllTasksPage
                tasksList={allTasksList}
                updateActiveState={this.updateActiveState}
                getAllTasks={this.getAllTasks}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/profile"
            render={() => (
              <Profile updateActiveState={this.updateActiveState} />
            )}
          />
          <ProtectedRoute
            exact
            path="/manage-users"
            render={() => (
              <ManageUsers updateActiveState={this.updateActiveState} />
            )}
          />
          <ProtectedRoute path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </TaskManagementContext.Provider>
    )
  }
}

export default withRouter(App)
