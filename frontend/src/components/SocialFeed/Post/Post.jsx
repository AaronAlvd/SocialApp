import DispatchCalls from "../../../Social/dispatch";
import Social from "../../../Social/Social";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from "react";
import './Post.css';

export default function Post() {
  const dispatch = useDispatch();
  const unsortedFeed = useSelector((state) => state.posts.posts);
  const social = new Social();
  const sortedFeed = social.sortByDate(unsortedFeed);
  const dispatchCall = new DispatchCalls(dispatch);

  useEffect(() => {
    dispatchCall.SocialFeed();
  }, [dispatch])

  return (
    <div className="Post-div">
      {sortedFeed.map((data) => {
        return (
          <div className="Post-div-box">
            <p className="Post-name">{data.User.firstName} {data.User.lastName}</p>
            <p className="Post-username"><small>@{data.User.username}</small></p>
            <p className="Post-caption">{social.findHashtags(data.caption)}</p>
            <p><small>{new Date(data.createdAt).toLocaleTimeString('en-US', { year:'numeric', day:'numeric', month:'numeric', hour: '2-digit', minute: '2-digit' })}</small></p>
          </div>
        )
      })}
    </div>
  )
}