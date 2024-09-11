const searchBar = document.getElementById('input-search');
const searchBox = document.getElementsByClassName('box-search')[0];
const userProfile = document.getElementById('fa-user');
const userDropdown = document.getElementsByClassName('user-dropdown')[0];
const settings = document.getElementById('fa-cog');
const login = document.getElementsByClassName('div-user-dropdown')[1];
const divHeader = document.getElementsByClassName('div-header')[0];
const mainBody = document.getElementById('main-body');
const maxHeight = window.innerHeight;
const followingBody = document.getElementById('following-body');
const exploreBody = document.getElementById('explore-body');
const bhFollowing = document.getElementById('bh-following');
const bhExplore = document.getElementById('bh-explore');
const bhLine01 = document.getElementById('bh-line01');
const bhLine02 = document.getElementById('bh-line02');

mainBody.style.height = (maxHeight - 59) + 'px';

function script() {
  searchBar.addEventListener('focus', () => {
    searchBar.placeholder = '';
  });

  searchBar.addEventListener('blur', () => {
    searchBar.placeholder = 'Search...';
  });

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // Code goes here...
    };
  });

  userProfile.addEventListener('click', () => {
    if (userDropdown.style.display !== 'flex') {
      userDropdown.style.display = 'flex';
      loginButton.style.transform = 'translate(0px, -40px)';
      registerLink.style.transform = 'translate(0px, -40px)';
    } else if (userDropdown.style.display !== 'none') {
      userDropdown.style.display = 'none';
    };
  });

  bhFollowing.addEventListener('click', () => {
    followingBody.style.display = 'block';
    exploreBody.style.display = 'none';
    bhLine01.style.display = 'block';
    bhLine02.style.display = 'none';
  });

  bhExplore.addEventListener('click', () => {
    followingBody.style.display = 'none';
    exploreBody.style.display = 'block';
    bhLine01.style.display = 'none';
    bhLine02.style.display = 'block';
  });

  login.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.href !== 'create-post.html') {
    script();
  }
});
