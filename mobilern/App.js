import React, { Component } from 'react';
import axios from 'axios';

import { View, Text, Button, TextInput } from 'react-native';

const DEFAULT_IP = '10.20.106.28:3333';

class App extends Component {
	state = {
		newTodoText: '',
		todos: [],
	};

	async componentDidMount() {
		const response = await axios.get(`http://${DEFAULT_IP}/todos`);

		this.setState({ todos: response.data });
	}

	handleNewTodo = async event => {
		event.preventDefault();

		if (!this.state.newTodoText) return;

		const response = await axios.post(`http://${DEFAULT_IP}/todos`, {
			text: this.state.newTodoText,
		});

		this.setState({ todos: [...this.state.todos, response.data] });
	};

	render() {
		return (
			<View style={{ padding: 40 }}>
				<TextInput
					style={{ height: 36, borderWidth: 1, borderColor: '#CCC' }}
					onChangeText={text => this.setState({ newTodoText: text })}
					value={this.state.newTodoText}
				/>
				<Button onPress={this.handleNewTodo} title="Adicionar" />
				<View style={{ marginTop: 20 }}>
					{this.state.todos.map(todo => (
						<Text key={todo._id}>{todo.text}</Text>
					))}
				</View>
			</View>
		);
	}
}

export default App;
