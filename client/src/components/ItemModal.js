import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  // ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemAction";
import PropTypes from "prop-types";

class ItemModal extends React.Component {
  state = {
    modal: false,
    name: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };

    //Add item via AddItem action
    this.props.addItem(newItem);

    this.toggle();
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        {isAuthenticated ? (
          <Button color="dark" className="ml-4 mb-3" onClick={this.toggle}>
            Add Item
          </Button>
        ) : (
          <h4 className="mb-3 ml-3">Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Shipping item"
                  onChange={this.onChange}
                />
                <Button color="dark" block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);
