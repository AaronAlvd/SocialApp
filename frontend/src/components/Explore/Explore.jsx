import DispatchCalls from "../../StateManagement/dispatch";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import Body from '../Posts/Post/body';
import Header from './Header/Header';
import './Explore.css';

export default function Post() {
  const dispatch = useDispatch();
  const dispatchCall = new DispatchCalls(dispatch);
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await dispatchCall.Explore();
      setPosts(response);
    }

    if (!posts) {
      fetch()
    }

  }, []);

  if (!posts) return null;

  return (
    <div style={{height: '100vh', overflow: 'scroll'}}>
      <Header/>
      <Body optional={posts}/>
    </div>
  )

}