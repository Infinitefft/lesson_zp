import {
  useContext
} from 'react'

import { 
  UserContext,
} from '../App'

export default function UserInfo() {
  // console.log(UserContext);
  const user = useContext(UserContext);
  console.log(user);
  return (
    <div>
      {user.name}
    </div>
  )
}