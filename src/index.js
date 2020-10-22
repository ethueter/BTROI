import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const Home = () => {
    
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}

ReactDOM.render(<Home />, document.getElementById("root"));