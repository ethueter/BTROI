import React from 'react';
import ReactDom from 'react-dom';

const Home = () => {
    
    return (
        <div>
            <h1>Begining of Tech Assessment</h1>
        </div>
    )
}

// class Home extends React.Component {
//     render() {
//         return <h1>BoomTown</h1>
//     }
// };

ReactDOM.render(<Home />, document.getElementById("root"));