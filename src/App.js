import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import { connect } from 'react-redux';
import * as actions from './store/actions/authActions';


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
          <Layout>
          </Layout>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default  connect (null, mapDispatchtoProps) (App);
