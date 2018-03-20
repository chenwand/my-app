import React, { Component } from 'react';
import Projects from './Components/Projects';
import AddProject from './Components/AddProject';
import $ from 'jquery';
import uuid from 'uuid';
import './App.css';
import Todos from './Components/Todos';

export default class App extends Component {
	constructor(){
		super(); 
		this.state = {
			projects: [],
			todos:[]
		}
	}
	getTodos(){
		$.ajax({
			url:'http://jsonplaceholder.typicode.com/todos',
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({todos: data}, function(){
					console.log(this.state);
				});
			}.bind(this),
			error: function(xhr, status, err){
				console.log(err);
			}
		})
	}

	getProjects(){
		this.setState({projects: [
			{
				id:uuid.v4(),
				title:'A',
				category:'1'
			},
			{
				id:uuid.v4(),
				title:'B',
				category:'2'
			},
			{
				id:uuid.v4(),
				title:'C',
				category:'3'
			},
		]});
	}

	componentWillMount(){
			this.getProjects();
			this.getTodos();
	}

	componentDidMount(){
		this.getTodos();
	}

	handleAddProject(project){
		let projects = this.state.projects;
		projects.push(project);
		this.setState({projects:projects});
	}
	handleDeleteProject(id){
		let projects = this.state.projects;
		let index = projects.findIndex(x => x.id === id);
		projects.splice(index, 1);
		this.setState({projects:projects});
	}
	render() {
		return (
			<div className="App">
			<AddProject addProject={this.handleAddProject.bind(this)}/>
			<Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
			<hr/>
			<Todos todos={this.state.todos}/>
			</div>
		);
	}
}


