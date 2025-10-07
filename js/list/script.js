document.addEventListener("DOMContentLoaded", () => {
  const btnAdd = document.getElementById("add-btn");
  btnAdd.addEventListener("click", addInterest);
});

const addInterest = () => {
  const inputInterest = document.getElementById("interest");
  if (inputInterest.value === "") return;

  const listInterest = document.getElementById("interest-list");
  const item = document.createElement("li");
  const text = inputInterest.value;
  // item.innerHTML = `<span>${text}</span><span onclick="delInterest()">❌</span>`;
  item.innerHTML = `<span>${text}</span><span>❌</span>`;
  // item.addEventListener("click", delInterest);
  item.onclick = delInterest;
  listInterest.appendChild(item);
  inputInterest.value = "";
};

const delInterest = (evt) => {
  evt.target.parentNode.remove();
};

/* Outras formas de declarar a mesma função:

const addInterest = function () { }
function addInterest () { }
*/
