// definition
function renderEvents(events) {
  eventsList.innerHTML = '';                  // clear whatever's there

  events.forEach((event) => {
    const li = document.createElement('li');

    const icon = document.createElement('span');
    icon.className = `event-icon event-${event.category}`;
    icon.textContent = event.category;

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = event.title;

    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = `${event.start}–${event.end}`;

    li.append(icon, label, time);

    if (event.link) {                          // only if this event has one
      const link = document.createElement('a');
      link.href = event.link;
      link.textContent = 'link';
      link.target = '_blank';
      li.append(link);
    }

    eventsList.append(li);
  });
}

function renderTasks(tasks) {
  todosList.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'todo';

    const icon = document.createElement('span');
    icon.className = `todo-icon todo-${task.category}`;
    icon.textContent = task.category;

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = task.title;

    li.append(icon, label);
    todosList.append(li);
  });
}



// receipt date stamp
const today = new Date ();
receiptDate.textContent = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;


// celebrate task finish sparkle effect 
const SPARKLE_SYMBOLS = ['✦', '✧', '⋆', '✩', '✶'];
const SPARKLE_COLORS = ['#EC6E9E', '#9E6EDA', '#C76EAB', '#FFD978'];
const SPARKLES_PER_BURST = 8;

function burstStars(x, y) {
  for (let i = 0; i < SPARKLES_PER_BURST; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.textContent = randomItem(SPARKLE_SYMBOLS);
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.color = randomItem(SPARKLE_COLORS);
    sparkle.style.fontSize = `${12 + Math.random() * 12}px`;

    const angle = (i / SPARKLES_PER_BURST) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 32 + Math.random() * 28;
    sparkle.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    sparkle.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);

    document.body.appendChild(sparkle);
    sparkle.addEventListener('animationend', () => sparkle.remove());
  }
}

todosList.addEventListener('click', (e) => {
  const todo = e.target.closest('.todo');
  if (!todo) return;

  const willBeDone = !todo.classList.contains('done');
  todo.classList.toggle('done');
  if (willBeDone) burstStars(e.clientX, e.clientY);
});

// call
renderEvents(myEvents);
renderTasks(myTasks);