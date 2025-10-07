window.addEventListener("load", () => {
  document.forms.user.onsubmit = validateForm;
  // document.forms.user.addEventListener('submit', validateForm)
});

function validateForm(evt) {
  // const form = document.forms.user
  const form = evt.target;
  let isValid = true;

  console.log("valitate");

  const spanUser = form.username.nextElementSibling;
  const spanPassword = form.password.nextElementSibling;
  const spanEmail = form.email.nextElementSibling;

  if (form.username.value === "") {
    spanUser.textContent = "O nome de usuário é obrigatório";
    isValid = false;
  } else {
    spanUser.value = "";
  }

  if (form.password.value === "") {
    spanPassword.textContent = "A senha é obrigatória";
    isValid = false;
  } else {
    spanPassword.value = "";
  }

  if (form.email.value === "") {
    spanEmail.textContent = "O e-mail é obrigatório";
    isValid = false;
  } else {
    spanEmail.value = "";
  }

  if (!isValid) {
    evt.preventDefault();
  }
}
