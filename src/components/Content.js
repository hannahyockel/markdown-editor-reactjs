import React, { useState } from "react";

function Content() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="Content">
      <header className="">
        <p className="text-info">{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default Content;
