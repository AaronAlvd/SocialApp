import Body from './body';
import Header from './header';
import { useSelector } from 'react-redux';
import { default as Header2 }from '../../Explore/Header/Header';

export default function Post() {
  const user = useSelector((state) => state.session.user)

  if (!user) return null

  return (
    <div style={{height: '100vh', overflow: 'scroll'}}>
    {/* <Header2/> */}
    {/* <Header user={user}/> */}
    <Body/>
    </div>
  )
}