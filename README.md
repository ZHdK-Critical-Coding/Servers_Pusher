# Pusher p5 example

A p5 sketch (no canvas — just a text field + Send button) that pushes a
message to a Pusher channel. The browser can't trigger Pusher events itself
(that needs the app secret), so the flow is:

```
p5 sketch (Client/)  --POST /message-->  Node server (Server/)  --trigger-->  Pusher channel "chat"
```

## 1. Get Pusher keys

Create a free app at https://pusher.com (Channels). Copy its keys from
**App Keys**.

## 2. Run the server

```bash
cd Server
npm install
cp .env.example .env      # then paste your real keys into .env
npm start                 # -> http://localhost:3000
```

## 3. Open the sketch

Open `Client/index.html` in a browser (e.g. with VS Code's "Live Server", or
the p5 web editor). Type a message, click **Send**.

## 4. See it arrive

Watch the **Debug Console** for your app on pusher.com: each Send shows up as
a `new-message` event on the `chat` channel. (A subscriber would listen for
that same channel + event.)
