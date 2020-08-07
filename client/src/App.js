import React, {Component} from "react";
import "./App.css";
import { Container, Header } from "semantic-ui-react";
import SkillList from "./Skill-List";
import { Menu } from 'semantic-ui-react'
import AddSkill from "./Add-Skill";

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      view: "Skills",
      showSkills: true,
      showAddSkill: false,
      showAbout: false
    }
  }

  handleMenuClick = (e, {name}) => {
    this.setState({ view: name });

    switch (name) {
      case "Skills":
        this.setState({ showSkills: true});
        this.setState({ showAddSkill: false});
        this.setState({ showAbout: false});
        break;
      case "Add Skill":
        this.setState({ showSkills: false});
        this.setState({ showAddSkill: true});
        this.setState({ showAbout: false});
        break;
      case "About":
        this.setState({ showSkills: false});
        this.setState({ showAddSkill: false});
        this.setState({ showAbout: true});
        break;     
      default:
        break;
    }
  }

  render () {
    const {view, showSkills, showAddSkill, showAbout} = this.state;
  return (
    <div>
      <Container>
      <div className="row" style={{ padding: 32 }}>
        <Header className="header" as="h1" textAlign="left">
          Aerial Lingo
        </Header>
      </div>
      <Menu pointing secondary>
          <Menu.Item
            name='Skills'
            active={view === 'Skills'}
            onClick={this.handleMenuClick}
          />
          <Menu.Item
            name='Add Skill'
            active={view === 'Add Skill'}
            onClick={this.handleMenuClick}
          />
          <Menu.Item
            name='About'
            active={view === 'About'}
            onClick={this.handleMenuClick}
          />
      </Menu>
      </Container>
      <Container>
        {showSkills && <SkillList />}
        {showAddSkill && <AddSkill />}
        {showAbout && 
        <div style={{padding: 16}}>       
      <p>Identifying an aerial skill can be really difficult! This site hopes to help make discussions easier
          by providing aerialists with an easy way to lookup skill names. Several different skills may come up 
          under one name. That's okay! Hopefully one of them matches what you had in mind. If not, maybe take
          the time to add it, along with a link showing an example. Future aerialists would appreciate it!
        </p>
        <p>Super fun disclaimer time! All descriptions and examples are provided to help with conversations. 
          They are not designed to teach new skills. The best way to learn how to perform new skills, tricks, 
          and transitions is through an instructor.
        </p>
        </div>}
      </Container>
    </div>
  );
  }
}
export default App;
