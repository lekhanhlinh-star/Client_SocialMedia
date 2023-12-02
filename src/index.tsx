import {ColorModeScript} from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import {App} from "./App"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import {DevSupport} from "@react-buddy/ide-toolbox";
import them from "./them";

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

root.render(
    <>
        <ColorModeScript initialColorMode={them.config.initialColorMode}/>

            <App/>

    </>,
)

// If you want your AI to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your AI, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

