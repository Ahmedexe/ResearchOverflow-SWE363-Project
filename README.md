# Research Overflow
A new mean of communicating research.

## Table of Contents

- [About](#about)
- [Installation Instructions](#installation-instructions)
- [Usage Instructions](#usage-instructions)
- [Technologies Used](#technologies-used)
- [Team Members](#team-members)
- [Credits](#credits)
- [Backend Setup & Running](#backend-setup--running)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

## About
Research Overflow is an innovative platform designed to enhance academic collaboration by allowing researchers to share their publications and engage in structured discussions. The platform enables users to upload their work, track engagement, and receive feedback through comments, ratings, and paragraph-level annotations. This interactive approach fosters deeper academic discourse, allowing peers to highlight specific sections, ask questions, and provide targeted insights. Researchers can also follow authors, search for relevant publications, and bookmark papers for future reference, making it easier to stay updated on developments in their field. By integrating discussion and feedback mechanisms, the platform helps authors refine their work based on constructive critiques while promoting knowledge-sharing within academic communities. Additionally, administrators oversee content moderation, approve publications, and ensure quality control to maintain a well-organized and credible research environment. Through its focus on engagement, collaboration, and structured discourse, Research Overflow empowers researchers to enhance the visibility and impact of their work while fostering meaningful scholarly connections.

## Installation Instructions

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Ahmedexe/ResearchOverflow-SWE363-Project.git
   ```

2. **Move to project file:**
   ```bash
   cd ResearchOverflow-SWE363-Project
   ```

3. **Install required packages:**
   ```bash
   npm install
   ```

## Usage Instructions

1. **Start the backend server:**
   ```bash
   node server.js
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000)

2. **Start the frontend:**
   ```bash
   npm start
   ```
   The frontend will run on [http://localhost:3000](http://localhost:3000)

## Technologies Used
- **Frontend:**
  - React
  - HTML5 & CSS3
  - Bootstrap
  - React Router
  - Axios

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - CORS

## Team Members
- [Ahmed Alzuhair](https://github.com/Ahmedexe)
- [Faisal Alsalem](https://github.com/alsalemfaisal)
- [Faisal Alabbas](https://github.com/FaisalAlabbas)
- [Ali Alkraida](https://github.com/AliAlkraida)
- [Talal Alharbi](https://github.com/Talalkhaled)

## Credits
[Unsplash](https://unsplash.com) for images

## Backend Setup & Running

1. **Set up MongoDB:**
   - Use [MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/) or a local MongoDB instance
   - Create a `.env` file in the root directory with the required environment variables

2. **Start the backend server:**
   ```bash
   node server.js
   ```
   The server will start on port 5000

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/signup`
- **Request Body:**
  ```json
  {
    "fname": "First",
    "lname": "Last",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "msg": "User registered successfully"
  }
  ```

#### Login User
- **POST** `/api/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "msg": "Login successful"
  }
  ```

### Comments Endpoints

#### Add Comment
- **POST** `/api/comments`
- **Request Body:**
  ```json
  {
    "commentorUsername": "user",
    "paperId": "paper123",
    "paperTitle": "Paper Title",
    "comment": "This is a comment"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "comment_id",
    "commentorUsername": "user",
    "paperId": "paper123",
    "paperTitle": "Paper Title",
    "comment": "This is a comment",
    "votes": {
      "upvotes": 0,
      "downvotes": 0
    }
  }
  ```

#### Get Comments
- **GET** `/api/comments/:paperId`
- **Response:**
  ```json
  [
    {
      "_id": "comment_id",
      "commentorUsername": "user",
      "paperId": "paper123",
      "paperTitle": "Paper Title",
      "comment": "This is a comment",
      "votes": {
        "upvotes": 0,
        "downvotes": 0
      }
    }
  ]
  ```

#### Vote on Comment
- **POST** `/api/comments/:commentId/upvote`
- **POST** `/api/comments/:commentId/downvote`
- **Response:**
  ```json
  {
    "msg": "Vote recorded successfully"
  }
  ```

### Error Responses

All endpoints return appropriate HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```
