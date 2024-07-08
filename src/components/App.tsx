import '../assets/app.sass';
import Home from './Home';
import NavBar from './NavBar';


const App = () => {
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow
  const color = "teal";

  return (
    <>
    <NavBar color={color}/>
    <Home color={color}/>
    </>
  );
}

export default App;