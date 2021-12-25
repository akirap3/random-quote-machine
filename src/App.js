import { useEffect, useState } from 'react';
import './App.scss';
import COLOR_ARRAY from './colorArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let url =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  let initQuotes = {
    quote:
      'The most difficult thing is the decision to act, the rest is merely tenacity.',
    author: 'Amelia Earhart',
  };
  const [quotesArr, setQuotesArr] = useState();
  const [quotes, setQuotes] = useState(initQuotes);
  const [color, setColor] = useState('#282c34');

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuotesArr(data.quotes));
  }, []);

  const changeQuote = () => {
    const randomNum = Math.floor(Math.random() * quotesArr.length);
    const randomColor = Math.floor(Math.random() * COLOR_ARRAY.length);
    console.log(randomNum);
    setQuotes(quotesArr[randomNum]);
    setColor(COLOR_ARRAY[randomColor]);
  };

  return (
    <>
      {quotesArr ? (
        <div className="App" style={{ backgroundColor: color }}>
          <header
            className="App-header"
            id="quote-box"
            style={{ color: color }}
          >
            <p className="quote" id="text">
              "{quotes.quote}"
            </p>
            <div className="author" id="author">
              - {quotes.author}
            </div>
            <div className="btn-container">
              <a
                id="tweet-quote"
                href={encodeURI(
                  `https://twitter.com/intent/tweet?text=${quotes.quote} - ${quotes.author}`
                )}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <button id="new-quote" onClick={() => changeQuote()}>
                New quote
              </button>
            </div>
          </header>
        </div>
      ) : null}
    </>
  );
}

export default App;
