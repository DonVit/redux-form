import React, {Component} from 'react';
import * as api from './utils/api';
import SyncValidationForm from './forms/SyncValidationForm';
import store from './forms/store';
import {Provider} from 'react-redux';
import Notifications, {notify} from 'react-notify-toast';


class ProjectsFeedingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    ProjectsFeedingForm.handleSubmit = ProjectsFeedingForm.handleSubmit.bind(
        this);
  }

  static handleSubmit(values) {
    console.log(values);
    this.addProjectFront(values);
  }

  addProjectFront(newProject) {
    api.addProject(newProject).then(function() {
      let myColor = {background: '#0dcc06', text: '#FFFFFF'};
      notify.show('Project is added successfully', 'custom', 5000, myColor);
    }).catch(function(error) {
      console.log(error);
      notify.show('Error happen', 'error', 5000);
    });
  }


  render() {
    return (
        <div className="ProjectsFeedingForm">
          <Notifications/>
          <Provider store={store}>
            <SyncValidationForm onSubmit={ProjectsFeedingForm.handleSubmit}/>
          </Provider>
        </div>
    );
  }
}

export default ProjectsFeedingForm;