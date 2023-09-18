import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import TaskManagementContext from '../../Context/taskManageContext'

const defaultTheme = createTheme()

export default function Login() {
  const getJwtToken = Cookies.get('user_details_task_management')
  if (getJwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <TaskManagementContext.Consumer>
      {value => {
        const {
          usernameInput,
          passwordInput,
          visibleLoader,
          loginErrorMsg,
          updateUsername,
          updatePassword,
          handleLogin,
        } = value

        return (
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
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
                  onSubmit={handleLogin}
                  noValidate
                  sx={{mt: 1}}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={updateUsername}
                    value={usernameInput}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={updatePassword}
                    value={passwordInput}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item sx={{ml: 'auto'}}>
                      <Link href="/signup" variant="body2">
                        <span>Don&apos;t have an account?</span>
                      </Link>
                    </Grid>
                  </Grid>
                  <p>{loginErrorMsg}</p>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )
      }}
    </TaskManagementContext.Consumer>
  )
}
