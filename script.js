function renderProjects(data) {
	var root = ReactDOM.createRoot(document.getElementById('reactapp'));
	var elements = [];
	console.log(data.projects);
	elements = data.projects.map(function (_ref, index) {
		var title = _ref.title,
		    language = _ref.language,
		    source = _ref.source,
		    description = _ref.description;

		return React.createElement(Project, { title: title, lang: language, source: source, desc: description });
	});
	root.render(elements);
}

function getBorderStyle(language) {
	if (language == "C++") return { boxShadow: "0 0 0 0.2rem #f34b7d inset" };
	if (language == "VHDL") return { boxShadow: "0 0 0 0.2rem #adb2cb inset" };
	if (language == "HTML") return { boxShadow: "0 0 0 0.2rem #e34c26 inset" };
	if (language == "Bash") return { boxShadow: "0 0 0 0.2rem #89e051 inset" };
}

function Project(props) {
	return React.createElement(
		"div",
		{ className: "w3-third w3-padding" },
		React.createElement(
			"div",
			{ className: "w3-card w3-display-container" },
			React.createElement(
				"div",
				{ className: "language w3-col s2 m2 l2 w3-light-gray", style: getBorderStyle(props.lang) },
				React.createElement(
					"h3",
					{ className: "w3-center" },
					props.lang
				)
			),
			React.createElement(
				"div",
				{ className: "title w3-rest w3-black w3-opacity" },
				React.createElement(
					"h3",
					{ className: "w3-center" },
					props.title
				)
			),
			React.createElement(
				"p",
				{ className: "w3-container w3-text-dark-gray" },
				props.desc
			),
			React.createElement(
				"a",
				{ className: "github w3-button w3-block w3-light-gray w3-center w3-large", href: props.source, target: "_blank" },
				"See it on GitHub"
			)
		)
	);
}

fetch("./projects.json").then(function (response) {
	return response.json();
}).then(function (obj) {
	return renderProjects(obj);
});