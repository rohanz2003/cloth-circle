import http from 'node:http';
import { Server } from 'socket.io';
import { app } from './app.js';

const port = Number(process.env.PORT || 4000);
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  socket.on('swap:join', (swapId) => socket.join(`swap:${swapId}`));
  socket.on('swap:message', (message) => socket.to(`swap:${message.swapId}`).emit('swap:message', message));
});
server.listen(port, () => console.log(`Cloth Circle API listening on http://localhost:${port}`));
