import React from "react";
import Boop from "./boop-component/Boop";
import CreateBoop from "./CreateBoop";
import Header from "./header-component/Header";

function App() {
  return (
    <>
      <Header />
      <Boop />
      <CreateBoop />
    </>
  );
}

export default App;
