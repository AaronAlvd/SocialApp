// import { followingBody } from "./script.js";

const publish = document.getElementById('publish');
// const textArea = document.getElementById('textarea');

// function publishPost(textArea) {
//   const newPost = document.createElement('div');
//     newPost.innerHTML = `
//     <div class="sp-header">
//       <img src="../assets/images/profile-photo.jpeg">
//       <p class="sp-name">Henry Willington</p>
//       <small class="sp-user">@world_dominator_87</small>
//     </div>
//     <div class="sp-body">${textArea.value}</div>`;

//   newPost.setAttribute('class', 'social-post');

//   followingBody.append(newPost);
// }

publish.addEventListener('click', () => {
  // publishPost();
  window.location.href = 'home.html';
})
