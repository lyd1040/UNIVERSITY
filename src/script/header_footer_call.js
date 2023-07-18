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
  const response = fetch("/UNIVERSITY/src/view/header/header.html");
  return response.then((res) => res.text());
};

const getFooter = () => {
  const response = fetch("/UNIVERSITY/src/view/footer/footer.html");
  return response.then((res) => res.text());
};

const headerFooterJs = () => {
  let createScript = document.createElement("script");
  createScript.setAttribute("src", "/UNIVERSITY/src/script/header.js");
  body.appendChild(createScript);
};
