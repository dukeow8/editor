import React, { Component }from 'react';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import {createStore} from "redux"
import commentReducer from './reducer/comments'
import CommentApp from './container/CommentApp'

const store = createStore(commentReducer)

    class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <CommentApp />
            </Provider>

        )
    }
}

ReactDOM.render( <Provider store={store}>
	<React.StrictMode>
		<App />
		<CommentApp />
	</React.StrictMode>,
	</Provider>,
	document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

