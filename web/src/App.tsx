import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import GlobalContextProvider from './contexts/GlobalContext';

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <SignIn />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
