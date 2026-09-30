import "@vitejs/plugin-react/preamble"
import { createRoot } from "react-dom/client"
import "./assets/main.css"
import { App } from "./app.tsx"

createRoot(document.querySelector("#app")!).render(<App />)
