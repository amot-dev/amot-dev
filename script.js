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
	if (language == "JS") return { boxShadow: "0 0 0 0.2rem #e34c26 inset" };
	if (language == "Bash") return { boxShadow: "0 0 0 0.2rem #89e051 inset" };
}

function Project(props) {
	return React.createElement(
		"div",
		{ className: "grid-item" },
		React.createElement(
			"div",
			{ className: "card" },
			React.createElement(
				"div",
				{ className: "info" },
				React.createElement(
					"div",
					{ className: "language", style: getBorderStyle(props.lang) },
					React.createElement(
						"h3",
						null,
						props.lang
					)
				),
				React.createElement(
					"div",
					{ className: "title" },
					React.createElement(
						"h3",
						null,
						props.title
					)
				)
			),
			React.createElement(
				"p",
				{ className: "desc" },
				props.desc
			),
			React.createElement(
				"a",
				{ className: "github w3-button", href: props.source, target: "_blank" },
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