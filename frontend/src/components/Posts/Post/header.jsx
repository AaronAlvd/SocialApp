import { useEffect, useState, useRef } from "react";
import { useModal } from '../../../context/modal';
import CreatePost from '../../Modals/CreatePost/CreatePost';
import defaultpfp from '../../../assets/Default_pfp.jpg';
import { FaImage } from "react-icons/fa6";
import { MdVideoLibrary } from "react-icons/md";

export default function Header({ user }) {
  const { setModalContent } = useModal();
  const uploadImgRef = useRef(null);
  const uploadVidRef = useRef(null);


  return (
    <>
    <div className="All_Posts-section_1">
        <div className="row_1">
          <img src={user.profilePhoto ? user.profilePhoto : defaultpfp}
               className="All_Posts-img-profile"/>
          <label className="All_Posts-label" onClick={() => setModalContent(<CreatePost user={user}/>)}>Share a post</label>
        </div>
        <div className="row_2">
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => uploadImgRef.current.click()}>
            <input type="file" style={{display: 'none'}} ref={uploadImgRef} accept="image/*" 
                   onChange={(e) => setModalContent(<CreatePost user={user} event={e}/>)}/>
            <FaImage style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Photo</label>
          </span>
          <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => uploadVidRef.current.click()}>
            <input type="file" style={{display: 'none'}} ref={uploadVidRef} accept="video/*"/>
            <MdVideoLibrary style={{fontSize: '18px'}}/>
            <label style={{marginLeft: '5px', fontWeight: '400', cursor: 'pointer'}}>Video</label>
          </span>
        </div>
    </div>
    {/* <div className='Post-line'/> */}
    </>
  )
}