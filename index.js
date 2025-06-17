const form = document.getElementById('guest-form');
const guestNameInput = document.getElementById('guest-name');
const guestList = document.getElementById('guest-list');

let guests = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = guestNameInput.value.trim();

  if (name === '') return;

  if (guests.length >= 10) {
    alert("Guest list is full! Maximum 10 guests.");
    return;
  }

  const guest = {
    id: Date.now(),
    name: name,
    attending: false,
    addedAt: new Date().toLocaleTimeString()
  };

  guests.push(guest);
  renderGuests();
  guestNameInput.value = '';
});

function renderGuests() {
  guestList.innerHTML = '';
  guests.forEach((guest) => {
    const li = document.createElement('li');
    li.className = 'guest-item';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'guest-info';
    infoDiv.innerHTML = `
      <strong>${guest.name}</strong>
      <span class="rsvp">[${guest.attending ? "Attending" : "Not Attending"}]</span>
      <small>Added at ${guest.addedAt}</small>
    `;

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Toggle RSVP';
    toggleBtn.onclick = () => {
      guest.attending = !guest.attending;
      renderGuests();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.onclick = () => {
      guests = guests.filter(g => g.id !== guest.id);
      renderGuests();
    };

    li.appendChild(infoDiv);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    guestList.appendChild(li);
  });
}
