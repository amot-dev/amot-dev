window.onload = function () {
	var languages = document.getElementsByClassName("language");
	for (var i = 0; i < languages.length; i++) {
		if (languages[i].firstChild.innerText == "C++") languages[i].style.boxShadow = "0 0 0 0.2rem #f34b7d inset";
		if (languages[i].firstChild.innerText == "VHDL") languages[i].style.boxShadow = "0 0 0 0.2rem #adb2cb inset";
		if (languages[i].firstChild.innerText == "HTML") languages[i].style.boxShadow = "0 0 0 0.2rem #e34c26 inset";
		if (languages[i].firstChild.innerText == "Bash") languages[i].style.boxShadow = "0 0 0 0.2rem #89e051 inset";
	};
};