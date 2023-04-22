// Scroll Animations
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	var title = document.getElementById('title');
	var buttons = document.getElementById('buttons');

	// Scrolling down
	if (document.body.scrollTop > 0.8 * window.innerHeight || document.documentElement.scrollTop > 0.8 * window.innerHeight) {
		// Need to transition display style between 450px and 703px (done by making buttons transparent during display change)
		if (window.matchMedia('(min-width: 450px) and (max-width: 703px)').matches && !buttons.classList.contains('scrolled')) {
			buttons.classList.add('display-transitioning');
			title.classList.add('scrolled');
			setTimeout(function() {
				buttons.classList.add('scrolled');
				buttons.classList.remove('display-transitioning');
			}, 200);
		}
		else {
			title.classList.add('scrolled');
			buttons.classList.add('scrolled');
		}
	}
	// Scrolling up
	else {
		if (window.matchMedia('(min-width: 450px) and (max-width: 703px)').matches && buttons.classList.contains('scrolled')) {
			buttons.classList.add('display-transitioning');
			setTimeout(function() {
				title.classList.remove('scrolled');
				buttons.classList.remove('scrolled');
				buttons.classList.remove('display-transitioning');
			}, 200);
		}
		else {
			title.classList.remove('scrolled');
			buttons.classList.remove('scrolled');
		}
	}
}

// Make grid items in a row equal heights
function setEqualHeight() {
	const gridItems = document.querySelectorAll('.grid-item');
	let start = 0;
	let end;
	let maxHeight = 0;

	// Get number of grid items in a row
	let itemsPerRow;
	if (window.matchMedia('(min-width: 1000px)').matches) {
		itemsPerRow = 3;
	} else if (window.matchMedia('(min-width: 600px)').matches) {
		itemsPerRow = 2;
	} else {
		itemsPerRow = 1;
	}

	// Iterate through grid items, row by row
	while (start < gridItems.length) {
		// Set end of current row
		end = start + itemsPerRow;

		// Reset heights to auto
		for (let i = start; i < end && i < gridItems.length; i++) {
			const desc = gridItems[i].querySelector('.desc');
			desc.style.height = 'auto';
		}

		// Find max height in row
		for (let i = start; i < end && i < gridItems.length; i++) {
			const desc = gridItems[i].querySelector('.desc');
			maxHeight = Math.max(maxHeight, desc.offsetHeight);
		}

		// Set all items in row to max height
		for (let i = start; i < end && i < gridItems.length; i++) {
			const desc = gridItems[i].querySelector('.desc');
			desc.style.height = maxHeight + 'px';
		}

		// Move to next row
		maxHeight = 0;
		start = end;
	}
}
window.addEventListener('resize', setEqualHeight);

// Check when React finishes adding grid items, then run setEqualHeight
const observer = new MutationObserver(mutations => {
	for (const mutation of mutations) {
		if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
			setEqualHeight();
			break;
		}
	}
});
observer.observe(document.getElementById('reactapp'), { childList: true, subtree: true });

// Render React elements
function renderProjects(data) {
	const root = ReactDOM.createRoot(document.getElementById('reactapp'))
	let elements = []
	elements = data.projects.map(({title, language, github, site, description}, index) => {
		return <Project title={title} lang={language} github={github} site={site} desc={description} />
	})
	root.render(elements);
}

function getBorderStyle(language) {
	if (language == "C++") return {boxShadow: "0 0 0 0.25rem #f06292 inset"}
	if (language == "Java") return {boxShadow: "0 0 0 0.25rem #ff8a65 inset"}
	if (language == "Python") return {boxShadow: "0 0 0 0.25rem #7986cb inset"}
	if (language == "JS") return {boxShadow: "0 0 0 0.25rem #ffd54f inset"}
	if (language == "Bash") return {boxShadow: "0 0 0 0.25rem #aed581 inset"}
	if (language == "Assembly") return {boxShadow: "0 0 0 0.25rem #90a4ae inset"}
	if (language == "VHDL") return {boxShadow: "0 0 0 0.25rem #4db6ac inset"}
}

function Project(props) {
	if (props.desc == "") return null;
	return (
		<div className="grid-item">
			<div className="card">
				<div className="info">
					<div className="language" style={getBorderStyle(props.lang)}><h3>{props.lang}</h3></div>
					<div className="title"><h3>{props.title}</h3></div>
				</div>
				<p className="desc">{props.desc}</p>
				{props.site == ""
					? <a className="site button" href={props.github} target="_blank">See it on GitHub</a>
					: <div>
						<a className="site site-left button" href={props.github} target="_blank">See it on GitHub</a>
						<a className="site site-right button" href={props.site} target="_blank">Try it out!</a>
					  </div>
				}
			</div>
		</div>
	);
}

fetch("./projects.json").then(response => response.json()).then(obj => renderProjects(obj))