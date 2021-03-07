import React from 'react'
import { Button } from 'reactstrap';
import circle from '../../../src/MaskCircle.png'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const myStyle = {
    color: 'white',
    backgroundColor: 'black',
    marginLeft: '150px',
}

const imgStyleTwo = {
    position: 'absolute',
    top: '10px',
    width: '1080px',
    height: '1080px',
    borderRadius: '50%',
    left: '160px',
}

class TaskFile extends React.Component {
    constructor(props) {
        super(props);
        
        // Bind context of 'this' 
        this.handleZoomIn = this.handleZoomIn.bind(this) 
        this.handleZoomOut = this.handleZoomOut.bind(this) 
        
        // Create reference of DOM object 
        this.imgRef = React.createRef() 
        this.state = {
            file: null,
            height:null, 
            width:null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){ 
        // Saving initial dimention of image as class properties 
        this.initialHeight = this.imgRef.current.clientHeight 
        this.initialWidth = this.imgRef.current.clientWidth 
    } 

    handleChange(event) {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
    }

    // Event handler callback for zoom in 
    handleZoomIn(){ 
        
        // Fetching current height and width 
        const height = this.imgRef.current.clientHeight 
        const width = this.imgRef.current.clientWidth 
        
        // Increase dimension(Zooming) 
        this.setState({ 
            height : height + 10, 
            width : width + 10, 
        })   
    } 

    // Event handler callback zoom out 
    handleZoomOut(){ 
        
        // Assigning original height and width 
        this.setState({ 
            height : this.initialHeight, 
            width : this.initialWidth, 
        }) 
    } 

    // zoomIn = () => {
    //     this.setState({ scale: this.state.scale * 2 });
    //  }
     
    // zoomOut = () => {
    //    this.setState({ scale: this.state.scale / 2 });
    // }

    downloadImage(src) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = this.state.file;
        img.onload = () => {
          // create Canvas
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          // create <a> tag
          const a = document.createElement("a");
          a.download = "download.png";
          a.href = canvas.toDataURL("image/png");
          a.click();
        };
    }



    render() {
        const imgStyle = { height : this.state.height, width: this.state.width,}
        return (
            <div className="container">
                <div>
                    <img src={circle}></img>
                </div>
                <div>
                    <img className="my_img" style={imgStyle} ref={this.imgRef} src={this.state.file}/>
                </div>
                <div style={{marginTop:'50px'}}>
                    <span>
                        <input type="file" onChange={this.handleChange} ref={(ref) => this.myInput = ref} style={{ display: 'none' }}/>
                        <Button style={myStyle} onClick={(e) => this.myInput.click() }>Add Image</Button>
                    </span>
                    
                    <Button style={myStyle} onClick={this.handleZoomIn}>Zoom In</Button>
                    <Button style={myStyle} onClick={this.handleZoomOut}>Zoom Out</Button>
                    <Button style={myStyle} onClick={() => this.downloadImage()}>Save</Button>
                </div>
            </div>

        )
    }

}

export default TaskFile;