/* Message */

var form = document.querySelector('.conversation-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', newMessage);

function newMessage(e) {
	e.preventDefault();
	var input = e.target.input;

	if (input.value) {
		var message = buildMessage(input.value, 'sent');
		conversation.appendChild(message);
	}

	input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	e.preventDefault();
}

function buildMessage(text, type, start, minutes) {
	var element = document.createElement('div');

	element.classList.add('message', type);

	element.innerHTML = text +
		'<span class="metadata">' +
			'<span class="time">' + moment(`01/09/2020 ${start}`).add(minutes, 'minutes').format('h:mm A') + '</span>' +
			'<span class="tick tick-animation">' +
				'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
			'</span>' +
		'</span>';

	return element;
}

function init() {
	const urlParams = new URLSearchParams(window.location.search);
	let hist = histories[urlParams.get('hist') || 0]

	var time = 0;
	var min = 0;//1000;
	var max = 0;//2000;
	document.querySelector('.name span').textContent = hist.title;
	hist.messages.forEach(message => {
		var elem = buildMessage(message.text, message.type, hist.start, message.minutes);
		setTimeout(()=> {
			conversation.appendChild(elem);
			conversation.scrollTop = conversation.scrollHeight
		}, time);
		time += min + Math.random() * max
	});
}

init();