const Baseurl =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const dropdowns = document.querySelectorAll(".dropdown select");
for (let select of dropdowns) {
  for (Currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = Currcode;
    newoption.value = Currcode;
    if (select.name === "from" && Currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && Currcode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
    select.addEventListener("change", (evt) => {
      updateflag(evt.target);
    });
  }
}
const updateflag = (element) => {
  let Currcode = element.value;
  let countrycode = countryList[Currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateexchangerate();
});
const updateexchangerate = async () => {
  let amount = document.querySelector(".amount input");
  let amountval = amount.value;
  if (amountval === "" || amountval < 1) {
    amountval = 1;
    amount.value = "1";
  }
  const url = `${Baseurl}/${fromcurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
  console.log(rate);
  let finalamount = amount.value * rate;
  msg.innerText = `${amountval} ${fromcurr.value} = ${finalamount.toFixed(2)} ${
    tocurr.value
  }`;
};
window.addEventListener("load", () => {
  updateexchangerate();
});
