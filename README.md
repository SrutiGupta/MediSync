# 🏥 MediSync – Advanced Hospital Management System

**A full-stack hospital management platform designed to streamline healthcare operations through real-time communication, intelligent resource management, and role-based access control.**

MediSync is an advanced Hospital Management System built using the MERN stack to simplify and digitize hospital operations. It provides a centralized platform for managing hospital resources, patient information, staff activities, and operational workflows.

The application combines real-time communication using Socket.IO, secure role-based authentication, MongoDB transaction management, and interactive analytics to deliver a responsive and scalable hospital management experience.

## ✨ Key Features

- **🔐 Role-Based Access Control (RBAC):** Implements JWT-based authentication with separate permissions for Admin, Doctor, and Receptionist roles.
- **🏥 Hospital Resource Management:** Provides centralized management of hospital resources and operational information.
- **🛏️ Real-Time Bed Allocation:** Uses Socket.IO rooms and atomic MongoDB transactions to coordinate bed allocation and maintain data consistency.
- **👨‍⚕️ Patient Management:** Supports centralized patient information management and real-time patient updates.
- **📡 Real-Time Synchronization:** Broadcasts relevant patient updates to connected clients using Socket.IO.
- **📊 Interactive Analytics Dashboard:** Uses Chart.js to visualize hospital operational data and analytics.
- **⚡ Database Query Optimization:** Uses MongoDB aggregation pipelines to optimize data retrieval and reduce N+1 query issues.
- **🔒 Secure Authentication:** Implements JWT authentication, password hashing, and protected application routes.
- **🐳 Dockerized Deployment:** Supports containerized application deployment using Docker and Docker Compose.
- **📱 Responsive Interface:** Provides an interactive web interface for hospital staff and administrators.

## 🧰 Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Real-Time Communication | Socket.IO |
| Authentication | JWT, bcryptjs |
| Data Visualization | Recharts / Chart.js |
| HTTP Client | Axios |
| Routing | React Router |
| Styling | Tailwind CSS |
| Icons | React Icons |
| Containerization | Docker, Docker Compose |
| Build Tool | Vite |

## 🏗️ System Architecture

MediSync follows a client-server architecture built around the MERN stack.

```text
             ┌──────────────────────┐
             │      React.js        │
             │    Frontend UI       │
             └──────────┬───────────┘
                        │
              REST API / Socket.IO
                        │
             ┌──────────▼───────────┐
             │    Node.js +         │
             │    Express.js        │
             │    Backend API       │
             └──────────┬───────────┘
                        │
             ┌──────────▼───────────┐
             │    Authentication    │
             │    JWT + RBAC        │
             └──────────┬───────────┘
                        │
             ┌──────────▼───────────┐
             │      MongoDB         │
             │  Mongoose +          │
             │  Aggregation         │
             └──────────────────────┘

              Real-Time Updates
                  Socket.IO
```

### Architecture Highlights

- React.js handles the frontend interface and user interactions.
- Express.js exposes backend APIs.
- JWT authentication protects application resources.
- MongoDB stores application data.
- Socket.IO enables real-time communication between connected clients.
- Docker provides containerized application services.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (20+ recommended)
- npm
- MongoDB (local or MongoDB Atlas)
- Docker and Docker Compose (for containerized setup)

### 1. Clone the Repository

```bash
git clone https://github.com/SrutiGupta/MediSync.git
cd MediSync
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Create a `.env` file in the frontend directory if your frontend configuration requires it.

```env
VITE_API_URL=http://localhost:5000
```

Replace the example values with your actual configuration.

**Security Note:** Never commit environment files, database credentials, JWT secrets, or other sensitive information to GitHub.

### 5. Run the Application

**Start the Backend**

```bash
cd backend
npm run dev
```

**Start the Frontend**

```bash
cd frontend
npm run dev
```

Open the local development URL displayed by Vite in your browser.

## 🐳 Docker Deployment

MediSync includes Docker and Docker Compose configuration to simplify application deployment.

The Docker Compose configuration includes three services:

| Service | Description | Port |
|---|---|---|
| MongoDB | Database service | 27017 |
| Backend | Node.js and Express API | 5000 |
| Frontend | React application | 5173 |

### Run with Docker Compose

From the project root:

```bash
docker compose up --build
```

To run services in the background:

```bash
docker compose up -d --build
```

To stop the services:

```bash
docker compose down
```

To stop services and remove the associated database volume:

```bash
docker compose down -v
```

**Important:** The repository's Compose configuration contains a development JWT secret. Replace it with a secure secret before using the configuration outside local development.

## 🔐 Authentication & Authorization

MediSync implements role-based access control to ensure that users can access functionality according to their assigned roles.

### Supported Roles

| Role | Access |
|---|---|
| Admin | Administrative operations and hospital-wide management |
| Doctor | Doctor-related operations and patient information |
| Receptionist | Reception and patient-management operations |

### Security Implementation

- JWT-based authentication.
- Password hashing using bcryptjs.
- Protected backend routes.
- Role-based authorization.
- Cookie-based authentication support.
- Environment-based secret management.

## 📡 Real-Time Communication with Socket.IO

One of MediSync's important engineering components is its real-time communication system.

Socket.IO enables the application to synchronize relevant updates across connected clients without requiring manual page refreshes.

### Key Capabilities

- Real-time patient update broadcasting.
- Socket.IO room-based communication.
- Real-time bed allocation coordination.
- Synchronization between connected application clients.
- Support for broadcasting updates to 50+ clients.

## 🛏️ Transactional Bed Allocation

MediSync uses MongoDB transactions to maintain consistency during bed allocation operations.

### Implementation Highlights

- Atomic database operations.
- Consistent resource allocation.
- Reduced risk of conflicting allocation updates.
- Real-time synchronization through Socket.IO rooms.

Combining database transactions with real-time communication helps maintain reliable hospital resource management.

## 📊 Database Optimization & Analytics

### MongoDB Optimization

MediSync uses MongoDB aggregation pipelines to optimize data retrieval and reduce N+1 query problems.

Benefits include:

- More efficient data aggregation.
- Reduced unnecessary database requests.
- Improved data retrieval workflows.
- Better support for dashboard analytics.

### Data Visualization

Interactive dashboards use charting libraries to present hospital-related operational information in a more understandable format.

## 🌐 Live Demo & Repository

| Resource | Link |
|---|---|
| Live Application | [MediSync](https://medisync-amber.vercel.app/) |
| GitHub Repository | [SrutiGupta/MediSync](https://github.com/SrutiGupta/MediSync) |
| Backend Deployment | [MediSync API](https://medisync-backend-m9h0.onrender.com) |

*Note: The backend deployment URL exposes the deployed service; individual API endpoints depend on the application routes.*

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Implement your changes.
4. Test your implementation.
5. Submit a pull request with a clear description.

## 👩‍💻 Author

**Sruti Gupta**

AI-Powered Full Stack Developer

- GitHub: [@SrutiGupta](https://github.com/SrutiGupta)
- Portfolio: [srutigupta-portfolio.netlify.app](https://srutigupta-portfolio.netlify.app/)

---

<p align="center">
  <b>MediSync – Simplifying Healthcare Management Through Technology.</b>
</p>
