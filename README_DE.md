# Node.js: Pusher Server

[English](README.md)

Ein kleiner Express-Server, der Nachrichten von einem p5-Sketch an eine
Pusher-Channels-App weiterleitet. Der Browser kann selbst keine
Pusher-Events auslösen (dafür braucht es das App-Secret, das nie im
Browser-Code stehen darf). Deshalb schickt der Sketch seine Nachricht per
POST hierher, und der Server löst das Event aus. Wird von
[P5_Input_Pusher](https://github.com/ZHdK-Critical-Coding/P5_Input_Pusher)
verwendet.

```
P5_Input_Pusher/Client  --POST /message-->  dieser Server  --trigger-->  Pusher "chat"  -->  P5_Input_Pusher/Display
```

## Installation

Voraussetzungen: Node.js und eine kostenlose Channels-App auf
https://pusher.com.

1. Die Channels-App erstellen und die Keys unter **App Keys** kopieren.
2. Installieren und konfigurieren:
   ```bash
   npm install
   cp .env.example .env      # App-ID, Key, Secret und Cluster in .env eintragen
   npm start                 # -> http://localhost:3000
   ```
3. `Client/index.html` aus
   [P5_Input_Pusher](https://github.com/ZHdK-Critical-Coding/P5_Input_Pusher)
   mit Live Server öffnen, eine Nachricht eingeben und auf **Send** klicken.
4. In der **Debug Console** der App auf pusher.com nachschauen: Jedes Send
   erscheint als `new-message`-Event auf dem Kanal `chat`.

Einstellungen in `.env`: `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`,
`PUSHER_CLUSTER` (Standard `eu`) und `PORT` (Standard 3000). `.env` steht in
`.gitignore` – nie committen.

Pakete (npm): express 4, cors 2, dotenv 16, pusher 5.

## Coding-Hilfe

- **`server.js` → `new Pusher({...})`**: erstellt den Pusher-Client mit den
  Werten aus `.env` (geladen mit `dotenv`).
- **`app.use(cors())`**: erlaubt dem Sketch, der von einem anderen Port
  ausgeliefert wird, den Server aufzurufen. `express.json()` liest den
  JSON-Body.
- **`app.post("/message")`**: erwartet `{ message: "..." }`, antwortet mit
  400, wenn sie fehlt, und ruft sonst `pusher.trigger("chat", "new-message",
  { message })` auf. Kanal- oder Event-Namen hier ändern – der empfangende
  Sketch muss dieselben abonnieren.
- **`app.listen(PORT)`**: startet den Server auf `PORT` aus `.env` oder 3000.
