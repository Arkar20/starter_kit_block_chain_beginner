import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3';
import Card from './Card';
import './App.css';
import SocialNetwork from '../abis/SocailNetwork.json'

class App extends Component {

   async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
      // to enable the ethereum in our window  
    if (window.ethereum)
    {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    }
  
  async loadBlockchainData() {

    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] });

    // getting networkid
    const networkid = await web3.eth.net.getId(); //getnetwork id to identify
    // console.log(networkid);
    const networkdata = SocialNetwork.networks[networkid];

    if (networkdata) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkdata.address); // to create instance of smart contract to use in js
      this.setState({ socialNetwork })
      //now we can call solidify methods in our js
      const postCounts = await socialNetwork.methods.PostCount().call();
      this.setState({ postCount: postCounts })
      
      console.log(this.state.postCount);

      for (var i = 1; i <= postCounts; i++){
        const post = await socialNetwork.methods.posts(i).call();
        console.log(post);
        this.setState({posts:[...this.state.posts,post]});
      }


      //call method do the read fun and send method write fun
      // for (var i = 1; i < postCounts; i++)
      // {

      //   const post = await socialNetwork.methods.posts(i).call();
      //   this.setState({ ...this.state.posts, post });
        
      // }
      console.log("posts",this.state.posts);
      console.log("posts_count",this.state.postCount);

    }
    else {
      alert("Your contract cannot be deployed");
    }

    
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0,
      posts: [],
      loading: true
    };

    
  }
  
  render() {
    // console.log(this.state.posts);
    console.log(this.state.account);


    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center gap-2">
              {
                this.state.posts.map(post => <Card post={post} key={post.id}/>)
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
