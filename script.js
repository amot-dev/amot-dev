function renderProjects(data) {
  const root = ReactDOM.createRoot(document.getElementById('reactapp'));
  let elements = [];
  console.log(data.projects);
  elements = data.projects.map(({
    title,
    language,
    github,
    site,
    description
  }, index) => {
    return /*#__PURE__*/React.createElement(Project, {
      title: title,
      lang: language,
      github: github,
      site: site,
      desc: description
    });
  });
  root.render(elements);
}
function getBorderStyle(language) {
  if (language == "C++") return {
    boxShadow: "0 0 0 0.25rem #f06292 inset"
  };
  if (language == "Java") return {
    boxShadow: "0 0 0 0.25rem #ff8a65 inset"
  };
  if (language == "Python") return {
    boxShadow: "0 0 0 0.25rem #7986cb inset"
  };
  if (language == "JS") return {
    boxShadow: "0 0 0 0.25rem #ffd54f inset"
  };
  if (language == "Bash") return {
    boxShadow: "0 0 0 0.25rem #aed581 inset"
  };
  if (language == "Assembly") return {
    boxShadow: "0 0 0 0.25rem #90a4ae inset"
  };
  if (language == "VHDL") return {
    boxShadow: "0 0 0 0.25rem #4db6ac inset"
  };
}
function Project(props) {
  if (props.desc == "") return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "grid-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "language",
    style: getBorderStyle(props.lang)
  }, /*#__PURE__*/React.createElement("h3", null, props.lang)), /*#__PURE__*/React.createElement("div", {
    className: "title"
  }, /*#__PURE__*/React.createElement("h3", null, props.title))), /*#__PURE__*/React.createElement("p", {
    className: "desc"
  }, props.desc), props.site == "" ? /*#__PURE__*/React.createElement("a", {
    className: "site button",
    href: props.github,
    target: "_blank"
  }, "See it on GitHub") : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    className: "site site-left button",
    href: props.github,
    target: "_blank"
  }, "See it on GitHub"), /*#__PURE__*/React.createElement("a", {
    className: "site site-right button",
    href: props.site,
    target: "_blank"
  }, "Try it out!"))));
}
fetch("./projects.json").then(response => response.json()).then(obj => renderProjects(obj));
