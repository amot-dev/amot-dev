window.onload = function(){
	var languages = document.getElementsByClassName("language");
	for (var i = 0; i < languages.length; i++) {
		if (languages[i].innerText == "C++") languages[i].style.borderColor = "#f34b7d";
		if (languages[i].innerText == "VHDL") languages[i].style.borderColor = "#adb2cb";
		if (languages[i].innerText == "HTML") languages[i].style.borderColor = "#e34c26";
		if (languages[i].innerText == "Bash") languages[i].style.borderColor = "#89e051";
	};
};