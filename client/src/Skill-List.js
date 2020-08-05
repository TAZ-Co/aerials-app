import React, { Component } from "react";
import axios from "axios";
import { Card, Accordion, Form, Input, Icon} from "semantic-ui-react";
import AddSkill from "./Add-Skill";

let endpoint = "http://localhost:8080";

class SkillList extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  constructor(props) {
    super(props);

    this.state = {
      //name: "",
      items: []
    };
  }

  componentDidMount() {
    this.getSkill();
  }

  /*onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };*/

  onSubmit = () => {
    /*let { name } = this.state;
    
    if (name) {
      axios
        .post(
          endpoint + "/api/skill",
          {
            name,

          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          this.getSkill();
          this.setState({
            name: ""
          });
          console.log(res);
        });
    }*/
  };

  getSkill = () => {
    axios.get(endpoint + "/api/skill").then(res => {
      console.log(res);
      if (res.data) {
        this.setState({
          items: res.data.map(item => {
            let color = "blue";
            console.log("ITEM ", item.level);

            switch (item.level) {
              case "Beginner": 
                color = "teal";
                break;
              case "Intermediate": 
                color = "violet";
                break;
              case "Advanced": 
                color = "pink";
                break;
              default:
                break;
            }

            /*if (item.status) {
              color = "green";
            }*/
            return (
              <Card key={item._id} color={color}>
                <Card.Content>
                  <Card.Header>
                    <div style={{ wordWrap: "break-word" }}>{item.name}
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteSkill(item._id)}                  
                    />
                    </div>
                  </Card.Header>
                  <Card.Meta>
                    <a href={item.link}>Example</a>
                  </Card.Meta>
                  <Card.Description> 
                    {item.description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  {item.level}
                  <span className="right floated">{item.tags}</span>
                </Card.Content>                
              </Card>
            );
          })
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  deleteSkill = id => {
    axios
      .delete(endpoint + "/api/deleteSkill/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res);
        this.getSkill();
      });
  };
  render() {
    const { activeIndex } = this.state
    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          About this site
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
        <p>Identifying an aerial skill can be really difficult! This site hopes to help make discussions easier
          by providing aerialists with an easy way to lookup skill names. Several different skills may come up 
          under one name. That's okay! Hopefully one of them matches what you had in mind. If not, maybe take
          the time to add it, along with a link showing an example. Future aerialists would appreciate it!
        </p>
        <p>Super fun disclaimer time! All descriptions and examples are provided to help with conversations. 
          They are not designed to teach new skills. The best way to learn how to perform new skills, tricks, 
          and transitions is through an instructor.
        </p>
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Add a skill
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
        <AddSkill/>
        </Accordion.Content>
        <div className="row" style={{padding: 16}}>
          <Form>
            <Input fluid action='Search' placeholder='Search...' />
          </Form>
        </div>
        <div className="row">
          <Card.Group centered>{this.state.items}</Card.Group>
        </div>
      </Accordion>
    );
  }
}

export default SkillList;