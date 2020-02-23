import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {SignIn} from "./components/SignIn/SignIn";
import {HashPage} from "./components/HashPage/HashPage";
import {Register} from "./components/Register/Register";

/**
 * Main with router
 */
class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route exact path="/" component={SignIn}/>
                        <Route path="/hash" component={HashPage}/>
                        <Route path="/register" component={Register}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
