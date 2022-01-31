import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalContextProvider from './contexts/GlobalContext';

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <SignUp />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
