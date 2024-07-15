const inputs = document.querySelectorAll(".input-field");

inputs.forEach((inp) => {

   inp.addEventListener("focus", () => {
      console.log(
         "The input field has been focused"
      );
    inp.classList.add("active");
   });
   inp.addEventListener("blur", () => {
    if (inp.value != "") return
    inp.classList.remove("active");
   });

});