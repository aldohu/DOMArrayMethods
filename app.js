const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
let information = [];
const personElements = [];
const formatMoney = function (number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const add = function (user) {
	const div = document.createElement('div');
	div.classList.add('person');
	div.innerHTML = `<strong>${user.name}</strong> <span>${formatMoney(
		user.money,
	)}</span></div>`;
	main.appendChild(div);
	personElements.push(div);
};
async function fetchData() {
	try {
		const response = await fetch('https://randomuser.me/api/');
		const data = await response.json();
		console.log(data.results[0]);
		const user = data.results[0];
		// Process the data further or perform additional actions
		const newUser = {
			name: `${user.name.first} ${user.name.last}`,
			money: Math.floor(Math.random() * 1000000),
		};
		information.push(newUser);
		console.log(information);
		console.log(data);
		console.log(newUser);
		add(newUser);
	} catch (error) {
		console.log(error);
	}
}
let i = 0;
while (i < 3) {
	fetchData();
	i++;
}
const children = main.children;

addUserBtn.addEventListener('click', fetchData);
doubleBtn.addEventListener('click', function (e) {
	e.preventDefault();
	const children = personElements;
	if (information.length > 0) {
		console.log(children);
		information.map((user, i) => {
			user.money = user.money * 2;
			children[i].children[1].innerHTML = formatMoney(user.money);
		});
		console.log(information);
	}
});
showMillionairesBtn.addEventListener('click', function (e) {
	e.preventDefault();
	const children = personElements;
	if (information.length > 0) {
		console.log(children);
		const millionaires = information.filter((user, i) => {
			if (user.money > 1000000) {
				return user;
			}
		});
		const divElements = main.querySelectorAll('div');
		divElements.forEach((div) => div.remove());

		millionaires.map((user) => {
			add(user);
		});
	}
});
sortBtn.addEventListener('click', function (e) {
	e.preventDefault();
	const children = personElements;
	if (information.length > 0) {
		const millionaires = information.sort((a, b) => {
			return b.money - a.money;

			children[i].children[1].innerHTML = formatMoney(user.money);
		});
		const divElements = main.querySelectorAll('div');
		divElements.forEach((div) => div.remove());
		console.log(millionaires);
		millionaires.map((user) => {
			add(user);
		});
	}
});

calculateWealthBtn.addEventListener('click', function (e) {
	e.preventDefault();
	const children = personElements;
	if (information.length > 0) {
		const millionaires = information.reduce((a, b) => {
			console.log(a);
			console.log('and' + b);
			return +a + +b.money;
		}, 0);
		console.log(millionaires);
		const div = document.createElement('div');
		div.style.backgroundColor = 'white';
		div.classList.add('person');
		div.innerHTML = `<strong>Total Wealth:</strong> <span>${formatMoney(
			millionaires,
		)}</span></div>`;
		main.appendChild(div);
	}
});
