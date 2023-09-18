import {Component} from 'react'
import Navbar from '../NavBar'

class NotFound extends Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar />
        <h1>Not Found</h1>
      </div>
    )
  }
}

export default NotFound
