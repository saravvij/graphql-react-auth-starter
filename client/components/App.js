import React from "react";
import Header from "./Header";

export default function App(props) {
  return (
    <div>
      <Header />
      <main className="container">{props.children}</main>
    </div>
  );
}
