import React from 'react'

const TaskManagementContext = React.createContext({
  nameInput: '',
  usernameInput: '',
  passwordInput: '',
  genderInput: '',
  signUpResponse: '',
  loginErrorMsg: '',
  updateName: () => {},
  updateUsername: () => {},
  updatePassword: () => {},
  onSubmitFailure: () => {},
  updateActiveTab: () => {},
})
export default TaskManagementContext
