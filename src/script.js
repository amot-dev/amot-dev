function renderProjects(data) {
	const root = ReactDOM.createRoot(document.getElementById('reactapp'))
	let elements = []
	console.log(data.projects)
	elements = data.projects.map(({title, language, source, description}, index) => {
		return <Project title={title} lang={language} source={source} desc={description} />
	})
	root.render(elements)
}

function getBorderStyle(language) {
	if (language == "C++") return {boxShadow: "0 0 0 0.2rem #f34b7d inset"}
	if (language == "VHDL") return {boxShadow: "0 0 0 0.2rem #adb2cb inset"}
	if (language == "JS") return {boxShadow: "0 0 0 0.2rem #e34c26 inset"}
	if (language == "Bash") return {boxShadow: "0 0 0 0.2rem #89e051 inset"}
}

function Project(props) {
	return (
		<div className="grid-item">
			<div className="card">
				<div className="info">
					<div className="language" style={getBorderStyle(props.lang)}><h3>{props.lang}</h3></div>
					<div className="title"><h3>{props.title}</h3></div>
				</div>
				<p className="desc">{props.desc}</p>
				<a className="github w3-button" href={props.source} target="_blank">See it on GitHub</a>
			</div>
		</div>
	);
}

fetch("./projects.json")
	.then(response => response.json())
	.then(obj => renderProjects(obj))
