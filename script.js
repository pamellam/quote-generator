const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const shareBtn = document.getElementById('copy');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quotes dynamically
function newQuote() {
  showLoading();
  // pick a random quote from apiQuotes array
  const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author field is blank and replace it with 'Unknown'
  if (!quotes.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quotes.author;
  }

  // Check the quote length to determine styling
  if (quotes.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set quote, hide loader
  quoteText.textContent = quotes.text;
  complete();

  // local quotes
  // const quotes = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // console.log(quotes);
}

// Get Quotes from API
async function getQuotes() {
  showLoading();

  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    //console.log(apiQuotes[12]);
  } catch (error) {
    // catch error here
    alert('We can not connect to the server. Please try again!');
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Format and copy the current quote to the clipboard
function copyToClipboard() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;

  const formattedText = `"${quote}" - ${author}`;

  const tempElement = document.createElement('textarea');
  tempElement.value = formattedText;

  navigator.clipboard
    .writeText(formattedText) // Use formattedText instead of combinedText
    .then(() => {
      alert('Quote copied to clipboard!');
    })
    .catch((err) => {
      console.error('Unable to copy to clipboard', err);
    });
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
shareBtn.addEventListener('click', copyToClipboard);

// On Load
getQuotes();
//newQuote();
