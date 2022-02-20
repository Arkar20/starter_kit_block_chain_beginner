import React from 'react'


class CreatePost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  handleChange = (e) => {
    
     console.log(e)
     this.setState({
       content: e.target.value
     });
  }
  

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
      this.props.createPost(this.state.content)
  }

  
  

  render() {

    console.log(this.props)

  
    //  console.log(this.state.name);
    return (
    <form className='form-group ' onSubmit={this.handleSubmit}>
        <input type="text" className='form-control' value={this.state.content} onChange={this.handleChange}/>
      <button className='m-1 btn btn-primary'>Post</button>
    </form>
  )
  }
}

export default CreatePost;
