import axios from 'axios';

const addProject = (newProject) => {
  let formData = new FormData();
  formData.append('name', newProject.name);
  formData.append('about', newProject.about);
  formData.append('url', newProject.url);
  formData.append('description', newProject.description);
  formData.append('picture', newProject.picture[0]);

  return axios.post(`http://localhost:3008/projects`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => {
    // JSON responses are automatically parsed.
  }).catch(e => {
    this.errors.push(e);
  });
};

export {addProject};