import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './contact.scss';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      text: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: '', text: '' });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='contact'>
        <h2>Contact us</h2>
        <span>Please, inform your email and what do you need</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='text'
            type='text'
            value={this.state.text}
            handleChange={this.handleChange}
            label='Message'
            required
          />
          <CustomButton type='submit'> send </CustomButton>
        </form>
      </div>
    );
  }
}

export default Contact;