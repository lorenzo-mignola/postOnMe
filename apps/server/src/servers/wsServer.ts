import ws from "ws";
import server from "./httpServer";

const wss = new ws.Server({ server });

export default wss;
