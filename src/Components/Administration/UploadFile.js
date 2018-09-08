import React from 'react';
import DataUtils from '../../Utils/DataUtils';

import { FormGroup, HelpBlock,
    ControlLabel, FormControl
} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
class UploadFile extends React.Component{
    handleChange() {
        DataUtils.uploadFile()
        .then((res)=>{this.props.onChange(res)});
    }
    buildUploadForm() {
        const uploadForm = (
            <FieldGroup
                id="uploadFile"
                type="file"
                label={this.props.label}
                placeholder="Chọn File"
                onChange={this.handleChange.bind(this)}
            />
        )
        return uploadForm
    }
    render() {
        let uploadForm = this.buildUploadForm();
        return (
            <div>
                {uploadForm}
            </div>
        );
    }
}

export default UploadFile;