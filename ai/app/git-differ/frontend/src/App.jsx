import {
  useEffect
} from 'react';
import { useGitDiff } from './hooks/useGitDiff.js'

export default function App() {
  const { loading, content } = useGitDiff('hello');
  

  return (
    <div className="flex">
      {loading ? 'loading...' : content}
    </div>
  )
}