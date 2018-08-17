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

class App extends Component {
  constructor(props) {
    super(props);

    let q = window.location.search;
    let qq = q.substring(4);
    let arr = qq.split('&');
    let hn_an = arr[0];
    //console.log(hn);

    this.state = {
      depart: window.location.search.substring(1, 3),
      hn_an: hn_an,
      pdf: '',
      display: '',
      view_type: 1,
      switch_txt: 'สลับมุมมอง'
    }
    


  }
  async componentDidMount() {
    if (this.state.depart === 'hn') {
      let tree_day = await this.getTreeDay();
      let tree_type = await this.getTreeType();

      this.setState({
        tree_day: tree_day,
        tree_type: tree_type
      })
    }

    if (this.state.depart === 'an') {
      let tree_day = await this.getIpdTreeDay();
      let tree_type = await this.getIpdTreeType();

      this.setState({
        tree_day: tree_day,
        tree_type: tree_type
      })
    }




  }

  getTreeDay = async () => {
    let res = await axios.get(Config.api + '/opd/day/' + this.state.hn_an);
    console.log('day', res.data);
    return res.data;
  }


  getTreeType = async () => {
    let res = await axios.get(Config.api + '/opd/type/' + this.state.hn_an);
    console.log('type', res.data);
    return res.data;
  }

  getIpdTreeDay = async () => {
    let res = await axios.get(Config.api + '/ipd/day/' + this.state.hn_an);
    console.log('day', res.data);
    return res.data;
  }

  getIpdTreeType = async () => {
    let res = await axios.get(Config.api + '/ipd/type/' + this.state.hn_an);
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
    let dt = new Date();
    let tm = dt.getTime();

    return (
      <div style={{ margin: '0px' }}>
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
                <Iframe url={ip + this.state.pdf}
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
          </SplitPane> : <div align='center'><h3>กำลังจัดเตรียมข้อมูล...</h3></div>
        }
      </div>
    );
  }
}


export default App;
