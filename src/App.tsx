import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import IndexRoute from './routes/IndexRoute';
import ArticleRoute from './routes/ArticleRoute';
import AboutRoute from './routes/AboutRoute';
import AccountRoute from './routes/AccountRoute';
import {
  CHeader,
} from './components/CHeader';

// 是否需要有个组件来管理 header 配置？
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/account" />
        <Route path="*" component={CHeader}/>
      </Switch>
      <Switch>
        <Route path="/article" component={ArticleRoute} />
        <Route path="/about" component={AboutRoute} />
        <Route path="/account" component={AccountRoute} />
        <Route exact path="/" component={IndexRoute} />
      </Switch>
    </div>
  );
}

export default App;
