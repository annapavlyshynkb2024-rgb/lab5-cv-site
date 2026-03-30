// Тема та іконка
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function updateThemeUI(isDark) {
    themeIcon.innerText = isDark ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("cv_theme", isDark ? "dark" : "light");
    updateThemeUI(isDark);
});

function initTheme() {
    const saved = localStorage.getItem("cv_theme");
    const isNight = new Date().getHours() >= 21 || new Date().getHours() < 7;
    
    if (saved === "dark" || (!saved && isNight)) {
        document.body.classList.add("dark");
        updateThemeUI(true);
    }
}
initTheme();

// Дані про браузер
const info = {
    platform: navigator.platform,
    lang: navigator.language
};
document.getElementById("footerInfo").innerHTML = `
    <p>Система: ${info.platform} | Мова: ${info.lang}</p>
    <p>© 2026 Анна Павлишин</p>
`;

// Завантаження коментарів
fetch("https://jsonplaceholder.typicode.com/posts/22/comments")
    .then(r => r.json())
    .then(data => {
        const list = document.getElementById("comments");
        data.slice(0, 3).forEach((item, i) => {
            const card = document.createElement("div");
            card.className = "comment";
            card.innerHTML = `<h4>${item.name}</h4><p>${item.body}</p><small>${item.email}</small>`;
            card.style.opacity = "0";
            list.appendChild(card);
            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transition = "0.8s ease";
            }, i * 200);
        });
    });

// Модальне вікно
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
setTimeout(() => {
    document.getElementById("modal").style.display = "block";
}, 30000);