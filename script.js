//▶fetch data ✔
//▶dispaly it in console ✔
//▶display questions one by one, upon answer of each question the next appears
//▶show correct answers in the end

//console.log('hello')

function newElement(element, parent, elClass) {
  let newL = document.createElement(element);
  parent.appendChild(newL);
  newL.classList.add(elClass);
  return newL;
}

function answerArrMixer(obj) {
  let newR = [...obj.incorrect_answers];
  newR.push(obj.correct_answer);
  return newR.sort(() => 0.5 - Math.random());
}

function btnMaker(text, elementMaker) {
  let btn = elementMaker("button", wrapper, "btn");
  btn.innerHTML = text;
  return btn;
}

var wrapper = newElement("div", document.body, "wrapper");
let nextBtn = btnMaker("Next", newElement);
nextBtn.style.display = "none";
let prevBtn = btnMaker("Previous", newElement);
prevBtn.style.display = "none";

window.onload = () => {
  welcomeAnd1by1Qs(newElement, btnMaker);
};

function welcomeAnd1by1Qs(elementMaker, strtBtn) {
  let welcm = elementMaker("div", wrapper, "welcm");
  welcm.innerHTML = "lets play, click start";
  let strt = strtBtn("Start", elementMaker);
  strt.addEventListener("click", () => {
    qNav(welcm, strt);
  });
  //return { welcm, strt };
}

let currentIndex = 0;

function qNav(w, s) {
  w.style.display = "none";
  s.style.display = "none";
  let Qs = document.getElementsByClassName("question");
  let Ops = document.getElementsByClassName("options");

  // prevBtn.addEventListener("click", function prevQ() {
  //   return insidePrevQ(Qs, Ops);
  // });
  insideNextQ(Qs, Ops);
  nextBtn.style.display = "block";

  //else {
  // let over = newElement("div", wrapper, "Over");
  // over.innerHTML = "Finishhhhhhh";
  // return over;
  //   nextBtn.disabled = true;
  // }
}


//NEED TO DESIGN THE NEXT AND PREV FUNCIONS
function insideNextQ(Qs, Ops) {

  if (currentIndex > 0 && currentIndex <= 9) {
    Qs[currentIndex - 1].style.display = "none";
    Ops[currentIndex - 1].style.display = "none";
    prevBtn.style.display = "block";
  } 
    Qs[currentIndex].style.display = "block";
    Qs[currentIndex].textContent = `Question # ${currentIndex + 1}: ${
      Qs[currentIndex].textContent
    }`;
    Ops[currentIndex].style.display = "block";
    currentIndex += 1;
    console.log(currentIndex);
    nextBtn.addEventListener("click", function nextQ() {
      return insideNextQ(Qs, Ops);
    });
    //nextBtn.removeEventListener('click', nextQ);
  
}

function insidePrevQ(Qs, Ops) {
  if (currentIndex == 0) {
    Qs[currentIndex + 1].style.display = "none";
    Ops[currentIndex + 1].style.display = "none";
    prevBtn.style.display = "none";
    nextBtn.style.display = "block";
  }
    Qs[currentIndex].style.display = "block";
    Qs[currentIndex].textContent = `Question # ${currentIndex + 1}: ${
      Qs[currentIndex].textContent
    }`;
    Ops[currentIndex].style.display = "block";
  
  currentIndex -= 1;
  console.log(currentIndex);
}

/*
function nextQ(w, s) {
  if (currentIndex <= 9) {
    w.style.display = "none";
    s.style.display = "none";
    let Qs = document.getElementsByClassName("question");
    let Ops = document.getElementsByClassName("options");
    if (currentIndex > 0) {
      Qs[currentIndex - 1].style.display = "none";
      Ops[currentIndex - 1].style.display = "none";
    }
    Qs[currentIndex].style.display = "block";
    Qs[
      currentIndex
    ].textContent = `Question # ${currentIndex+1}: ${Qs[currentIndex].textContent}`;
    Ops[currentIndex].style.display = "block";
    nextBtn.style.display = "block";
    currentIndex += 1;
    console.log(currentIndex);    
  } else {
    // let over = newElement("div", wrapper, "Over");
    // over.innerHTML = "Finishhhhhhh";
    // return over;
    nextBtn.disabled = true;
  }
}*/

function handleNextQ() {
  nextBtn.removeEventListener("click", handleNextQ);
  return nextQ(w, s);
}

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
      val.results.forEach((index) =>
        forDisplay(newElement, answerArrMixer, index)
      );

      function forDisplay(elementMaker, ansArrMx, ind) {
        let question = elementMaker("div", wrapper, "question");
        question.innerHTML = ind.question;
        let options = elementMaker("div", wrapper, "options");
        options.innerHTML = ansArrMx(ind);
        question.style.display = "none";
        options.style.display = "none";
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
