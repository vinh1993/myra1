import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './LoginForm';
import Account from './Account';
import Help from './Help';
import Products from './Products';
import Profile from './Profile';
import ProductDetail from './ProductDetail';

import Index from './Public/Index';

import BrandList from './Administration/BrandList';
import Brand from './Administration/Brand';

import CatalogList from './Administration/CatalogList';
import Catalog from './Administration/Catalog';


class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Header key={1} />
        <Router>
          <Switch>
            <Route key={0} exact path="/" component={Index}/>

            <Route key={0} exact path="/tai-nghe-bluetooth" component={()=>(<Index type={1} />)} />
            <Route key={0} exact path="/tai-nghe-chup-tai" component={()=>(<Index type={2} />)} />

            <Route key={1} exact path="/admin" component={Home}/>
            <Route key={2} path="/login" component={Login}/>
            <Route key={3} path="/account" component={Account}/>
            <Route key={4} path="/help" component={Help}/>
            <Route key={5} path="/product" component={Products}/>
            <Route key={6} path="/productdetail" component={ProductDetail}/>
            <Route key={7} path="/profile" component={Profile}/>
            
            <Route key={7} path="/brandlist" component={BrandList}/>
            <Route key={7} path="/brand" component={Brand}/>

            <Route key={7} path="/cataloglist" component={CatalogList}/>
            <Route key={7} path="/catalog" component={Catalog}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AppRouter;

