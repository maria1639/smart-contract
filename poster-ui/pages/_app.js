import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from "react";
import Web3 from "web3";
import "./style.css";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';

var global_address = "";
var global_posts ; 
var searched_posts = []; 
var globCount = 0;

export default function Home() {
	const [web3, setWeb3] = useState(undefined)
	const [userAddress, setUserAddress] = useState(undefined)
	
	const [account, setAccount] = useState();
  	const [postList, setPostsList] = useState();
  	const [posts, setPosts] = useState([]);
  	
	const load = async () => {
		const web3 = new Web3(window.ethereum)
		const [address] = await window.ethereum.enable()
		const check = false;
		var listPost =  document.getElementById('list');
		listPost.innerHTML=" ";
		global_address = address;
		
		setUserAddress(address)
		setWeb3(web3)
		
      		const accounts = await web3.eth.requestAccounts();
      		setAccount(accounts[0]);
      // Instantiate smart contract using ABI and address.
      		const postList = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      // set contact list to state variable.
      		setPostsList(postList);
      // Then we get total number of contacts for iteration
      		const counter = await postList.methods.count().call();
			globCount = counter;
      // iterate through the amount of time of counter
      for (var i = 1; i <= counter; i++) {
        // call the contacts method to get that particular contact from smart contract
        const post = await postList.methods.posts(i).call();
        // add recently fetched contact to state variable.

	const postAddress = post[1].toLowerCase();

	if (postAddress.localeCompare(address) == 0)
	{
		check = true;
        	break;
	}
	else
	{
		alert("Вы ничего не постили в контракт, просмотр запрещен");
		break;
	}

	}
if (check == true)
{
      // iterate through the amount of time of counter
      for (var i = 1; i <= counter; i++) {
        // call the contacts method to get that particular contact from smart contract
        const post = await postList.methods.posts(i).call();
        // add recently fetched contact to state variable.
	setPosts((posts) => [...posts, post]);
	searched_posts =posts;
	document.getElementById("Ptext").style.visibility="visible";
	document.getElementById("s").style.visibility="visible";
	document.getElementById("btn").style.visibility="visible";
	document.getElementById("back").style.visibility="visible";
	document.getElementById("search").style.visibility="visible";
	document.getElementById("ad1").style.visibility="visible";
	document.getElementById("ad2").style.visibility="visible";
}
global_posts = postList;

}
else
{
	document.getElementById("Ptext").style.visibility="hidden";
	document.getElementById("s").style.visibility="hidden";
	document.getElementById("btn").style.visibility="hidden";
	document.getElementById("back").style.visibility="hidden";
	document.getElementById("search").style.visibility="hidden";
	document.getElementById("ad1").style.visibility="visible";
	document.getElementById("ad2").style.visibility="visible";
}




	}
	
	const searchTag = async () =>{
		const searchTagValue = document.getElementById('s').value;
		var right =0; 
		var listPost =  document.getElementById('list');
		listPost.innerHTML=" ";
		
		for (var i = 1; i <= globCount; i++) {
			const post = await global_posts.methods.posts(i).call();
			const tag = post.tag;  
			var flag =0;
			
			
			if (tag.localeCompare(searchTagValue) == 0)
			{				 
				 searched_posts.push(post);
				 right = right+1;
				 var newValue =document.createElement('li');
				 var newUser  = document.createElement('div');
				 var newTag = document.createElement('div');
				  var newContent = document.createElement('div');
				 newUser.appendChild(document.createTextNode("User: "));
				 newUser.appendChild(document.createTextNode(post.user));
				 newTag.appendChild(document.createTextNode("Tag: "));
				 newTag.appendChild(document.createTextNode(post.tag));
				 newContent.appendChild(document.createTextNode("Content: ")); 
				   newContent.appendChild(document.createTextNode(post.content));
				   newUser.classList.add("user");
				 newValue.appendChild(newUser);
				    newContent.classList.add("content_list");
				 newValue.appendChild(newContent);
				    newTag.classList.add("tag");
				  newValue.appendChild(newTag);
				  newValue.classList.add("list_content");
				  
				  flag=1;
			}
			if (flag)
			{
			document.querySelector('ul').appendChild(newValue);
			}
		}
}
		
	return (
	<div class = "container">
<div class="main">
<div class="col1">
    <div class="top-block"> 
        <div class="content"> Подключение к MetaMask</div>
		<div class ="address1" id ="ad1" style={{visibility:"hidden"}}>Текущий адрес:</div> 
		<div class="address" id ="ad2" style={{visibility:"hidden"}}>{userAddress}</div>
        <button class="button-20" role="button" onClick={load}>Connect</button>
		
		

    </div>
</div>
<div class="col2">
    <div class="search-block" id ="search"  style={{visibility:"hidden"}}> 
          <div id = "Ptext" class = "Posty" style= {{visibility:"hidden"}} >Посты:</div>

        <input style={{visibility:"hidden"}}  id="s" class = "inputTag" placeholder ="Искать по тегу..." type = "search"/>
        <button  id ="btn" class="button-22"  style={{visibility:"hidden"}} onClick={searchTag}>Поиск</button>
        <button id="back" class="button-21"  style= {{visibility:"hidden"}} onClick={load}>Отменить фильтрацию</button>
  </div>


        <ul id="list" class = "listP">
      {
        Object.keys(posts).map((post, index) => (
           <li  key={'${posts[index].user}-${index}'}>

        <div class="list_content"> 
        <div class="user"> 
              <span class="user1"> User: {posts[index].user} </span>
        </div>

        <div class = "tag"> 
              <span class="tag1"> Tag: {posts[index].tag} </span>
        </div>

        <div class="content_list"> 
              <span class="content1"> Content: {posts[index].content} </span>
        </div>

      </div>
          </li>
        ))


      }
      </ul>
</div>

    </div>
	</div>
     );}
	
