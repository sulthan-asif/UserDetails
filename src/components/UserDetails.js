import React, {Component} from 'react';
import { Button, Table, Modal, Form } from 'semantic-ui-react'; 
import Popup from './Popup';
import axios from 'axios';

export default class UserDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: '',
      name:'',
      username: '',
      nameErrors: [],
      errors: [],
      email: '',
      address: '',
      phone: '',
      company: '',
      isOpen: false,
    }
    this.handleDetailChanged = this.handleDetailChanged.bind(this);
    this.handleDetailDeleted = this.handleDetailDeleted.bind(this);
  }

  togglePopup = () => {
    this.setState({ isOpen: true });
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  onChange = (e) => {
    const { name, value } = e.target;
    const nameErrors = `${name}Errors`;
    this.setState({ [name]: value, [nameErrors]: [], errors: [] });
  }


  handleDetailChanged(i, event) {
    const users = this.state.users;
    users[i]  = event.target.value;

    this.setState({
      users: users
    });
  }

  handleDetailDeleted(i) {
    const users = this.state.users;

    users.splice(i, 1);

    this.setState({
      users: users
    });
  }

  /*renderForm() {
    const { isOpen } = this.state;
    return(
      <div>
        <Modal
          closeIcon
          size="tiny"
          open={isOpen}
          trigger={(
                      <Button
                        content="Edit"
                      />
                )}
                    onClose={() => this.setState({
                      isOpen: false,
                    })}
                    onOpen={() => this.setState({ isOpen: true })}
                  >
                  <Modal.Content>
                  <Form onSubmit={this.onSubmit}>
                          <Form.Field>
                            <Form.Input
                              name="id"
                              type="text"
                              placeholder="id"
                              onChange={this.onChange}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="name"
                              type="text"
                              placeholder="name"
                              onChange={this.onChange}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="username"
                              type="text"
                              placeholder="username"
                              onChange={this.onChange}
                            />
                            </Form.Field>
                            </Form>
                            </Modal.Content>
                          <Modal.Actions>
                          <div>
                            <Button content="Submit" />
                          </div>
                          </Modal.Actions>  

        </Modal>
      </div>
    )
  }*/

  update = (e) => {
    e.preventDefault();
    const UserDetails = {
        id: this.state.id,
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        address: this.state.address,
        phone: this.state.phone,
        company: this.state.company,
    }
    axios.put('https://jsonplaceholder.typicode.com/users/{this.state.users.id}', UserDetails)
    .then(res => console.log(res.data));
}

  renderRows() {
    return  this.state.users.map(user => {
              return (
                <Table celled key={"user-"}>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.address.street}</Table.Cell>
                      <Table.Cell>{user.phone}</Table.Cell>
                      <Table.Cell>{user.company.name}</Table.Cell>
                      <Table.Cell>
                      <Button color='red'
                            onClick={this.togglePopup}
                        >
                          Edit
                        </Button>
                        {this.state.isOpen && <Popup
                        content={
                              <div>
                          <Form onSubmit={this.onSubmit}>
                          <Form.Field>
                            <Form.Input
                              name="id"
                              type="text"
                              placeholder="id"
                              onChange={this.onChange}
                              value={user.id}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="name"
                              type="text"
                              placeholder="name"
                              onChange={this.onChange}
                              value={user.name}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="username"
                              type="text"
                              placeholder="username"
                              onChange={this.onChange}
                              value={user.username}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="email"
                              type="text"
                              placeholder="email"
                              onChange={this.onChange}
                              value={user.email}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="address"
                              type="text"
                              placeholder="address"
                              onChange={this.onChange}
                              value={user.address.street}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="phone"
                              type="text"
                              placeholder="phone"
                              onChange={this.onChange}
                              value={user.phone}
                            />
                            </Form.Field>
                            <Form.Field>
                             <Form.Input
                              name="company"
                              type="text"
                              placeholder="company"
                              onChange={this.onChange}
                              value={user.company.name}
                            />
                            </Form.Field>
                            <Button color='blue'
                            onClick={this.update}
                        >
                          Submit
                        </Button>
                            </Form>
                              </div>
                              }
                              />}
                      </Table.Cell>
                      <Table.Cell>
                        <Button color='red'
                            onClick={(row) => {
                              let data = this.state.users;
                              //console.log(this.state.data[row.index]);
                              data.splice(row.index, 1)
                              this.setState({data})
                            }}
                        >
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              );
            });
  }

  render() {
    return (
      <div>
        <Table celled padded>
       <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                          item
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                          Actions
                      </Table.HeaderCell>
                    </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {this.renderRows()}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        </Table>
      </div>
    );
  }
}
