import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BidList from "./components/BidLists";
import AddBid from "./components/AddBid";
import EditBid from "./components/EditBid";
 
function App() {
  return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route exact path="/" element={<BidList/>}>
            </Route>
            <Route path="/add" element={<AddBid/>}>
            </Route>
            <Route path="/edit/:id" element={<EditBid/>}>
            </Route>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}
 
export default App;