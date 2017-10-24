import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Header from './core/header/header';
import Footer from './core/footer/footer';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Tasks from './pages/tasks/tasks';

class Main extends React.Component {

    render() {
        return (
            <Router>
                <div className="app">
                    <Header></Header>
                    <main>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/tasks" component={Tasks} />
                    </main>
                    <Footer></Footer>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
