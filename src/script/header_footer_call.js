const headerId = document.getElementById("header");
const footerId = document.getElementById("footer");
const body = document.querySelector("body");


window.addEventListener("DOMContentLoaded", () => {
  headerFooterExec();
});

/* header,footer load */
const headerFooterExec = () => {
  headerFooterPrint().then(() => {
    headerFooterJs();
  });
};

const headerFooterPrint = async () => {
  const headerData = await getHeader();
  const footerData = await getFooter();
  headerId.innerHTML = headerData;
  footerId.innerHTML = footerData;
};

const getHeader = () => {
  /* "/UNIVERSITY_moblie_pc_web_app/UNIVERSITY/src/view/header/header.html" */
  const response = fetch("/src/view/header/header.html");
  return response.then((res) => res.text());
};

const getFooter = () => {
  const response = fetch("/src/view/footer/footer.html");
  return response.then((res) => res.text());
};

const headerFooterJs = () => {
  let createScript = document.createElement("script");
  /* /UNIVERSITY_moblie_pc_web_app/UNIVERSITY/src/script/header.js */
  createScript.setAttribute("src", "/src/script/header.js");
  body.appendChild(createScript);
};
