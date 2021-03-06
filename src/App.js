//Imports
import { Routes, Route } from 'react-router-dom';
import './App.scss';

//Components
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/signin/signin.component';



const Shop = () => {
  return (
    <p>I am the Shop page</p>
  );
  }

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={ <Home /> } />
        <Route path='shop' element={ <Shop /> } />
        <Route path='signin' element={<SignIn/>} />
      </Route>
    </Routes>
  )
}

export default App;
