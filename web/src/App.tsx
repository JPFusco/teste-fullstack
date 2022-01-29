import './App.css';
import Home from './pages/Home';
import GlobalContextProvider from './contexts/GlobalContext';

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Home />
      </GlobalContextProvider>
    </div>
  );
}

export default App;
