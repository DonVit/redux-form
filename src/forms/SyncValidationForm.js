import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Panel,
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

const FILE_FIELD_NAME = 'picture';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  const dropzoneRef = React.createRef();
    const baseStyle = {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: '#666',
      borderStyle: 'dashed',
      borderRadius: 5
    };
    const activeStyle = {
      borderStyle: 'solid',
      borderColor: '#6c6',
      backgroundColor: '#eee'
    };
    const rejectStyle = {
      borderStyle: 'solid',
      borderColor: '#c66',
      backgroundColor: '#eee'
    };
    const thumbsContainer = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 16
    };
    const thumb = {
      display: 'inline-flex',
      borderRadius: 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: 'border-box'
    };
    const thumbInner = {
      display: 'flex',
      minWidth: 0,
      overflow: 'hidden'
    }
    const img = {
      display: 'block',
      width: 'auto',
      height: '100%'
    };

  return (
      <div className="text-center">
        <Grid>
          <Row>
            <Dropzone
                name={field.name}
                onDrop={(filesToUpload, e) => {field.input.onChange(filesToUpload);}}
                ref={dropzoneRef}
            >
              {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                let styles = {...baseStyle}
                styles = isDragActive ? {...styles, ...activeStyle} : styles
                styles = isDragReject ? {...styles, ...rejectStyle} : styles

                return (
                  <div
                    {...getRootProps()}
                    style={styles}
                  >
                    <input {...getInputProps()} />
                    <div>
                      {isDragAccept ? 'Drop' : 'Drag'} files here...
                    </div>
                    {isDragReject && <div>Unsupported file type...</div>}
                  </div>
                )
              }}
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}

            <aside style={thumbsContainer}>
              {files && Array.isArray(files) && files.map(file => (
                     <div style={thumb} key={file.name}>
                       <div style={thumbInner}>
                         <img
                           src={URL.createObjectURL(file)}
                           style={img}
                         />
                       </div>
                     </div>
                   ))}
            </aside>
          </Row>
        </Grid>
      </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 200) {
    errors.name = 'Must be 200 characters or less';
  }
  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 200) {
    errors.description = 'Must be 200 characters or less';
  }

  if (!values.url) {
    errors.url = 'Required';
  } else if (values.url.length > 150) {
    errors.url = 'Must be 150 characters or less';
  }
  if (!values.about) {
    errors.about = 'Required';
  } else if (values.about.length > 500) {
    errors.about = 'Must be 500 characters or less';
  }
  if (!values.picture) {
    errors.picture = 'Required';
  }

  return errors;
};

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <div>
        <FormControl  {...input} placeholder={label} type={type}/>
        {touched && ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </FormGroup>
);

const renderTextArea = ({input, meta: {touched, error, warning}}) => (
    <FormGroup>
      <ControlLabel>Content</ControlLabel>
      <div>
        <FormControl componentClass="textarea"
                     placeholder="write about the project" {...input} rows="10"
                     cols="40"/>
        {touched && ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </FormGroup>
);

const SyncValidationForm = (props) => {
  const {handleSubmit, pristine, reset, submitting} = props;
  return (
      <Grid style={{margin: '20px'}}>
        <Row className="text-left">
          <Panel>
            <form onSubmit={handleSubmit}>
              <Field name="name" type="text" component={renderField}
                     label="Name"/>
              <Field name="description" type="text" component={renderField}
                     label="Description"/>
              <Field name="url" type="text" component={renderField}
                     label="Url"/>
              <Field name="about" type="text" component={renderTextArea}
                     label="About"/>
              <Field
                  name={FILE_FIELD_NAME} type="file"
                  component={renderDropzoneInput}
              />

              <Grid className="text-center">
                <Row>
                  <Col sm={12} md={12}>
                    <Button bsStyle="primary" type="submit"
                            disabled={submitting} style={{margin: '5px'}}>Submit</Button>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} md={12}>

                    <Button bsStyle="danger" type="button"
                            disabled={pristine || submitting}
                            onClick={reset} style={{margin: '5px'}}>Clear
                      Values
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </form>
          </Panel>
        </Row>
      </Grid>
  );
};

export default reduxForm({
  form: 'syncValidation',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(SyncValidationForm);