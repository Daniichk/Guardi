const overlay = document.createElement('div');
overlay.id = 'guard-overlay';
overlay.innerHTML = `
<div style="font-family: 'Inter', sans-serif; background: white; color: #1a1a1a; height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 999999; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center;">
    <h1 style="font-size: 48px; margin-bottom: 10px;">GUARD</h1>
    <p id="topic-label" style="text-transform: uppercase; letter-spacing: 2px; color: gray; font-size: 14px;"></p>
    <h2 id="question-text" style="font-size: 32px; margin: 30px 0; max-width: 600px;"></h2>
    <input type="text" id="guard-answer" placeholder="Type answer..." style="padding: 15px; width: 300px; border: 2px solid #eee; border-radius: 12px; font-size: 20px; outline: none; margin-bottom: 20px;">
    <button id="guard-check" style="padding: 15px 40px; background: #1a1a1a; color: white; border: none; border-radius: 12px; font-size: 18px; cursor: pointer;">Unlock YouTube</button>
</div>
`;

let currentCorrect = "";

const tasks = {
    "Python": [
        { q: "print(2**3)", a: "8" },
        { q: "len([1, 2, 3, 4])", a: "4" },
        { q: "type(3.14)", a: "float" },
        { q: "2 + 2 * 2", a: "6" },
        { q: "int('10') + 5", a: "15" },
        { q: "bool(0)", a: "false" }
    ],
    "Math": "generate",
    "JavaScript": [
        { q: "typeof []", a: "object" },
        { q: "3 + '3'", a: "33" },
        { q: "Math.floor(2.9)", a: "2" },
        { q: "Boolean('')", a: "false" }
    ],
    "English": [
        { q: "Past Simple of 'Go'", a: "went" },
        { q: "Opposite of 'Fast'", a: "slow" },
        { q: "Plural of 'Child'", a: "children" }
    ],
    "Physics": [
        { q: "Formula for Force (F=?)", a: "ma" },
        { q: "Speed of light starts with (num)...", a: "3" },
        { q: "Water boils at (?) Celsius", a: "100" }
    ],
    "History": [
        { q: "Year WW2 ended", a: "1945" },
        { q: "First man in space", a: "Gagarin" }
    ],
    "Geography": [
        { q: "Capital of Spain", a: "Madrid" },
        { q: "Biggest planet", a: "Jupiter" },
        { q: "Deepest ocean", a: "Pacific" }
    ]
};

function generateQuestion() {
    const categories = Object.keys(tasks);
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    document.getElementById('topic-label').innerText = category;

    if (category === "Math") {
        const a = Math.floor(Math.random() * 50) + 10;
        const b = Math.floor(Math.random() * 9) + 2;
        currentCorrect = (a * b).toString();
        document.getElementById('question-text').innerText = `${a} × ${b} = ?`;
    } else {
        const list = tasks[category];
        const item = list[Math.floor(Math.random() * list.length)];
        currentCorrect = item.a.toLowerCase();
        document.getElementById('question-text').innerText = item.q;
    }
}

// Запуск блокировки
if (window.location.hostname.includes("youtube.com")) {
    document.documentElement.appendChild(overlay);
    generateQuestion();

    document.getElementById('guard-check').onclick = () => {
        const val = document.getElementById('guard-answer').value.trim().toLowerCase();
        if (val === currentCorrect) {
            overlay.remove(); // Убираем блокировку
        } else {
            alert("Wrong! Stay focused.");
            generateQuestion();
        }
    };
}
