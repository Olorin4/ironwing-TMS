import React from "react";
import { Button } from "ui-components";

function App() {
    return (
        <div>
            <h1>React Desktop App</h1>
            <Button title="Click Me" onClick={() => alert("Button Clicked!")} />
        </div>
    );
}

export default App;
