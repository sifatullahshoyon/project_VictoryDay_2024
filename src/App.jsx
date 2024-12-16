import React from "react";
import Header from "./components/Header";

import ImageUploadWithFrame from "./components/ImageUploadWithFrame";

const App = () => {
  return (
    <div className="container mx-auto my-5">
      <Header />
      <div className="flex items-center justify-center h-[90vh] mt-52">
        <ImageUploadWithFrame />
      </div>
    </div>
  );
};

export default App;
