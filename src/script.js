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
	if (language == "HTML") return {boxShadow: "0 0 0 0.2rem #e34c26 inset"}
	if (language == "Bash") return {boxShadow: "0 0 0 0.2rem #89e051 inset"}
}

function Project(props) {
	return (
		<div className="w3-third w3-padding">
			<div className="w3-card w3-display-container">
				<div className="language w3-col s2 m2 l2 w3-light-gray" style={getBorderStyle(props.lang)}><h3 className="w3-center">{props.lang}</h3></div>
				<div className="title w3-rest w3-black w3-opacity"><h3 className="w3-center">{props.title}</h3></div>
				<p className="w3-container w3-text-dark-gray">{props.desc}</p>
				<a className="github w3-button w3-block w3-light-gray w3-center w3-large" href={props.source} target="_blank">See it on GitHub</a>
			</div>
		</div>
	);
}

fetch("./projects.json")
	.then(response => response.json())
	.then(obj => renderProjects(obj))
