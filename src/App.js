import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Formulario from "./components/Formulario.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Error404 } from "./components/Error404.jsx";
import Persona from "./components/Persona.jsx";
import Nav from "./nav/Nav.jsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<Formulario />}/>
          <Route path="/personas" element={ <Persona/> }/>
          <Route path="*" element={<Error404 />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
