import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import TaskManagementContext from '../../Context/taskManageContext'

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function SignUp() {
  const getJwtToken = Cookies.get('user_details_task_management')
  if (getJwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <TaskManagementContext.Consumer>
      {value => {
        const {
          nameInput,
          usernameInput,
          passwordInput,
          genderInput,
          visibleLoader,
          signUpResponse,
          updateUsername,
          updatePassword,
          updateName,
          updateGender,
          handleSignUp,
        } = value
        return (
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Loader
                  type="ThreeDots"
                  color="#1976d2"
                  height="50"
                  width="50"
                  visible={visibleLoader}
                />
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSignUp}
                  sx={{mt: 3}}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="Name"
                        required
                        fullWidth
                        id="Name"
                        label="Name"
                        autoFocus
                        onChange={updateName}
                        value={nameInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange={updateUsername}
                        value={usernameInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={updatePassword}
                        value={passwordInput}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel
                          id="demo-row-radio-buttons-group-label"
                          required
                        >
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={genderInput}
                          onChange={updateGender}
                          required
                        >
                          <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="Male"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account?
                      </Link>
                    </Grid>
                  </Grid>
                  <Typography component="p">{signUpResponse}</Typography>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )
      }}
    </TaskManagementContext.Consumer>
  )
}
