import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../contexts/SocketProvider";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/dashboard/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Lobby</h1>
      <form onSubmit={handleSubmitForm} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email ID
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="room" className="block mb-1">
            Room Number
          </label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full rounded-md"
          />
        </div>
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md">
          Join
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;
