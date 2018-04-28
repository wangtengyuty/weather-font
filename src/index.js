import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
import registerServiceWorker from './registerServiceWorker';
import Index from "./component";

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
