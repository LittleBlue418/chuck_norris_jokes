document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  e.preventDefault()
  const number = document.querySelector('input[type="number"]').value;

  if (number === '') {
    document.querySelector('.jokes').innerHTML = `Please enter a valid number`
  } else {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function () {
      if (this.status === 200) {
        const response = JSON.parse(this.responseText);

        let output = '';

        if (response.type === 'success') {
          /*  NB we first target the value, thisis due to how the array
              is set up. each array is different so check how your
              response comes back! */
          output += `<h3>Jokes</h3>`

          response.value.forEach(function (joke) {
            output += `<li>${joke.joke}</li>`
          })
        } else {
          output += '<li>Something went wrong!</li>'
        }

        document.querySelector('.jokes').innerHTML = output
      }
    }

    xhr.send();
  }
}