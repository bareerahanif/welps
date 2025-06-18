# Welps


-------------------------
How It Works
-------------------------
1. You type in a file (e.g., .py, .js, etc.)
2. The extension sends your current line (linePrefix) to a local backend at http://localhost:3000/complete
3. The backend forwards it to the Claude API
4. The Claude response is returned as ghost text in the editor

-------------------------
Project Structure
-------------------------
welps/

├── backend/              # Node.js + Express backend

│   ├── index.js

│   └── .env              # (contains your Claude API key)

├── src/extension.ts      # VS Code extension logic

├── out/extension.js      # Compiled code (after tsc)

├── package.json          # Extension config

├── tsconfig.json

└── README.txt            

-------------------------
Getting Started
-------------------------
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/welps.git
   cd welps

2. Install dependencies:
    ```bash
   npm install

2. Setup the backend
    ```bash
   cd backend
   npm install

4. Create a .env file inside backend/:
ANTHROPIC_API_KEY=your_actual_claude_api_key_here

5. Run the backend server
   ```bash
   index.js

It should say:
  - Backend running at http://localhost:3000

### Running the VS Code Extension

1. Open the root welps/ folder in VS Code.

2. Press F5 to launch the Extension Development Host.

3. Open/ Create any .js or .py file and start typing something like:

    ```bash
   def greet
  If it works, you’ll see ghost text suggestions inline.


-------------------------
Test Backend Manually
-------------------------
  ```bash
    curl -X POST http://localhost:3000/complete \
    -H "Content-Type: application/json" \
    -d '{"prompt": "def greet"}'
