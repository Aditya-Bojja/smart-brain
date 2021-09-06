import React , { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLink from './Components/ImageLink/ImageLink';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

const particleOptions = {
  "particles": {
      "number": {
          "value": 100
      },
      "size": {
          "value": 2
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
};

const initialState = {
  input : '',
  imageURL : '',
  box : {},
  route : 'signin',
  isSignedIn : false,
  user : {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    } });
  }

  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({isSignedIn:true});
    }
    this.setState({route: route});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (boxParams) => {
    this.setState({box:boxParams});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    
    fetch('https://whispering-meadow-69285.herokuapp.com/imageurl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch('https://whispering-meadow-69285.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}));
        })
        .catch(err => console.log(err));
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }


  render() {
    const {imageURL, box, route, isSignedIn} = this.state;
    return(
      <div>
        <Particles className='particles' params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        {route === 'home' ? 
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageURL={imageURL} box={box} />
          </div> :
          (route === 'signin' ? 
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          ) 
        }
      </div>
    );
  }
}

export default App;
