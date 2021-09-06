import React from 'react';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignin = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <article className="br3 ba b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                                <legend className="f2 fw8 ph0 mh0 tc">Sign In</legend>
                                <div className="mt3">
                                    <label className="f5 fw6 black db lh-copy" htmlFor="email-address">Email</label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address"
                                        onChange={this.onEmailChange} 
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="f5 fw6 black db lh-copy" htmlFor="password">Password</label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="password" 
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="tc">
                                <input type="submit" value="Sign in" onClick={this.onSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" />
                            </div>
                            <div className="lh-copy mt3 tc">
                                <p onClick={() => onRouteChange('register')} className="f5 fw6 link black db dim pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default SignIn;
