import React from "react";
import "./App.css";
import { Container, Divider, Header } from "semantic-ui-react";
import SkillList from "./Skill-List";

function App() {
  return (
    <div>
      <Container>
      <div className="row" style={{ padding: 40 }}>
        <Header className="header" as="h1" textAlign="left">
          Aerial Lingo
        </Header>
      </div>
      <Divider/>
      </Container>

      <Container>
        <SkillList />
      </Container>
    </div>
  );
}
export default App;
