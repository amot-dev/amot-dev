/* 	Scroll Animations
	Some important screen widths (need to be updated if header is updated, here and in CSS):
		- Minimum size to fit navbar and title in one row when not scrolled: 806px
		- Minimum size to fit navbar and title in one row when scrolled: 551px
		- Minimum size to fit navbar in one row: 366px
*/
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	var title = document.getElementById('title');
	var buttons = document.getElementById('buttons');

	// Scrolling down
	if (document.body.scrollTop > 0.8 * window.innerHeight || document.documentElement.scrollTop > 0.8 * window.innerHeight) {
		// Need to transition display style between 551px and 805px (done by making buttons transparent during display change)
		// This is because between those sizes, the navbar needs to move from inline to a new row or vice versa
		if (window.matchMedia('(min-width: 551px) and (max-width: 805px)').matches && !buttons.classList.contains('scrolled')) {
			// Start scroll animation
			buttons.classList.add('display-transitioning');
			title.classList.add('scrolled');
			buttons.classList.add('scrolled');
			// Wait until there's enough room for both title and navbar before completing button transition
			setTimeout(function checkWidth() {
				var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
				if (title.offsetWidth + buttons.offsetWidth < viewportWidth) {
					buttons.classList.remove('display-transitioning');
				}
				// If there's no room, wait a bit and check again
				else {
					setTimeout(checkWidth, 50);
				}
			}, 50);
		}
		else {
			title.classList.add('scrolled');
			buttons.classList.add('scrolled');
		}
	}
	// Scrolling up
	else {
		if (window.matchMedia('(min-width: 551px) and (max-width: 805px)').matches && buttons.classList.contains('scrolled')) {
			// Start scroll animation
			buttons.classList.add('display-transitioning');
			title.classList.remove('scrolled');
			buttons.classList.remove('scrolled');
			// Wait until there's not enough room for both title and navbar before completing button transition
			setTimeout(function checkWidth() {
				var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
				if (title.offsetWidth + buttons.offsetWidth > viewportWidth) {
					buttons.classList.remove('display-transitioning');
				}
				// If there's still room, wait a bit and check again
				else {
					setTimeout(checkWidth, 50);
				}
			}, 50);
		}
		else {
			title.classList.remove('scrolled');
			buttons.classList.remove('scrolled');
		}
	}
}

// Make cards in the same row equal heights
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

		// Reset card and description heights to auto
		for (let i = start; i < end && i < gridItems.length; i++) {
			const card = gridItems[i].querySelector('.card');
			const desc = gridItems[i].querySelector('.desc');
			card.style.height = 'auto';
			desc.style.height = 'auto';
		}

		// Find max card height in row
		for (let i = start; i < end && i < gridItems.length; i++) {
			const card = gridItems[i].querySelector('.card');
			maxHeight = Math.max(maxHeight, card.offsetHeight);
		}

		// Set all description heights in a row such that the cards in that row are the same height
		for (let i = start; i < end && i < gridItems.length; i++) {
			const card = gridItems[i].querySelector('.card');
			const desc = gridItems[i].querySelector('.desc');
			desc.style.height = (maxHeight + desc.offsetHeight - card.offsetHeight) + 'px';
		}

		// Move to next row
		maxHeight = 0;
		start = end;
	}
}
window.addEventListener('resize', setEqualHeight);

// Render React elements from projects.json
function renderProjects(data) {
	const root = ReactDOM.createRoot(document.getElementById('reactapp'))
	let elements = []
	elements = data.projects.map(({visible, title, language, github, site, photo, description}, index) => {
		return <Project visible={visible} title={title} lang={language} github={github} site={site} photo={photo} desc={description} />
	})
	root.render(elements);
}
fetch("./projects.json").then(response => response.json()).then(obj => renderProjects(obj))

// Format text color for various prgramming languages or frameworks
function setTextColor(language) {
	if (language == "Arduino") return {color: "#4db6ac"}	// Teal 300
	if (language == "Assembly") return {color: "#90a4ae"}	// Blue Gray 300
	if (language == "Bash") return {color: "#aed581"}		// Light Green 300
	if (language == "C++") return {color: "#f06292"}		// Pink 300
	if (language == "Flutter") return {color: "#4dd0e1"}	// Cyan 300
	if (language == "Java") return {color: "#ff8a65"}		// Deep Orange 300
	if (language == "JS") return {color: "#ffd54f"}			// Amber 300
	if (language == "Python") return {color: "#7986cb"}		// Indigo 300
	if (language == "VHDL") return {color: "#9575cd"}		// Deep Purple 300
}

// Define React Component
function Project(props) {
	// Run after initial load
	React.useEffect(() => {
		setEqualHeight();
	});
	
	// Skip rendering elements not set to visible and elements with an empty description
	if (props.visible == "false" || props.desc == "") return null;
	
	// Template for cards
	return (
		<div className="grid-item">
			<div className="card">
				<div className="info">
					<h3 className="title">{props.title}</h3>
					<h3 className="language" style={setTextColor(props.lang)}>{props.lang}</h3>
				</div>
				{props.photo != "" &&
					<img className="featured-image" src={props.photo}></img>
				}
				
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