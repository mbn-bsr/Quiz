//▶fetch data ✔
//▶dispaly it in console ✔
//▶display questions one by one, upon answer of each question the next appears
//▶show correct answers in the end

//console.log('hello')

function newElement(element, parent, ElClass) {
  let newL = document.createElement(element);
  //parent = document.querySelector('body');
  parent.appendChild(newL);
  //ElClass = 'abc'
  newL.classList.add(ElClass);
  return newL;
}
//newElement('div')
//let body = document.querySelector('body');
//document.querySelector('.abc').innerHTML = 'hey'

let wrapper = newElement("div", document.body, "wrapper");
//wrapper.innerHTML = 'hey there'

async function data() {
  let request = await fetch("https://opentdb.com/api.php?amount=10");
  //let request = await fetch ('https://opentdb.com/api.php?amount=10&type=boolean')
  //let request = await fetch ('https://opentdb.com/api.php?amount=10&type=multiple')
  let response = await request.json();
  console.log(response);
  return response;
}

data()
  .then((val) => {
    if (val.results) {
      val.results.forEach((index)=>{forDisplay(newElement, index)});
//display either whole page with 10 Qs this way or probly create a button with eventlisner to move onto next arr indx
      function forDisplay(elementMaker, index) {
        let question = elementMaker("div", wrapper, "question");
        question.innerHTML = index.question;
        let options = elementMaker("div", wrapper, "options");
        options.innerHTML = answerArrMixer(index);
      }
    } else if (val.result) {
      let rejector = newElement("div", wrapper, "rejector");
      rejector.innerText = "API lagging, try again";
    }
  })
  .catch((er) => {
    let div = document.createElement("div");
    div.innerHTML = ` ${er}`;
    document.body.appendChild(div);
  });

  function answerArrMixer(val){
    let newR = [...val.incorrect_answers]
    newR.push(val.correct_answer)
    //console.log(newR)
    return newR.sort(() => 0.5 - Math.random())
  }

  function btnMaker(text, elementMaker){
    let btn = elementMaker('button', wrapper, 'btn')
    btn.innerHTML = text
    return btn
  }
  btnMaker('Next', newElement).addEventListener('click', ()=>{})