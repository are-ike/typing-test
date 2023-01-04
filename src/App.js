import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./components/modal";
import Text from "./components/text";
import Timer from "./components/timer";

function App() {
  const [isTestOver, setIsTestOver] = useState(false);
  const [data, setData] = useState({
    wpm: null,
    accuracy: null,
  });

  return (
    <div className="container">
      <Modal showModal={isTestOver && data.wpm !== null} data={data} />
      <Timer setIsTestOver={setIsTestOver}  />
      <Text setData={setData} isTestOver={isTestOver}/>
    </div>
  );
}

export default App;
