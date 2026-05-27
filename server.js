// Minimal Pusher relay server.
// The p5 sketch can't trigger a Pusher event directly: that needs the app
// secret, which must never live in browser code. So the sketch POSTs its
// message here, and this server triggers the event on the channel.

const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");
require("dotenv").config();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

const app = express();
app.use(cors()); // let the sketch (served from a different port) call us
app.use(express.json());

// The sketch sends { message: "..." } here.
app.post("/message", async (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).json({ error: "no message" });
  }

  // Broadcast it on the "chat" channel as a "new-message" event.
  await pusher.trigger("chat", "new-message", { message });
  console.log("sent:", message);

  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
