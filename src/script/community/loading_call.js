const banner = document.getElementById("loding_");


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
  const response = fetch("/src/view/QnA/loading.html");
  return response.then((res) => res.text());
};