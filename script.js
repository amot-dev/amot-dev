function renderProjects(data) {
	var root = ReactDOM.createRoot(document.getElementById('reactapp'));
	var elements = [];
	console.log(data.projects);
	elements = data.projects.map(function (_ref, index) {
		var title = _ref.title,
		    language = _ref.language,
		    github = _ref.github,
		    site = _ref.site,
		    description = _ref.description;

		return React.createElement(Project, { title: title, lang: language, github: github, site: site, desc: description });
	});
	root.render(elements);
}

function getBorderStyle(language) {
	if (language == "C++") return { boxShadow: "0 0 0 0.25rem #f06292 inset" };
	if (language == "Java") return { boxShadow: "0 0 0 0.25rem #ff8a65 inset" };
	if (language == "Python") return { boxShadow: "0 0 0 0.25rem #7986cb inset" };
	if (language == "JS") return { boxShadow: "0 0 0 0.25rem #ffd54f inset" };
	if (language == "Bash") return { boxShadow: "0 0 0 0.25rem #aed581 inset" };
	if (language == "Assembly") return { boxShadow: "0 0 0 0.25rem #90a4ae inset" };
	if (language == "VHDL") return { boxShadow: "0 0 0 0.25rem #4db6ac inset" };
}

function Project(props) {
	if (props.desc == "") return null;
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
			props.site == "" ? React.createElement(
				"a",
				{ className: "site button", href: props.github, target: "_blank" },
				"See it on GitHub"
			) : React.createElement(
				"div",
				null,
				React.createElement(
					"a",
					{ className: "site site-left button", href: props.github, target: "_blank" },
					"See it on GitHub"
				),
				React.createElement(
					"a",
					{ className: "site site-right button", href: props.site, target: "_blank" },
					"Try it out!"
				)
			)
		)
	);
}

fetch("./projects.json").then(function (response) {
	return response.json();
}).then(function (obj) {
	return renderProjects(obj);
});