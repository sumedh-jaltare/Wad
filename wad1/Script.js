const STORAGE_KEYS = {
	users: "users",
	currentUser: "currentUser",
	registrations: "registrations"
};

function getStoredArray(key) {
	const raw = localStorage.getItem(key);
	if (!raw) return [];

	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch (error) {
		return [];
	}
}

function saveStoredArray(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function setMessage(element, text, isError = false) {
	if (!element) return;
	element.textContent = text;
	element.className = `small mt-3 mb-0 ${isError ? "text-danger" : "text-success"}`;
}

function renderRegistrationTable(tableBody) {
	const registrations = getStoredArray(STORAGE_KEYS.registrations);
	if (registrations.length === 0) {
		tableBody.innerHTML = `
			<tr>
				<td colspan="7" class="text-center py-4 text-muted">No registrations found.</td>
			</tr>
		`;
		return;
	}

	tableBody.innerHTML = registrations
		.map((entry, index) => {
			const savedAt = new Date(entry.createdAt).toLocaleString();
			return `
				<tr>
					<td>${index + 1}</td>
					<td>${entry.fullName}</td>
					<td>${entry.email}</td>
					<td>${entry.phone}</td>
					<td>${entry.course}</td>
					<td>${entry.year}</td>
					<td>${savedAt}</td>
				</tr>
			`;
		})
		.join("");
}

function initAuthPage() {
	const loginForm = document.getElementById("loginForm");
	const signupForm = document.getElementById("signupForm");
	const showLogin = document.getElementById("showLogin");
	const showSignup = document.getElementById("showSignup");
	const authMessage = document.getElementById("authMessage");

	if (!loginForm || !signupForm || !showLogin || !showSignup) return;

	const switchMode = (isLogin) => {
		loginForm.classList.toggle("d-none", !isLogin);
		signupForm.classList.toggle("d-none", isLogin);

		showLogin.classList.toggle("btn-primary", isLogin);
		showLogin.classList.toggle("btn-outline-primary", !isLogin);
		showSignup.classList.toggle("btn-primary", !isLogin);
		showSignup.classList.toggle("btn-outline-primary", isLogin);

		setMessage(authMessage, "", false);
	};

	showLogin.addEventListener("click", () => switchMode(true));
	showSignup.addEventListener("click", () => switchMode(false));

	signupForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!signupForm.checkValidity()) {
			setMessage(authMessage, "Please fill all signup fields correctly.", true);
			return;
		}

		const name = document.getElementById("signupName").value.trim();
		const email = document.getElementById("signupEmail").value.trim().toLowerCase();
		const password = document.getElementById("signupPassword").value;

		const users = getStoredArray(STORAGE_KEYS.users);
		const existingUser = users.find((user) => user.email === email);

		if (existingUser) {
			setMessage(authMessage, "This email is already registered.", true);
			return;
		}

		const newUser = { id: Date.now(), name, email, password };
		users.push(newUser);
		saveStoredArray(STORAGE_KEYS.users, users);
		localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(newUser));

		setMessage(authMessage, "Signup successful. Redirecting...", false);
		setTimeout(() => {
			window.location.href = "dashboard.html";
		}, 600);
	});

	loginForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!loginForm.checkValidity()) {
			setMessage(authMessage, "Please fill all login fields correctly.", true);
			return;
		}

		const email = document.getElementById("loginEmail").value.trim().toLowerCase();
		const password = document.getElementById("loginPassword").value;

		const users = getStoredArray(STORAGE_KEYS.users);
		const matchedUser = users.find((user) => user.email === email && user.password === password);

		if (!matchedUser) {
			setMessage(authMessage, "Invalid email or password.", true);
			return;
		}

		localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(matchedUser));
		setMessage(authMessage, "Login successful. Redirecting...", false);

		setTimeout(() => {
			window.location.href = "dashboard.html";
		}, 600);
	});
}

function initDashboardPage() {
	const totalRegistrations = document.getElementById("totalRegistrations");
	const tableBody = document.getElementById("registrationTableBody");
	const clearButton = document.getElementById("clearRegistrations");
	if (!totalRegistrations) return;

	const registrations = getStoredArray(STORAGE_KEYS.registrations);
	totalRegistrations.textContent = String(registrations.length);

	if (tableBody) {
		renderRegistrationTable(tableBody);
	}

	if (clearButton && tableBody) {
		clearButton.addEventListener("click", () => {
			localStorage.removeItem(STORAGE_KEYS.registrations);
			totalRegistrations.textContent = "0";
			renderRegistrationTable(tableBody);
		});
	}
}

function initRegistrationPage() {
	const form = document.getElementById("registrationForm");
	const message = document.getElementById("registrationMessage");
	if (!form) return;

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		if (!form.checkValidity()) {
			setMessage(message, "Please fill all required fields correctly.", true);
			return;
		}

		const entry = {
			id: Date.now(),
			fullName: document.getElementById("fullName").value.trim(),
			email: document.getElementById("email").value.trim().toLowerCase(),
			phone: document.getElementById("phone").value.trim(),
			course: document.getElementById("course").value,
			year: document.getElementById("year").value,
			createdAt: new Date().toISOString()
		};

		const registrations = getStoredArray(STORAGE_KEYS.registrations);
		registrations.push(entry);
		saveStoredArray(STORAGE_KEYS.registrations, registrations);

		try {
			const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(entry)
			});

			if (!response.ok) {
				throw new Error("POST request failed");
			}

			setMessage(message, "Registration submitted and saved. Redirecting to dashboard...", false);
		} catch (error) {
			setMessage(message, "Saved locally, but POST request failed.", true);
		}

		setTimeout(() => {
			window.location.href = "dashboard.html";
		}, 800);
	});
}

function initRegistrationListPage() {
	const tableBody = document.getElementById("registrationTableBody");
	const clearButton = document.getElementById("clearRegistrations");
	if (!tableBody) return;

	renderRegistrationTable(tableBody);

	if (clearButton) {
		clearButton.addEventListener("click", () => {
			localStorage.removeItem(STORAGE_KEYS.registrations);
			renderRegistrationTable(tableBody);
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	initAuthPage();
	initDashboardPage();
	initRegistrationPage();
	initRegistrationListPage();
});
