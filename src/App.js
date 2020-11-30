import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {checkUserSession} from './redux/user/user.actions'

import {selectCurrentUser} from './redux/user/user.selector';

import './App.css';
import Header from './components/header/header.component';
import HomePage from  './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Contact from './pages/contactpage/contactpage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';



const App = ({checkUserSession})=> {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])
  
    return (
      <div>
      <Header/>
  
      <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/contact' component={Contact} />
           <Route  exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }/>
            <Route exact path='/checkout' component={CheckoutPage}/>
        </Switch>
      </div>
    
    
    
      )
  }
 



const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
  
})
const mapStateToProps = (createStructuredSelector({currentUser: selectCurrentUser})) 

export default connect(mapStateToProps, mapDispatchToProps)(App);
