import { Server } from "socket.io";

let io;

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {

    console.log("Client connected:", socket.id);

    // user joins dashboard room
    socket.on("joinDashboard", () => {
      socket.join("dashboardRoom");
      console.log("User joined dashboard");
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });

  });

};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};