import "./app.scss"
import UserControls from "../UserControls/UserControls"
import Opponent from "../Opponent/Opponent";
import Status from "../Status/Status";
function App() {
  return (
    <div className="App">
      <UserControls />
      <Status />
      <Opponent />
    </div>
  );
}

export default App;
