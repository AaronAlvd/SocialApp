import { useSelector } from "react-redux"



export default function UserProfile() {
  const user = useSelector(state => state.session.user);

  return (
    <div>
      
    </div>
  )
}