import React, { Component } from "react";
import axios from "axios";
import {Form, Input,  Button, Select, TextArea } from "semantic-ui-react";

let endpoint = "http://localhost:8080";

const levels = [
  { key: 'b', text: 'Beginner', value: 'Beginner' },
  { key: 'i', text: 'Intermediate', value: 'Intermediate' },
  { key: 'a', text: 'Advanced', value: 'Advanced' },
]

const extras = [
  { key: 'n', text: 'None', value: 'None'},
  { key: 'd', text: 'Drop', value: 'Drop' },
  { key: 'i', text: 'Invert', value: 'Invert' },
  { key: 'b', text: 'Drop and Invert', value: 'Drop and Invert' },
]

class AddSkill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      link: "",
      description: "",
      tags: "",
      level: ""
      //items: []
    };
  }

 /* componentDidMount() {
    this.getSkill();
  }*/

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onChangeSelect = (event, value) => {
    this.setState({
      [value.name]: value.value
    });
  };

  onSubmit = () => {
    let { name, link, description, tags, level } = this.state;

    console.log("NAME",name);

    if (name) {
      axios
        .post(
          endpoint + "/api/skill",
          {
            name,
            link,
            description,
            tags,
            level
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          //this.getSkill();
          this.setState({
            name: "",
            link: "",
            description: "",
            tags: "",
            level: ""
          });
          console.log(res);
        });
    }

  };

  render() {
    return (
    <div className="row">
      <Form onSubmit={this.onSubmit}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            placeholder="Skill Name"
          />
          <Form.Field
            control={Input}
            name="link"
            value={this.state.link}
            onChange={this.onChange}
            placeholder="Example link"
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          placeholder="Brief description..."
        />
        <Form.Group widths='equal'>
          <Form.Dropdown
            control={Select}
            name="level"
            options={levels}
            onChange={this.onChangeSelect}
            placeholder='Choose a level...'
          />
          <Form.Dropdown
            control={Select}
            name="tags"
            options={extras}
            onChange={this.onChangeSelect}
            placeholder='Drop or Invert?'
          />
          <Form.Field control={Button} color='teal' content='Add Skill'/>
        </Form.Group>
      </Form>
    </div>
    );
  }
}

export default AddSkill;