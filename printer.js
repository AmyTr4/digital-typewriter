// typewriter heading
const HEADING_PREFIX = "Daily";
const ROTATING_WORDS = ['Hell :,(', 'Tasks', 'Summary'];
const TYPE_DELAY = 90;
const DELETE_DELAY = 60;
const HOLD_AFTER_TYPE = 1400;
const HOLD_AFTER_DELETE = 300;

const heading = document.querySelector('.intro h1');
const headingText = heading.textContent;
heading.textContent = '';

const caret = document.createElement('span');
caret.className = 'caret';
caret.textContent = '|';
heading.appendChild(caret);

function typeString(str, i, done) {
  if (i >= str.length) return done();
  caret.before(str[i]);
  setTimeout(() => typeString(str, i + 1, done), TYPE_DELAY);
}

function deleteChars(n, done) {
  if (n <= 0) return done();
  const prev = caret.previousSibling;
  if (prev) {
    if (prev.nodeType === Node.TEXT_NODE && prev.data.length > 1) {
      prev.data = prev.data.slice(0, -1);
    } else {
      prev.remove();
    }
  }
  setTimeout(() => deleteChars(n - 1, done), DELETE_DELAY);
}

function loopWord(idx) {
  const word = ROTATING_WORDS[idx % ROTATING_WORDS.length];
  typeString(word, 0, () => {
    setTimeout(() => {
      deleteChars(word.length, () => {
        setTimeout(() => loopWord(idx + 1), HOLD_AFTER_DELETE);
      });
    }, HOLD_AFTER_TYPE);
  });
}

setTimeout(() => {
  typeString(headingText, 0, () => {
    setTimeout(() => {
      const trailing = headingText.length - HEADING_PREFIX.length;
      deleteChars(trailing, () => {
        setTimeout(() => loopWord(0), HOLD_AFTER_DELETE);
      });
    }, HOLD_AFTER_TYPE);
  });
}, 2000);

// printer resting / print me text
const eventCount = myEvents.length;
const reactionFrame = eventCount > 3 ? '૮(˶ㅠ︿ㅠ)ა ' : eventCount < 3 ? '( ˶ˆᗜˆ˵ )' : null;
const RESTING_FRAMES = ['₊✩‧₊˚print me₊✩‧₊˚', '₊˚₊✩‧print me₊˚₊✩‧'];
if (reactionFrame) RESTING_FRAMES.push(reactionFrame);
const PRINTING_FRAMES = ['₊ ⊹ . ݁printing₊ ⊹ . ݁˖', '⊹ . ݁₊ printing₊ . ݁˖⊹ '];

let idleFrame = 0;
printerText.textContent = RESTING_FRAMES[0];
const idleInterval = setInterval(() => {
  idleFrame = (idleFrame + 1) % RESTING_FRAMES.length;
  printerText.textContent = RESTING_FRAMES[idleFrame];
}, 600); 

// receipt shake when click
function shakeReceipt() {
  receipt.classList.remove('is-shake');
  void receipt.offsetWidth;
  receipt.classList.add('is-shake');
}

receipt.addEventListener('click', (e) => {
  if (e.target.closest('.todo')) return;
  shakeReceipt();
});

receipt.addEventListener('animationend', (e) => {
  if (e.animationName === 'receipt-shake') receipt.classList.remove('is-shake');
});

// button flow 
printBtn.addEventListener('click', () => {
  clearInterval(idleInterval);
  stage.classList.add('is-printing');

  let frame = 0;
  printerText.textContent = PRINTING_FRAMES[0];
  const textInterval = setInterval(() => {
    frame = 1 - frame;
    printerText.textContent = PRINTING_FRAMES[frame];
  }, 400);

  receipt.addEventListener('transitionend', function onPrintEnd(e) {
    if (e.propertyName !== 'transform') return;
    receipt.removeEventListener('transitionend', onPrintEnd);
    clearInterval(textInterval);
    stage.classList.add('is-done');

    receipt.addEventListener('transitionend', function onSettle(e2) {
      if (e2.propertyName !== 'transform') return;
      receipt.removeEventListener('transitionend', onSettle);
      shakeReceipt();
    });
  });
});

