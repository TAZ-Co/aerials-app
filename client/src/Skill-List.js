import React, { Component } from "react";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:8080";

class SkillList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      items: []
    };
  }

  componentDidMount() {
    this.getSkill();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = () => {
    let { name } = this.state;
     console.log("pRINTING task", this.state);
    if (name) {
      axios
        .post(
          endpoint + "/api/skill",
          {
            name
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
    }
  };

  getSkill = () => {
    axios.get(endpoint + "/api/skill").then(res => {
      console.log(res);
      if (res.data) {
        this.setState({
          items: res.data.map(item => {
            let color = "yellow";

            /*if (item.status) {
              color = "green";
            }*/
            return (
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={{ wordWrap: "break-word" }}>{item.name}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => this.deleteSkill(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
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
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            Aerial Skills
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              fluid
              placeholder="Create Skill"
            />
            {/* <Button >Create Task</Button> */}
          </Form>
        </div>
        <div className="row">
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default SkillList;