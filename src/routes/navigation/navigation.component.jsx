
//React
import { Fragment, useContext } from 'react';
import {Outlet, Link } from 'react-router-dom';

//Images | SVGs
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

//Context
import { UserContext } from '../../contexts/user.context';

//Sign Out Method
import {signOutAuthUser} from '../../utils/firebase/firebase.utils';

//Styling
import './navigation.styles.scss';


const Navigation = () => {
  
  const { currentUser} = useContext(UserContext);

  return (
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <CrwnLogo className="logo"/>
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>SHOP</Link>
            <Link className='nav-link' to='/shop'>CONTACT</Link>
            {currentUser ?
              (<span className='nav-link' onClick={signOutAuthUser}>SIGN OUT</span>)
              :
              (<Link className='nav-link' to='/auth'>SIGN IN</Link>)
            }
            
            <Link className='nav-link' to='/shop'>BAG</Link>
          </div>
        </div>
        
        <Outlet/>
      </Fragment>
    );
  }

export default Navigation