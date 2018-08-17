import React, { Component } from 'react';
import axios from 'axios';
import Config from './config/web'
import AppWeb from './AppWeb' // hos4
import logo from './img/logo.png'
import ActionSettingsInputHdmi from 'material-ui/SvgIcon';

class LoginWeb extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            err_msg: '',
            goApp: false
        }


    }
    componentDidMount() {
        this.refs.username.focus();
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    doLogin = async (e) => {
        e.preventDefault();

        let user_data = {
            username: this.state.username,
            password: this.state.password
        }

        let resp = await axios.post(Config.api + '/auth/login', user_data);

        console.log('new', resp)
        if (resp.data.status == 'true') {
            this.setState({
                goApp: true
            })
        } else {
            let msg = 'Username or Password is incorrect !!!. Please try again.'
            this.setState({
                err_msg: msg
            })
        }
    }

    render() {
        if (!this.state.goApp)
            return (
                <div align='center' style={{ padding: 10, width: '100%', height: '1028px', backgroundColor: 'skyblue' }} >
                    <div style={{ padding: 20, backgroundColor: 'teal', width: 350 }}>
                        <div style={{color:'white'}}><h2>MedicoDoc</h2></div>
                        <img src={logo} alt='medico' height='300' />
                        <div style={{ margin: 30 }}>
                            <form onSubmit={this.doLogin}>
                                Username:<input ref='username' name='username' onChange={this.onChange} />
                                Password:<input name='password' type='password' onChange={this.onChange} />
                                <button>Login</button>
                            </form>
                            <div style={{ color: 'red' }}>{this.state.err_msg}</div>
                        </div>
                    </div>
                </div>
            );
        return <AppWeb username={this.state.username} />
    }

}

export default LoginWeb;
