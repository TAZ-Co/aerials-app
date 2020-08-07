import React, { Component } from "react";
import axios from "axios";
import { Card, Input, Icon, Button} from "semantic-ui-react";

let endpoint = "http://localhost:8080";

export default class SkillList extends Component {

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

  onSubmit = () => {

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

  search = () => {
    console.log("SEARCH");
  };

  render() {
    return (
      <div>
        <div className="row" style={{padding: 16}}>
          <Input 
            fluid 
            action={
              <Button 
                content='Search'
                onClick={() => this.search()}
              />
            } 
            placeholder='Search...' 
          />
        </div>
        <div className="row">
          <Card.Group centered>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}