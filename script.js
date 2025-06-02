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

function btnMaker(text, elementMaker) {
  let btn = elementMaker("button", wrapper, "btn");
  btn.innerHTML = text;
  return btn;
}

function answerArrMixer(obj) {
  let newR = [...obj.incorrect_answers, obj.correct_answer];
  //newR.push(obj.correct_answer);
  let answerArr =  newR.sort(() => 0.5 - Math.random());
  //let checkBox = elementMaker()
  let form = newElement('form', wrapper, 'form');
  answerArr.forEach(
    (index) => {
      let radio = newElement('input', form, 'input');
      radio.type = 'radio';
      radio.name = 'options';
      radio.id = '';
    }
  );
  
  return answerArr;
  
}



var wrapper = newElement("div", document.body, "wrapper");
let bgImg = newElement('div', wrapper, 'bgImg');
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
}

let currentIndex = 0;

function qNav(wlcm, strt) {
  wlcm.style.display = "none";
  strt.style.display = "none";
  let qs = document.getElementsByClassName("question");
  let ops = document.getElementsByClassName("options");
  qs[currentIndex].style.display = 'block';
  ops[currentIndex].style.display = 'block'; 
  nextBtn.style.display = "block";
  nextBtn.addEventListener('click', function nextQ(){insideNextQ(qs, ops)});
  prevBtn.addEventListener('click', function prevQ(){insidePrevQ(qs, ops)});
}



function insideNextQ(qs, ops){
 
  currentIndex++;
  currentIndex > 8 ? nextBtn.disabled = true : nextBtn.disabled = false;
  currentIndex <= 0 ? prevBtn.disabled = true : prevBtn.disabled = false;
  currentIndex > 0 ? prevBtn.style.display = 'block' : prevBtn.style.display = 'none';
  qs[currentIndex-1].style.display = 'none';
  ops[currentIndex-1].style.display = 'none';
  qs[currentIndex].style.display = 'block';
  ops[currentIndex].style.display = 'block';
  
}

function insidePrevQ(qs, ops){
  currentIndex--;
  currentIndex > 8 ? nextBtn.disabled = true : nextBtn.disabled = false;
  currentIndex <= 0 ? prevBtn.disabled = true : prevBtn.disabled = false;
  qs[currentIndex+1].style.display = 'none';
  ops[currentIndex+1].style.display = 'none';
  qs[currentIndex].style.display = 'block';
  ops[currentIndex].style.display = 'block';
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
      let qNum = 0;
      val.results.forEach((objOnEachIndx) =>
        forDisplay(newElement, answerArrMixer, objOnEachIndx)      
      );

      function forDisplay(elementMaker, ansArrMx, indx) {
        qNum++;
        let question = elementMaker("div", wrapper, "question");
        question.innerHTML = `Question #${qNum}: ${indx.question}`;
        let options = elementMaker("div", wrapper, "options");
        options.innerHTML = ansArrMx(indx);
        //⏩⏩⏩PROBABLY CREATE A FUNCTION THAT INSERTS ANSWER ARRAY'S INDIVIDUAL ELEMENTS INTO SEPARATE RADIO BUTTONS/CHECKBOXES
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
