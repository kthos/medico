import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import './css/split-styles.css';
import './css/pdf-control.css';
import './css/my.css';

import 'font-awesome/css/font-awesome.min.css';
import TreeStyle from './components/TreeStyle';
import './css/w3.css'

//import { Treebeard, decorators } from 'react-treebeard';
import { Treebeard, decorators } from './components/Tree';

import Iframe from 'react-iframe'
import Config from './config/web'
import axios from 'axios';

import moment from 'moment';
moment.locale('th');



decorators.Header = ({ style, node }) => {
  const iconType = node.children ? 'folder' : 'file-text';
  const iconClass = `fa fa-${iconType}`;
  const iconStyle = { marginRight: '5px' };

  return (
    <div style={style.base}>
      <div style={style.title}>
        <i className={iconClass} style={iconStyle} />
        {node.name}
      </div>
    </div>
  );
};

class AppHos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depart: 'hn',
      hn_an: '',
      pdf: '',
      display: '',
      view_type: 1,
      switch_txt: 'สลับมุมมอง'
    }
  }

  componentDidMount() {
    this.refs.hn.focus()
  }


  hnChange = (e) => {
    this.setState({
      depart: 'hn',
      hn_an: e.target.value
    })
  }
  hnFocus = (e) => {
    e.target.select();
  }

  hnSubmit = async (e) => {

    e.preventDefault();
    this.setState({
      display: '',
      pdf: ''
    })
    if (this.state.hn_an.trim() === '') {
      this.refs.hn.select();
      return;
    }
    // input hn with no zero

    let _hn = '000000000' + this.state.hn_an.trim();
    _hn = _hn.slice(-9);
    console.log('input hn', _hn, _hn.length)
    // end input hn with no zero

    if (this.state.depart === 'hn') {
      let tree_day = await this.getTreeDay(_hn);
      let tree_type = await this.getTreeType(_hn);

      this.setState({
        tree_day: tree_day,
        tree_type: tree_type
      })
    }

    if (this.state.depart === 'an') {
      let tree_day = await this.getIpdTreeDay(_hn);
      let tree_type = await this.getIpdTreeType(_hn);

      this.setState({
        tree_day: tree_day,
        tree_type: tree_type
      })
    }
    this.refs.hn.select();

  }

  getTreeDay = async (hn) => {
    let res = await axios.get(Config.api + '/opd/day/' + hn);
    console.log('day', res.data);
    return res.data;
  }


  getTreeType = async (hn) => {
    let res = await axios.get(Config.api + '/opd/type/' + hn);
    console.log('type', res.data);
    return res.data;
  }

  getIpdTreeDay = async (hn) => {
    let res = await axios.get(Config.api + '/ipd/day/' + hn);
    console.log('day', res.data);
    return res.data;
  }

  getIpdTreeType = async (hn) => {
    let res = await axios.get(Config.api + '/ipd/type/' + hn);
    console.log('type', res.data);
    return res.data;
  }


  onToggle = (node, toggled) => {
    if (this.state.cursor) {

      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
    if (node.paper) {
      console.log('click', node);
      this.setState({
        pdf: node.file,
        display: ''
      })
    }
  }

  Switch = async () => {
    if (this.state.view_type === 1) {
      this.setState({ view_type: 0, switch_txt: 'สลับมุมมอง' })
    } else {

      this.setState({ view_type: 1, switch_txt: 'สลับมุมมอง' })

    }
  }

  render() {

    let ip = Config.php;

    return (
      <div style={{ margin: '0px' }}>
        <div align='center' style={{ margin: 1, backgroundColor: '#7F7F7F' }}>
          <form onSubmit={this.hnSubmit}>
            <input
              ref='hn'
              name='hn'
              placeholder="ระบุ HN"
              onChange={this.hnChange} value={this.state.hn_an}
              onFocus={this.hnFocus}
            />
            <button>Find</button>
          </form>
        </div>
        {this.state.tree_day && this.state.tree_type ?
          <SplitPane split="vertical" minSize={200} defaultSize={300}>
            <div style={{ padding: '5px', backgroundColor: '#21252B', height: '800px', overflow: 'auto' }}>
              <button className='w3-button w3-ripple w3-blue w3-border' style={{ padding: '4px', width: '100%' }} onClick={this.Switch}>{this.state.switch_txt}</button>

              <Treebeard
                style={TreeStyle}
                decorators={decorators}
                data={this.state.view_type === 0 ? this.state.tree_day : this.state.tree_type}
                onToggle={this.onToggle}
              />

            </div>

            <div style={{ padding: '5px', backgroundColor: '#21252B', height: '800px', overflow: 'auto' }}>


              <div id='pdf'>
                <Iframe url={ip + this.state.pdf + '&user=' + this.props.username}
                  position="absolute"
                  width="99%"
                  id="myId"
                  display={this.state.display}
                  className="myClassname"
                  height="99%"
                //styles={{ height: "100%" }}
                //allowFullScreen 
                />
              </div>

            </div>
          </SplitPane> : <div align='center'><p>{this.props.username} , Please enter hn.</p><p>or Press F5 to Exit.</p></div>
        }
      </div>
    );
  }
}


export default AppHos;
