var text = document.querySelector("textarea");
var button = document.querySelector("button");
button.addEventListener("click",() =>{
  button.innerHTML = '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';
  const apiKey = "";
  const url = "https://api.openai.com/v1/engines/davinci/completions";
  let pmpt1 = text.value;
  text.value = "";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: pmpt1,
      max_tokens: 100,
      temperature: 0.5,
      n: 1,
      stop: "\n"
    })
  })
  .then(function (response) { return response.json(); })
              .then(function (data) {
              var p = document.createElement("p");
              p.textContent = data.choices[0].text;
              console.log(data.choices[0].text);
              var div = document.createElement("div");
              div.classList.add("text");
              div.appendChild(p);
              document.querySelector(".inputgroup").before(div);
              document.querySelector(".inputgroup").scrollIntoView();
              button.innerHTML = "Send";
              text.focus();
          })
    .then(data => console.log(data))
    .catch(error => console.log(error));
})