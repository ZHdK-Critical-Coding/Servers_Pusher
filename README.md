# Node.js: Pusher Server

[Deutsch](README_DE.md)

A tiny Express server that relays messages from a p5 sketch to a Pusher
Channels app. The browser can't trigger Pusher events itself (that needs the
app secret, which must never live in browser code), so the sketch POSTs its
message here and the server triggers the event. Used by
[P5_Input_Pusher](https://github.com/ZHdK-Critical-Coding/P5_Input_Pusher).

```
P5_Input_Pusher/Client  --POST /message-->  this server  --trigger-->  Pusher "chat"  -->  P5_Input_Pusher/Display
```

## Installation

Requirements: Node.js and a free Channels app on https://pusher.com.

1. Create the Channels app and copy its keys from **App Keys**.
2. Install and configure:
   ```bash
   npm install
   cp .env.example .env      # paste app id, key, secret and cluster into .env
   ```

Settings in `.env`: `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`,
`PUSHER_CLUSTER` (default `eu`) and `PORT` (default 3000). `.env` is in
`.gitignore` — never commit it.

Packages (npm): express 4, cors 2, dotenv 16, pusher 5.

## How to Run

1. Start the server:
   ```bash
   npm start                 # -> http://localhost:3000
   ```
2. Open `Client/index.html` from
   [P5_Input_Pusher](https://github.com/ZHdK-Critical-Coding/P5_Input_Pusher)
   with Live Server, type a message and click **Send**.
3. Check the **Debug Console** of your app on pusher.com: each Send shows up
   as a `new-message` event on the `chat` channel.

## Coding Help

- **`server.js` → `new Pusher({...})`**: creates the Pusher client from the
  values in `.env` (loaded by `dotenv`).
- **`app.use(cors())`**: allows the sketch, which is served from another
  port, to call the server. `express.json()` parses the JSON body.
- **`app.post("/message")`**: expects `{ message: "..." }`, answers 400 if
  it is missing, otherwise calls `pusher.trigger("chat", "new-message",
  { message })`. Change the channel or event name here — the receiving
  sketch must subscribe to the same ones.
- **`app.listen(PORT)`**: starts the server on `PORT` from `.env` or 3000.
