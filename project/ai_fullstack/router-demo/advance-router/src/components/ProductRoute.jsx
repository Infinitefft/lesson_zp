import {
  Navigate,
} from 'react-router-dom';

export default function ProductRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }
  return (
    <>
      {children}
    </>
  )
}