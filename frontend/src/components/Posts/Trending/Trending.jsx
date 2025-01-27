import Body from '../Post/body'
import DispatchCalls from '../../../StateManagement/dispatch'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function Trending() {
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.Trending();
      setPosts(response)
    }
    if (!posts) {
      fetch()
    }
  }, [])

  if (!posts) return <h1>Loading...</h1>

  return (
    <div div style={{height: '100vh', overflow: 'scroll'}}>
    <Body optional={posts} />
    </div>
  )

}