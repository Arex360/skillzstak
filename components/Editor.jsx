import ReactQuill from 'react-quill';
import {Component} from 'react'
class Editor extends Component {
    constructor(props) {
      super(props)
      this.state = { text: '' }
      this.handleChange = this.handleChange.bind(this)
      this.shortId = shortid.generate()
    }
  
  
    modules = (shortId) => {
      return {
        toolbar: {
          container: "#" + shortId,
          handlers: {
            "insertStar": insertStar,
          }
        }
      }
    }
  
  
    render() {
      return (
        <div>
          <ReactQuill value={this.state.text}
            modules={this.modules(this.shortId)}
         />
        </div>
      )
    }
}