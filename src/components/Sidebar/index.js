/* eslint-disable camelcase */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'

import TaskManagementContext from '../../Context/taskManageContext'
import './index.css'

class Sidebar extends Component {
  render() {
    return (
      <TaskManagementContext.Consumer>
        {value => {
          const {sidebarNavItems, activeTab, updateActiveState} = value

          const userDetails = JSON.parse(
            Cookies.get('user_details_task_management'),
          )

          const {loggedInUserDetails} = userDetails
          const {is_admin} = loggedInUserDetails

          return (
            <Box
              sx={{
                paddingTop: 11,
                boxShadow: 5,
                minHeight: '100vh',
              }}
            >
              {sidebarNavItems.map(each => {
                let output = null

                const activeTabStyle = each.tabId === activeTab && 'active-tab'

                if (each.tabId !== 'MANAGEUSERS' && each.tabId !== 'ALLTASKS') {
                  output = (
                    <Link
                      to={each.to}
                      className={`side-bar-item ${activeTabStyle}`}
                      onClick={() => updateActiveState(each.tabId)}
                      key={each.tabId}
                    >
                      <span className="side-bar-item-icon">{each.icon}</span>
                      <p>{each.display}</p>
                    </Link>
                  )
                } else if (
                  (each.tabId === 'MANAGEUSERS' || each.tabId === 'ALLTASKS') &&
                  is_admin === 1
                ) {
                  output = (
                    <Link
                      to={each.to}
                      className={`side-bar-item ${activeTabStyle}`}
                      onClick={() => updateActiveState(each.tabId)}
                      key={each.tabId}
                    >
                      <span className="side-bar-item-icon">{each.icon}</span>
                      <p>{each.display}</p>
                    </Link>
                  )
                }
                return output
              })}
            </Box>
          )
        }}
      </TaskManagementContext.Consumer>
    )
  }
}

export default Sidebar
