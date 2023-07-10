const banner = document.getElementById("banner");


window.addEventListener("DOMContentLoaded", () => {
  BannerExec();
});

/* header,footer load */
const BannerExec = () => {
  BannerPrint()
};

const BannerPrint = async () => {
  const bannerData = await getBanner();
  banner.innerHTML = bannerData;
};

const getBanner = () => {
  /* "_moblie_pc_web_app/src/view/header/header.html" */
  const response = fetch("/src/view/specialty/banner.html");
  return response.then((res) => res.text());
};