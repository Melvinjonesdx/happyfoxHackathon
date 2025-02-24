import logo from './logo.svg';
import './App.css';
import CollegeMap from "./components/CollegeMap";

function App() {
  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl font-bold text-center p-4">College Map</h1>
      <CollegeMap />
    </div>
  );
}

export default App;
