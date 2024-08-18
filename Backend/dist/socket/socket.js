"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const serverExports = require("../server");
let inQueue = [];
let rooms = []; // In match
module.exports = {
    onConnection: (socket) => {
        console.log("connection");
        socket.on("Enter Queue", (userProfile) => {
            inQueue.push(Object.assign(Object.assign({}, userProfile), { socketID: socket.id }));
            if (inQueue.length > 1) {
                const opponentSocketID = inQueue.find((user) => user.socketID !== socket.id).socketID;
                const players = [
                    inQueue.find((user) => user.socketID == socket.id),
                    inQueue.find((user) => user.socketID == opponentSocketID),
                ]; // two {name:name, socketID: i0ndfwqndoiqw}
                removeFromQueue(players[0]);
                removeFromQueue(players[1]);
                players[0].color = Math.random() < 0.5 ? "w" : "b";
                players[1].color = players[0].color === "w" ? "b" : "w";
                players[0].timeLeft = { value: 300 };
                players[1].timeLeft = { value: 300 };
                let room = {
                    name: `${players[0].name} vs ${players[1].name}`,
                    players: [players[0], players[1]],
                };
                rooms.push(room);
                const socketMap = serverExports.io.sockets.sockets;
                for (const [socketId, socket] of socketMap) {
                    if (socketId == players[0].socketID ||
                        socketId == players[1].socketID) {
                        socket.join(room);
                        serverExports.io.to(socketId).emit("Found Match", room);
                    }
                }
            }
        });
        socket.on("Match End", () => {
            // socket.rooms
        });
        socket.on("Make a move", (newFEN) => {
            const targetRoom = rooms.find((room) => room.players.find((player) => player.socketID == socket.id));
            const targetPlayer = targetRoom.players[0].socketID == socket.id
                ? targetRoom.players[1]
                : targetRoom.players[0];
            const otherPlayer = targetPlayer === targetRoom.players[1]
                ? targetRoom.players[0]
                : targetRoom.players[1];
            socket.to(targetPlayer.socketID).emit("Opponent moved", newFEN);
            clearInterval(otherPlayer.timeLeft.intervalID);
            const intervalID = setInterval(() => {
                targetPlayer.timeLeft.value = targetPlayer.timeLeft.value - 1;
                if (targetPlayer.timeLeft.value <= 0) {
                    clearInterval(intervalID);
                    serverExports.io
                        .to(targetRoom)
                        .emit("Game over", "By Time", /*loser:*/ targetPlayer);
                    return;
                }
                serverExports.io.to(targetRoom).emit("Time update", targetPlayer);
            }, 1000);
            targetPlayer.timeLeft.intervalID = intervalID; // so that i can clear it later.
        });
        socket.on("Game over", (opponent, you, method) => __awaiter(void 0, void 0, void 0, function* () {
            const targetRoom = rooms.find((room) => room.players.find((player) => player.socketID == you.socketID ||
                player.socketID == opponent.socketID));
            // both players leaving the room:
            const sockets = yield serverExports.io.fetchSockets();
            sockets
                .find((socket) => socket.id === opponent.socketID)
                .leave(targetRoom);
            sockets
                .find((socket) => socket.id === you.socketID)
                .leave(targetRoom);
            const filteredRooms = rooms.filter((room) => room.players.filter((player) => player.socketID === socket.id)
                .length === 0);
            socket.to(you.socketID).emit("Game over", method);
            rooms = filteredRooms;
        }));
        socket.on("Request rematch", (data) => {
            data.yourData.socketID = socket.id;
            socket
                .to(data.opponentData.socketID)
                .emit("Rematch Request", data.yourData);
        });
        socket.on("Accept rematch request", (user1_data, user2_data) => __awaiter(void 0, void 0, void 0, function* () {
            let room = {
                name: `${user1_data.name} vs ${user2_data.name}`,
                players: [user1_data, user2_data],
            };
            rooms.push(room);
            const sockets = yield serverExports.io.fetchSockets();
            console.log(socket.id);
            for (const socket of sockets) {
                console.log(socket.id);
            }
            let count = 0;
            for (const socket of sockets) {
                if (socket.id === user1_data.socketID ||
                    socket.id === user2_data.socketID) {
                    socket.join(room);
                    count++;
                }
                if (count === 2) {
                    break; // prevent unnecessary loop continuation.
                }
            }
            serverExports.io.to(room).emit("Found Match", room);
        }));
        socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("disconnection");
            // in case user refreshes browser (or just closes the tab or browser all together).
            const targetRoom = rooms.find((room) => room.players.find((player) => player.socketID === socket.id));
            if (targetRoom) {
                const sockets = yield serverExports.io.fetchSockets();
                for (const player of targetRoom.players) {
                    const otherPlayerSocket = sockets.find((socket) => socket.id === player.socketID);
                    if (otherPlayerSocket) {
                        // one time this will be undefined because it will look for the disconnected player's socket
                        serverExports.io.to(otherPlayerSocket.id).emit("Opponent left");
                        otherPlayerSocket.leave(targetRoom);
                    }
                }
                // const otherPlayer = targetRoom. // the one who is playing against the user who closed their browser
            }
            const filtered = inQueue.filter((user) => user.socketID !== socket.id);
            inQueue = filtered;
        }));
    },
};
function removeFromQueue(target) {
    const filteredQueue = inQueue.filter((user) => user.socketID != target.socketID);
    inQueue = filteredQueue;
}
// {
//   io: <ref *1> Server {
//     _events: [Object: null prototype] {},
//     _eventsCount: 0,
//     _maxListeners: undefined,
//     _nsps: Map(1) { '/' => [Namespace] },
//     parentNsps: Map(0) {},
//     parentNamespacesFromRegExp: Map(0) {},
//     _path: '/socket.io',
//     clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,
//     _connectTimeout: 45000,
//     _serveClient: true,
//     _parser: {
//       protocol: 5,
//       PacketType: [Object],
//       Encoder: [class Encoder],
//       Decoder: [class Decoder extends Emitter]
//     },
//     encoder: Encoder { replacer: undefined },
//     opts: { cleanupEmptyChildNamespaces: false },
//     _adapter: [class Adapter extends EventEmitter],
//     sockets: Namespace {
//       _events: [Object: null prototype],
//       _eventsCount: 1,
//       _maxListeners: undefined,
//       sockets: [Map],
//       _fns: [],
//       _ids: 0,
//       server: [Circular *1],
//       name: '/',
//       adapter: [Adapter],
//       [Symbol(shapeMode)]: false,
//       [Symbol(kCapture)]: false
//     },
//     eio: Server {
//       _events: [Object: null prototype],
//       _eventsCount: 1,
//       _maxListeners: undefined,
//       middlewares: [],
//       clients: [Object],
//       clientsCount: 3,
//       opts: [Object],
//       ws: [WebSocketServer],
//       [Symbol(shapeMode)]: false,
//       [Symbol(kCapture)]: false
//     },
//     httpServer: Server {
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       requestTimeout: 300000,
//       headersTimeout: 60000,
//       keepAliveTimeout: 5000,
//       connectionsCheckingInterval: 30000,
//       requireHostHeader: true,
//       joinDuplicateHeaders: undefined,
//       rejectNonStandardBodyWrites: false,
//       _events: [Object: null prototype],
//       _eventsCount: 5,
//       _maxListeners: undefined,
//       _connections: 3,
//       _handle: [TCP],
//       _usingWorkers: false,
//       _workers: [],
//       _unref: false,
//       _listeningId: 2,
//       allowHalfOpen: true,
//       pauseOnConnect: false,
//       noDelay: true,
//       keepAlive: false,
//       keepAliveInitialDelay: 0,
//       highWaterMark: 16384,
//       httpAllowHalfOpen: false,
//       timeout: 0,
//       maxHeadersCount: null,
//       maxRequestsPerSocket: 0,
//       _connectionKey: '6::::4000',
//       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
//       [Symbol(ServerResponse)]: [Function: ServerResponse],
//       [Symbol(shapeMode)]: false,
//       [Symbol(kCapture)]: false,
//       [Symbol(async_id_symbol)]: 5,
//       [Symbol(kUniqueHeaders)]: null,
//       [Symbol(http.server.connections)]: ConnectionsList {},
//       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
//         _idleTimeout: 30000,
//         _idlePrev: [TimersList],
//         _idleNext: [TimersList],
//         _idleStart: 689,
//         _onTimeout: [Function: bound checkConnections],
//         _timerArgs: undefined,
//         _repeat: 30000,
//         _destroyed: false,
//         [Symbol(refed)]: false,
//         [Symbol(kHasPrimitive)]: false,
//         [Symbol(asyncId)]: 7,
//         [Symbol(triggerId)]: 6
//       }
//     },
//     engine: Server {
//       _events: [Object: null prototype],
//       _eventsCount: 1,
//       _maxListeners: undefined,
//       middlewares: [],
//       clients: [Object],
//       clientsCount: 3,
//       opts: [Object],
//       ws: [WebSocketServer],
//       [Symbol(shapeMode)]: false,
//       [Symbol(kCapture)]: false
//     },
//     [Symbol(shapeMode)]: false,
//     [Symbol(kCapture)]: false
//   }
// }
/**
 * Namespace {
[1]   _events: [Object: null prototype] { connection: [Function: onConnection] },
[1]   _eventsCount: 1,
[1]   _maxListeners: undefined,
[1]   sockets: Map(2) {
[1]     '_RFqSXfU5p-SW6nMAAAD' => Socket {
[1]       _events: [Object: null prototype],
[1]       _eventsCount: 8,
[1]       _maxListeners: undefined,
[1]       nsp: [Circular *1],
[1]       client: [Client],
[1]       recovered: false,
[1]       data: {},
[1]       connected: true,
[1]       acks: Map(0) {},
[1]       fns: [],
[1]       flags: {},
[1]       server: [Server],
[1]       adapter: [Adapter],
[1]       id: '_RFqSXfU5p-SW6nMAAAD',
[1]       handshake: [Object],
[1]       [Symbol(shapeMode)]: false,
[1]       [Symbol(kCapture)]: false
[1]     },
[1]     'Fqro0Hbf3WbC2tIkAAAF' => Socket {
[1]       _events: [Object: null prototype],
[1]       _eventsCount: 8,
[1]       _maxListeners: undefined,
[1]       nsp: [Circular *1],
[1]       client: [Client],
[1]       recovered: false,
[1]       data: {},
[1]       connected: true,
[1]       acks: Map(0) {},
[1]       fns: [],
[1]       flags: {},
[1]       server: [Server],
[1]       adapter: [Adapter],
[1]       id: 'Fqro0Hbf3WbC2tIkAAAF',
[1]       handshake: [Object],
[1]       [Symbol(shapeMode)]: false,
[1]       [Symbol(kCapture)]: false
[1]     }
[1]   },
[1]   _fns: [],
[1]   _ids: 0,
[1]   server: Server {
[1]     _events: [Object: null prototype] {},
[1]     _eventsCount: 0,
[1]     _maxListeners: undefined,
[1]     _nsps: Map(1) { '/' => [Circular *1] },
[1]     parentNsps: Map(0) {},
[1]     parentNamespacesFromRegExp: Map(0) {},
[1]     _path: '/socket.io',
[1]     clientPathRegex: /^\/socket\.io\/socket\.io(\.msgpack|\.esm)?(\.min)?\.js(\.map)?(?:\?|$)/,
[1]     _connectTimeout: 45000,
[1]     _serveClient: true,
[1]     _parser: {
[1]       protocol: 5,
[1]       PacketType: [Object],
[1]       Encoder: [class Encoder],
[1]       Decoder: [class Decoder extends Emitter]
[1]     },
[1]     encoder: Encoder { replacer: undefined },
[1]     opts: { cleanupEmptyChildNamespaces: false },
[1]     _adapter: [class Adapter extends EventEmitter],
[1]     sockets: [Circular *1],
[1]     eio: Server {
[1]       _events: [Object: null prototype],
[1]       _eventsCount: 1,
[1]       _maxListeners: undefined,
[1]       middlewares: [],
[1]       clients: [Object],
[1]       clientsCount: 2,
[1]       opts: [Object],
[1]       ws: [WebSocketServer],
[1]       [Symbol(shapeMode)]: false,
[1]       [Symbol(kCapture)]: false
[1]     },
[1]     httpServer: Server {
[1]       maxHeaderSize: undefined,
[1]       insecureHTTPParser: undefined,
[1]       requestTimeout: 300000,
[1]       headersTimeout: 60000,
[1]       keepAliveTimeout: 5000,
[1]       connectionsCheckingInterval: 30000,
[1]       requireHostHeader: true,
[1]       joinDuplicateHeaders: undefined,
[1]       rejectNonStandardBodyWrites: false,
[1]       _events: [Object: null prototype],
[1]       _eventsCount: 5,
[1]       _maxListeners: undefined,
[1]       _connections: 2,
[1]       _handle: [TCP],
[1]       _usingWorkers: false,
[1]       _workers: [],
[1]       _unref: false,
[1]       _listeningId: 2,
[1]       allowHalfOpen: true,
[1]       pauseOnConnect: false,
[1]       noDelay: true,
[1]       keepAlive: false,
[1]       keepAliveInitialDelay: 0,
[1]       highWaterMark: 16384,
[1]       httpAllowHalfOpen: false,
[1]       timeout: 0,
[1]       maxHeadersCount: null,
[1]       maxRequestsPerSocket: 0,
[1]       _connectionKey: '6::::4000',
[1]       [Symbol(IncomingMessage)]: [Function: IncomingMessage],
[1]       [Symbol(ServerResponse)]: [Function: ServerResponse],
[1]       [Symbol(shapeMode)]: false,
[1]       [Symbol(kCapture)]: false,
[1]       [Symbol(async_id_symbol)]: 4,
[1]       [Symbol(kUniqueHeaders)]: null,
[1]       [Symbol(http.server.connections)]: ConnectionsList {},
[1]       [Symbol(http.server.connectionsCheckingInterval)]: Timeout {
[1]         _idleTimeout: 30000,
[1]         _idlePrev: [TimersList],
[1]         _idleNext: [TimersList],
[1]         _idleStart: 625,
[1]         _onTimeout: [Function: bound checkConnections],
[1]         _timerArgs: undefined,
[1]         _repeat: 30000,
[1]         _destroyed: false,
[1]         [Symbol(refed)]: false,
[1]         [Symbol(kHasPrimitive)]: false,
[1]         [Symbol(asyncId)]: 6,
[1]         [Symbol(triggerId)]: 5
[1]       }
[1]     },
[1]     engine: Server {
[1]       _events: [Object: null prototype],
[1]       _eventsCount: 1,
[1]       _maxListeners: undefined,
[1]       middlewares: [],
[1]       clients: [Object],
[1]       clientsCount: 2,
[1]       opts: [Object],
[1]       ws: [WebSocketServer],
[1]       [Symbol(shapeMode)]: false,
[1]       [Symbol(kCapture)]: false
[1]     },
[1]     [Symbol(shapeMode)]: false,
[1]     [Symbol(kCapture)]: false
[1]   },
[1]   name: '/',
[1]   adapter: Adapter {
[1]     _events: [Object: null prototype] {},
[1]     _eventsCount: 0,
[1]     _maxListeners: undefined,
[1]     nsp: [Circular *1],
[1]     rooms: Map(3) {
[1]       '_RFqSXfU5p-SW6nMAAAD' => [Set],
[1]       'Fqro0Hbf3WbC2tIkAAAF' => [Set],
[1]       [Object] => [Set]
[1]     },
[1]     sids: Map(2) {
[1]       '_RFqSXfU5p-SW6nMAAAD' => [Set],
[1]       'Fqro0Hbf3WbC2tIkAAAF' => [Set]
[1]     },
[1]     encoder: Encoder { replacer: undefined },
[1]     [Symbol(shapeMode)]: false,
[1]     [Symbol(kCapture)]: false
[1]   },
[1]   [Symbol(shapeMode)]: false,
[1]   [Symbol(kCapture)]: false
[1] }
 */
