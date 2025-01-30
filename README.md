# Social Media App 

Welcome to **SocialApp**, a web application designed for users to connect, share, and engage with each other. Users can create posts, follow friends, comment, like posts, and manage their profiles.

## Features

- **User Management:**
  - Register and login to the platform.
  - View and edit user profiles.
  - Follow and unfollow other users.

- **Post Management:**
  - Create, read, update, and delete posts.
  - View post details, including images, content, and like count.

- **Comment System:**
  - Users can comment on posts.
  - Edit or delete comments.
  - View all comments for each post.

- **Like/Reaction System:**
  - Users can like posts and comments.
  - View total likes for each post and comment.

- **Notifications:**
  - Receive notifications for new followers, likes, comments, and mentions.

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Google API
  - PostgreSQL (relational database)
  - Sequelize (PostgreSQL ORM)

- **Frontend:**
  - React.js
  - React Router (for routing)
  - Axios (for HTTP requests)

- **Authentication:**
  - JWT (JSON Web Token) for user authentication

- **Deployment:**
  - Render (for cloud hosting and deployment)

## API Endpoints

### User Endpoints

- `POST /users/register` – Register a new user.
- `POST /users/login` – Login to an existing account.
- `GET /users/me` – Get the currently authenticated user's profile.
- `PUT /users/me` – Update the user's profile information.
- `GET /users/:id/follow` – Follow a user.
- `GET /users/:id/unfollow` – Unfollow a user.

### Post Endpoints

- `POST /posts` – Create a new post.
- `GET /posts` – Get a list of all posts.
- `GET /posts/:id` – Get details of a specific post.
- `PUT /posts/:id` – Update a post's details.
- `DELETE /posts/:id` – Delete a post.
- `POST /posts/:id/like` – Like a post.
- `DELETE /posts/:id/like` – Remove like from a post.

### Comment Endpoints

- `POST /comments` – Create a new comment on a post.
- `GET /comments/:postId` – Get all comments for a specific post.
- `PUT /comments/:id` – Update a comment.
- `DELETE /comments/:id` – Delete a comment.

### Notification Endpoints

- `GET /notifications` – Get all notifications for the authenticated user.
- `PUT /notifications/:id/read` – Mark a notification as read.

## Setup Instructions

### Prerequisites

- Node.js (>= v14)
- PostgreSQL (or use a cloud PostgreSQL instance)
- Sequelize CLI for managing migrations and models
- npm or yarn for package management

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/social-net.git
   cd social-net

