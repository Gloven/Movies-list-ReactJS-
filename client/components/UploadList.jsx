import React from 'react';
import MoviesActions from '../actions/MoviesActions';

export default class UploadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: ''};
  }
  handleSubmit(e) {
    e.preventDefault();
    MoviesActions.uploadMovie(this.state.file);
    
    console.log('handle uploading-', this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this.handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this.handleSubmit(e)}>Upload Image</button>
        </form>
      </div>
    )
  }
};

