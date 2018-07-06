import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	state = {
		newTodoText: '',
		todos: [],
	};

	async componentDidMount() {
		const response = await axios.get('http://localhost:3333/todos');

		this.setState({ todos: response.data });
	}

	handleNewTodo = async (e) => {
		e.preventDefault();

		if (!this.state.newTodoText) return;

		const response = await axios.post('http://localhost:3333/todos', {
			text: this.state.newTodoText,
		});

		this.setState({ todos: [...this.state.todos, response.data] });
	};

	render() {
		return (
			<div className="App">
				<form onSubmit={this.handleNewTodo}>
					<input
						onChange={e => this.setState({ newTodoText: e.target.value })}
						value={this.state.newTodoText}
					/>
					<button type="submit">Adicionar</button>
				</form>
				<ul>{this.state.todos.map(todo => <li key={todo._id}>{todo.text}</li>)}</ul>
			</div>
		);
	}
}

export default App;
