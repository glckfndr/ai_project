# Gift Genie 🧞

An AI-powered gift idea generator. Describe the person you're shopping for — their interests, budget, location, or any constraints — and the Genie conjures thoughtful, specific gift suggestions with guidance on how to get them.

## Features

- Conversational prompt input with auto-resizing textarea
- AI-generated gift ideas formatted in structured Markdown
- Streamed suggestions rendered as sanitized HTML
- Animated "Rub the Lamp" button with loading state
- Clarifying follow-up questions generated alongside each response

## Tech Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Frontend | Vanilla JS, Vite                     |
| Backend  | Node.js, Express                     |
| AI       | OpenAI-compatible API (configurable) |
| Markdown | marked + DOMPurify                   |

## Project Structure

```
├── index.html        # App shell
├── index.js          # Frontend logic
├── style.css         # Styles
├── server.js         # Express API server
├── utils.js          # Shared utilities
├── vite.config.js    # Vite config with API proxy
├── assets/           # Static assets (SVGs)
└── .env              # Environment variables (not committed)
```

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI-compatible API key

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable   | Description                       | Example                     |
| ---------- | --------------------------------- | --------------------------- |
| `AI_URL`   | Base URL of the AI provider       | `https://api.openai.com/v1` |
| `AI_MODEL` | Model name to use for completions | `gpt-4o-mini`               |
| `AI_KEY`   | Your API key                      | `sk-...`                    |

> **Note:** Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the App

**Development** (frontend + backend with hot reload):

```bash
npm run start
```

This starts:

- Vite dev server at `http://localhost:5173`
- Express API server at `http://localhost:3001`

API requests from the frontend are proxied to the backend automatically.

**Backend only:**

```bash
npm run server
```

**Frontend only:**

```bash
npm run client
```

### Production Build

```bash
npm run build
npm run preview
```

## How It Works

1. The user describes a gift recipient in the textarea and submits the form.
2. The frontend sends a `POST /api/gift` request to the Express server.
3. The server appends the message to a conversation history and calls the AI API.
4. The AI responds with structured Markdown gift suggestions.
5. The frontend renders the Markdown as sanitized HTML.

## API

### `POST /api/gift`

**Request body:**

```json
{ "userPrompt": "My friend loves hiking, budget $50" }
```

**Response:**

```json
{ "giftSuggestions": "## Trail Snack Bundle\n..." }
```
