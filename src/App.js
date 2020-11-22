import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {setCurrentUser} from './redux/user/user.actions';

import {selectCurrentUser} from './redux/user/user.selector';

import './App.css';
import Header from './components/header/header.component';
import HomePage from  './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Contact from './pages/contactpage/contactpage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { auth, createUserProfileDocument} from './firebase/firebase.utils';


class App extends React.Component {
 
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } 

        setCurrentUser(userAuth);
      
      
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
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
        </Switch>
      </div>
    
    
    
      )
  }
 
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

const mapStateToProps = (createStructuredSelector({currentUser: selectCurrentUser})) 

export default connect(mapStateToProps, mapDispatchToProps)(App);
