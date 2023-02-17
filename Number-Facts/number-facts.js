const addMoreButton = document.getElementById('add-more');
const multipleInputsSpan = document.getElementById('multiple-inputs');
const submitSingle = document.getElementById('submit-single');
const submitMultiple = document.getElementById('submit-multiple');
const submitForFour = document.getElementById('submit-for-four');

addMoreButton.addEventListener('click', addNumberInput);
submitSingle.addEventListener('click', submitSingleClick);
submitMultiple.addEventListener('click', submitMultipleClick);
submitForFour.addEventListener('click', submitForFourClick);

function addNumberInput() {
  const newInput = document.createElement('input');
  newInput.setAttribute('type', 'number');
  newInput.classList.add('multiple');
  multipleInputsSpan.append(newInput);
}

function submitSingleClick() {
  const number = document.getElementById('single-input').value;
  const respPromise = axios.get(`http://numbersapi.com/${number}/math?json`);
  respPromise
    .then(res => {
      document.getElementById('single-number-display').textContent = res.data.text;
    })
    .catch(err => alert(err));
}

function submitMultipleClick() {
  const inputs = document.getElementsByClassName('multiple');
  let batchText = inputs[0].value;
  for (let i = 1; i < inputs.length; i++) {
    batchText = batchText + ',' + inputs[i].value;
  }
  const respPromise = axios.get(`http://numbersapi.com/${batchText}/math?json`);
  respPromise
    .then(res => {
      const multipleNumberDisplay = document.getElementById('multiple-number-display');
      multipleNumberDisplay.textContent = '';
      for (const key in res.data) {
        const newP = document.createElement('p');
        newP.textContent = res.data[key];
        multipleNumberDisplay.append(newP);
      }
    })
    .catch(err => alert(err));
}

function submitForFourClick() {
  const number = document.getElementById('four-facts').value;
  const facts = [];
  const fourFactsDisplay = document.getElementById('four-facts-display');
  fourFactsDisplay.textContent = '';
  axios.get(`http://numbersapi.com/${number}/math?json`)
    .then(res => {
      facts.push(res.data.text);
      return axios.get(`http://numbersapi.com/${number}/math?json`)
    })
    .then(res => {
      facts.push(res.data.text);
      return axios.get(`http://numbersapi.com/${number}/math?json`)
    })
    .then(res => {
      facts.push(res.data.text);
      return axios.get(`http://numbersapi.com/${number}/math?json`)
    })
    .then(res => {
      facts.push(res.data.text);
      for (const fact of facts) {
        const newP = document.createElement('p');
        newP.textContent = fact;
        fourFactsDisplay.append(newP);
      }
    })
    .catch(err => alert(err));
}