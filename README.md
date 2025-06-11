# ZOOM-MAIN

A full-stack video meeting application built with modern web technologies, featuring real-time communication, user authentication, and meeting management capabilities.

## 🚀 Features

- **Real-time Video Meetings**: Host and join video conferences with multiple participants
- **User Authentication**: Secure login and registration system
- **Meeting Management**: Create, schedule, and manage meetings
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Socket Communication**: Real-time data synchronization using WebSocket connections

## 🛠️ Tech Stack

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **Socket.io**: Real-time bidirectional event-based communication
- **Authentication**: Secure user authentication system

### Frontend
- **React.js**: Modern JavaScript library for building user interfaces
- **Context API**: State management for authentication and app data
- **Responsive CSS**: Mobile-first design approach

## 📁 Project Structure

```
ZOOM-MAIN/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── socketManager.js
│   │   │   └── user.controller.js
│   │   ├── models/
│   │   │   ├── meeting.model.js
│   │   │   └── user.model.js
│   │   └── routes/
│   │       └── users.routes.js
│   ├── app.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── authentication.jsx
│   │   │   ├── history.jsx
│   │   │   ├── home.jsx
│   │   │   ├── landing.jsx
│   │   │   └── VideoMeet.jsx
│   │   ├── utils/
│   │   │   └── withAuth.jsx
│   │   └── styles/
│   └── App.css
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser with WebRTC support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zoom-main.git
   cd zoom-main
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`


## 🙏 Acknowledgments

- WebRTC for real-time communication capabilities
- Socket.io for seamless real-time data synchronization



---

**Happy Coding! 🎉**
