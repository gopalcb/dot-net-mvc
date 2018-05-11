var data = [];

class ElementEditor extends React.createClass{
	render() {
		return (
			<div>
				<br />
				<div className="panel panel-default">
				<div className="panel-heading">
				<h3 className="panel-title">Elements</h3>
				</div>
					<div className="panel-body">
						<button type="button" className="btn btn-default navbar-btn">Back</button>
  						<form onSubmit={this.handleSubmit}>
							<br />
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type ID" value={this.props.id} />
							</div>
							<br />
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type Writer" value={this.props.writer} />
							</div>
							<br />
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type Text" value={this.props.text} />
							</div>
							<input type="submit" className="btn btn-default navbar-btn" value="Update" />
  						</form>
					</div>
				</div>
			</div>
		);
	}
};

class Element extends React.createClass{
	rawMarkup() {
		var md = new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return { __html: rawMarkup };
	}
	renderEditor() {
		return (
			<div className="elementForm">
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Type ID" value={this.props.id} />
					<input type="text" placeholder="Type Writer" value={this.props.writer} />
					<input type="text" placeholder="Type Text" value={this.props.text} />
					<input type="submit" value="Post" />
				</form>
			</div>
		);
	}
	handleEditClick(e) {
		e.preventDefault();
		ReactDOM.render(
		    <ElementEditor writer={this.props.writer} key={this.props.id} id={this.props.id} text={this.props.text} editUrl="" deleteUrl="http://localhost:57050/Home/UpdateElements" />,
		    document.getElementById('content')
        );
	}
	handleDeleteClick(e) {
		e.preventDefault();
		var xhr = new XMLHttpRequest();
		xhr.open('post', this.props.deleteUrl+'?id='+this.props.id, true);
		xhr.onload = function () {
			ReactDOM.render(
			    <ElementBox data={data} url="http://localhost:57050/Home/GetElements" submitUrl="http://localhost:57050/Home/AddElements" />,
			    document.getElementById('content')
            );
	}.bind(this);
xhr.send(data);
	}
	render() {
		return (
			<tr>
				<th scope="row">{this.props.id}</th>
				<td>{this.props.writer}</td>
				<td>{this.props.text}</td>
				<td>
					<div className="btn-group">
						<button className="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Action <span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
  							<li><a href="#" onClick={this.handleEditClick}>Edit</a></li>
							<li><a href="#" onClick={this.handleDeleteClick}>Delete</a></li>
						</ul>
					</div>
				</td>
			</tr>
		);
	}
};

var ElementList = React.createClass({
	handleAddClick: function (e) {
		e.preventDefault();
		ReactDOM.render(
		    <ElementForm onElementSubmit={this.handleElementSubmit} url="http://localhost:57050/Home/GetElements" submitUrl="http://localhost:57050/Home/AddElements" />,
		    document.getElementById('content')
        );
	},
	handleElementSubmit: function (element, prop) {
		var data = new FormData();
		data.append('Id', element.Id);
		data.append('Writer', element.Writer);
		data.append('Text', element.Text);
		var xhr = new XMLHttpRequest();
		xhr.open('post', prop.submitUrl, true);
		xhr.onload = function () {
			ReactDOM.render(
			    <ElementBox data={data} url="http://localhost:57050/Home/GetElements" submitUrl="http://localhost:57050/Home/AddElements" />,
			    document.getElementById('content')
            );
		}.bind(this);
		xhr.send(data);
	},
	render: function () {
		var elementNodes = this.props.data.map(function (element) {
			return (
				<Element writer={element.Writer} key={element.Id } id={element.Id } text={element.Text } editUrl="" deleteUrl="http://localhost:57050/Home/DeleteElements"></Element>
			);
		});
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
				<h3 className="panel-title">Elements</h3>
				</div>
				<div className="panel-body">
					<button type="button" className="btn btn-default navbar-btn" onClick={this.handleAddClick}>New Element</button>
  					<table className="table table-bordered">
						<thead>
							<tr>
								<th>ID</th>
								<th>Writer</th>
								<th>Text</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{elementNodes}
						</tbody>
  					</table>
				</div>
			</div>
		);
	}
});

var ElementForm = React.createClass({
	getInitialState: function () {
		return { id: '', writer: '', text: '' };
	},
	handleIdChange: function (e) {
		this.setState({ id: e.target.value });
	},
	handleWriterChange: function (e) {
		this.setState({ writer: e.target.value });
	},
	handleTextChange: function (e) {
		this.setState({ text: e.target.value });
	},
	handleSubmit: function (e) {
		e.preventDefault();
		var id = this.state.id.trim();
		var writer = this.state.writer.trim();
		var text = this.state.text.trim();
		if (!text || !writer || !id) {
			return;
		}
		this.props.onElementSubmit({ Id: id, Writer: writer, Text: text }, this.props);
		this.setState({ id: '', writer: '', text: '' });
		ReactDOM.render(
			<ElementBox data={data} url="http://localhost:57050/Home/GetElements" submitUrl="http://localhost:57050/Home/AddElements" />,
			document.getElementById('content')
		);
	},
	handleBackToElementList: function (e) {
		e.preventDefault();
		ReactDOM.render(
			<ElementBox data={data} url="http://localhost:57050/Home/GetElements" submitUrl="http://localhost:57050/Home/AddElements" />,
			document.getElementById('content')
		);
	},
	render: function () {
		return (
			<div>
				<br />
				<div className="panel panel-default">
				<div className="panel-heading">
				<h3 className="panel-title">Elements</h3>
				</div>
					<div className="panel-body">
						<button type="button" className="btn btn-default navbar-btn" onClick={this.handleBackToElementList}>Back</button>
  						<form onSubmit={this.handleSubmit}>
							<br />
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type ID" value={this.state.Id} onChange={this.handleIdChange} />
							</div>
							<br />
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type Writer" value={this.state.Writer} onChange={this.handleWriterChange} />
							</div>
							<br />
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Type Text" value={this.state.Text} onChange={this.handleTextChange} />
							</div>
							<input type="submit" className="btn btn-default navbar-btn" value="Save" />
  						</form>
					</div>
				</div>
			</div>
		);
	}
});

var ElementBox = React.createClass({
	getInitialState: function () {
		return { data: [] };
	},
	loadElementsFromServer: function () {
		var xhr = new XMLHttpRequest();
		xhr.open('get', this.props.url, true);
		xhr.onload = function () {
			data = JSON.parse(xhr.responseText);
			this.setState({ data: data });
		}.bind(this);
		xhr.send();
	},
	componentDidMount: function () {
		this.loadElementsFromServer();
	},
	render: function () {
		var rdata = this.props.data.count ? this.props.data.count : data;
		return (
			<div className="element-box">
				<br />
				<ElementList data={rdata} />
			</div>
		);
	}
});

ReactDOM.render(
  <ElementBox data={data} url="http://localhost:57050/Home/GetElements" submitUrl="http://localhost:57050/Home/AddElements" />,
  document.getElementById('content')
);