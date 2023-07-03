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
  /* "/UNIVERSITY_moblie_pc_web_app/UNIVERSITY/src/view/header/header.html" */
  const response = fetch("/UNIVERSITY/src/view/curriculum/banner.html");
  return response.then((res) => res.text());
};