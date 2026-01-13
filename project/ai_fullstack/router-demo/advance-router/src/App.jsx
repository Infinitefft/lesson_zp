import {
  BrowserRouter as Router,  // html5 history
  // HashRouter,
} from 'react-router-dom'

import Navigation from './components/Navigation'
import RouterConfig from './router';



export default function App() {
  return (
    <>
      <Router>
        <Navigation />
        <RouterConfig />
      </Router>
    </>
    
  )
}