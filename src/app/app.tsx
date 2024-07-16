import React from 'react';
import './app.scss';
import './reset.scss';
import { Container } from '../shared/container/container';
import { Home } from '../pages/home/home';
import { store } from './stores/store';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Container>
                    <Home />
                </Container>
            </div>
        </Provider>
    );
}

export default App;
