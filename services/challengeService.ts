import { BadgeIcons } from '../components/icons/BadgeIcons';
import { Task } from '../types';

const originalTasks: Omit<Task, 'badge'>[] = [
  { id: 1, level: 1, text: "type this line of text", wpmGoal: 10, accuracyGoal: 90, coinReward: 1 },
  { id: 2, level: 2, text: "practice makes perfect always", wpmGoal: 15, accuracyGoal: 92, coinReward: 1 },
  { id: 3, level: 3, text: "the sun is very bright today", wpmGoal: 20, accuracyGoal: 93, coinReward: 1 },
  { id: 4, level: 4, text: "good habits form good people", wpmGoal: 25, accuracyGoal: 94, coinReward: 1 },
  { id: 5, level: 5, text: "the dog ran across the field", wpmGoal: 30, accuracyGoal: 95, coinReward: 1 },
  { id: 6, level: 6, text: "look before you leap for safety", wpmGoal: 35, accuracyGoal: 95, coinReward: 3 },
  { id: 7, level: 7, text: "An elephant is a large mammal.", wpmGoal: 40, accuracyGoal: 96, coinReward: 1 },
  { id: 8, level: 8, text: "The moon orbits the Earth.", wpmGoal: 42, accuracyGoal: 96, coinReward: 1 },
  { id: 9, level: 9, text: "She sells seashells by the seashore.", wpmGoal: 45, accuracyGoal: 97, coinReward: 0 },
  { id: 10, level: 10, text: "Coding requires logic and patience.", wpmGoal: 48, accuracyGoal: 97, coinReward: 2 },
  { id: 11, level: 11, text: "Innovation distinguishes a leader.", wpmGoal: 50, accuracyGoal: 98, coinReward: 1 },
  { id: 12, level: 12, text: "Always check your sources for facts.", wpmGoal: 52, accuracyGoal: 98, coinReward: 0 },
  { id: 13, level: 13, text: "What's the weather like tomorrow?", wpmGoal: 55, accuracyGoal: 98, coinReward: 1 },
  { id: 14, level: 14, text: "Their_email@example.com is fake.", wpmGoal: 58, accuracyGoal: 99, coinReward: 1 },
  { id: 15, level: 15, text: "He asked, \"What's the final plan?\"", wpmGoal: 60, accuracyGoal: 99, coinReward: 1 },
  { id: 16, level: 16, text: "The function call is `getData(123)`. ", wpmGoal: 62, accuracyGoal: 99, coinReward: 1 },
  { id: 17, level: 17, text: "That is an astonishingly large cat!", wpmGoal: 65, accuracyGoal: 99, coinReward: 1 },
  { id: 18, level: 18, text: "The array[0] value is `undefined`.", wpmGoal: 68, accuracyGoal: 99, coinReward: 1 },
  { id: 19, level: 19, text: "It's a complex algorithm (O(n^2)).", wpmGoal: 70, accuracyGoal: 99, coinReward: 1 },
  { id: 20, level: 20, text: "The quick brown fox jumps over the lazy dog.", wpmGoal: 72, accuracyGoal: 100, coinReward: 0 },
  { id: 21, level: 21, text: "Asynchronous functions use `await`.", wpmGoal: 75, accuracyGoal: 100, coinReward: 1 },
  { id: 22, level: 22, text: "She exclaimed, \"This is incredible!\" It truly was.", wpmGoal: 78, accuracyGoal: 100, coinReward: 1 },
  { id: 23, level: 23, text: "HTTP/2 provides multiplexing over a single TCP connection.", wpmGoal: 80, accuracyGoal: 100, coinReward: 1 },
  { id: 24, level: 24, text: "The CEO's email (ceo@corp.co) was hard-to-find.", wpmGoal: 85, accuracyGoal: 100, coinReward: 1 },
  { id: 25, level: 25, text: "By Jove, my quick study of lexicography won a prize!", wpmGoal: 90, accuracyGoal: 100, coinReward: 2 },
  { id: 26, level: 26, text: "The variable `const user_id = 'usr-12345';` is a constant.", wpmGoal: 91, accuracyGoal: 100, coinReward: 1 },
  { id: 27, level: 27, text: "Navigate to `C:\\Users\\Default\\Documents` to find the files.", wpmGoal: 92, accuracyGoal: 100, coinReward: 1 },
  { id: 28, level: 28, text: "The JSON response was: {\"status\": \"success\", \"data\": []}", wpmGoal: 93, accuracyGoal: 100, coinReward: 1 },
  { id: 29, level: 29, text: "Hexadecimal colors like #FF5733 are common in CSS.", wpmGoal: 94, accuracyGoal: 100, coinReward: 1 },
  { id: 30, level: 30, text: "The regex /\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b/i matches emails.", wpmGoal: 96, accuracyGoal: 100, coinReward: 3 },
  { id: 31, level: 31, text: "The API endpoint is `https://api.example.com/v1/users`.", wpmGoal: 97, accuracyGoal: 100, coinReward: 1 },
  { id: 32, level: 32, text: "A `git commit -m \"Initial commit\"` starts the repository history.", wpmGoal: 98, accuracyGoal: 100, coinReward: 0 },
  { id: 33, level: 33, text: "The SQL query `SELECT * FROM customers;` is fundamental.", wpmGoal: 99, accuracyGoal: 100, coinReward: 1 },
  { id: 34, level: 34, text: "Error 404: The requested resource could not be found.", wpmGoal: 100, accuracyGoal: 100, coinReward: 1 },
  { id: 35, level: 35, text: "Use `chmod 755 script.sh` to make the script executable.", wpmGoal: 102, accuracyGoal: 100, coinReward: 1 },
  { id: 36, level: 36, text: "The process ID (PID) for the server is 8080.", wpmGoal: 103, accuracyGoal: 100, coinReward: 1 },
  { id: 37, level: 37, text: "XML tags, like `<note>`, must be properly closed with `</note>`.", wpmGoal: 104, accuracyGoal: 100, coinReward: 0 },
  { id: 38, level: 38, text: "Object-oriented programming (OOP) uses classes and objects.", wpmGoal: 105, accuracyGoal: 100, coinReward: 1 },
  { id: 39, level: 39, text: "The JWT (JSON Web Token) is used for authentication.", wpmGoal: 106, accuracyGoal: 100, coinReward: 1 },
  { id: 40, level: 40, text: "The SHA-256 hash is a cryptographic security function.", wpmGoal: 108, accuracyGoal: 100, coinReward: 1 },
  { id: 41, level: 41, text: "It was the best of times, it was the worst of times, it was the age of wisdom.", wpmGoal: 109, accuracyGoal: 100, coinReward: 1 },
  { id: 42, level: 42, text: "All that glitters is not gold; not all those who wander are lost.", wpmGoal: 110, accuracyGoal: 100, coinReward: 3 },
  { id: 43, level: 43, text: "The only thing we have to fear is fear itself—nameless, unreasoning terror.", wpmGoal: 111, accuracyGoal: 100, coinReward: 1 },
  { id: 44, level: 44, text: "Two roads diverged in a wood, and I—I took the one less traveled by.", wpmGoal: 112, accuracyGoal: 100, coinReward: 1 },
  { id: 45, level: 45, text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", wpmGoal: 114, accuracyGoal: 100, coinReward: 1 },
  { id: 46, level: 46, text: "So we beat on, boats against the current, borne back ceaselessly into the past.", wpmGoal: 115, accuracyGoal: 100, coinReward: 1 },
  { id: 47, level: 47, text: "The woods are lovely, dark and deep, but I have promises to keep.", wpmGoal: 116, accuracyGoal: 100, coinReward: 1 },
  { id: 48, level: 48, text: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character.", wpmGoal: 117, accuracyGoal: 100, coinReward: 0 },
  { id: 49, level: 49, text: "Elementary, my dear Watson; it is a capital mistake to theorize before one has data.", wpmGoal: 118, accuracyGoal: 100, coinReward: 1 },
  { id: 50, level: 50, text: "Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles.", wpmGoal: 120, accuracyGoal: 100, coinReward: 5 },
  { id: 51, level: 51, text: "The only way to do great work is to love what you do.", wpmGoal: 121, accuracyGoal: 100, coinReward: 1 },
  { id: 52, level: 52, text: "Stay hungry, stay foolish. Never let the noise of others' opinions drown out your own inner voice.", wpmGoal: 122, accuracyGoal: 100, coinReward: 1 },
  { id: 53, level: 53, text: "The future belongs to those who believe in the beauty of their dreams.", wpmGoal: 123, accuracyGoal: 100, coinReward: 3 },
  { id: 54, level: 54, text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", wpmGoal: 124, accuracyGoal: 100, coinReward: 1 },
  { id: 55, level: 55, text: "You must be the change you wish to see in the world. An eye for an eye will only make the whole world blind.", wpmGoal: 126, accuracyGoal: 100, coinReward: 1 },
  { id: 56, level: 56, text: "The journey of a thousand miles begins with a single step. Do not wait; the time will never be 'just right'.", wpmGoal: 127, accuracyGoal: 100, coinReward: 0 },
  { id: 57, level: 57, text: "If you want to live a happy life, tie it to a goal, not to people or things.", wpmGoal: 128, accuracyGoal: 100, coinReward: 1 },
  { id: 58, level: 58, text: "Life is what happens when you're busy making other plans. The purpose of our lives is to be happy.", wpmGoal: 129, accuracyGoal: 100, coinReward: 1 },
  { id: 59, level: 59, text: "I think, therefore I am. Cogito, ergo sum. The unexamined life is not worth living.", wpmGoal: 130, accuracyGoal: 100, coinReward: 0 },
  { id: 60, level: 60, text: "That's one small step for a man, one giant leap for mankind. The eagle has landed.", wpmGoal: 132, accuracyGoal: 100, coinReward: 2 },
  { id: 61, level: 61, text: "The pulchritudinous sesquipedalian was, unequivocally, a logophile.", wpmGoal: 133, accuracyGoal: 100, coinReward: 3 },
  { id: 62, level: 62, text: "A syzygy of celestial bodies created an ephemeral, crepuscular light.", wpmGoal: 134, accuracyGoal: 100, coinReward: 1 },
  { id: 63, level: 63, text: "The garrulous gadabout's grandiloquence was a bit galling.", wpmGoal: 135, accuracyGoal: 100, coinReward: 1 },
  { id: 64, level: 64, text: "His panacea for lassitude was a perfunctory dip in the briny.", wpmGoal: 136, accuracyGoal: 100, coinReward: 1 },
  { id: 65, level: 65, text: "The somnambulist's peregrination through the gloaming was eerie.", wpmGoal: 138, accuracyGoal: 100, coinReward: 1 },
  { id: 66, level: 66, text: "A juxtaposition of archaic and modern styles (e.g. Art Deco).", wpmGoal: 139, accuracyGoal: 100, coinReward: 0 },
  { id: 67, level: 67, text: "The lachrymose denouement left the audience feeling melancholy.", wpmGoal: 140, accuracyGoal: 100, coinReward: 1 },
  { id: 68, level: 68, text: "He was a bibliophile, his collection replete with incunabula.", wpmGoal: 141, accuracyGoal: 100, coinReward: 1 },
  { id: 69, level: 69, text: "The serendipitous discovery was a quintessential eureka moment.", wpmGoal: 142, accuracyGoal: 100, coinReward: 1 },
  { id: 70, level: 70, text: "Her perspicacious analysis elucidated the recondite subject.", wpmGoal: 144, accuracyGoal: 100, coinReward: 1 },
  { id: 71, level: 71, text: "An anachronism, he preferred the pluperfect tense in conversation.", wpmGoal: 145, accuracyGoal: 100, coinReward: 1 },
  { id: 72, level: 72, text: "The zenith of his career was his magnanimous, albeit quixotic, quest.", wpmGoal: 146, accuracyGoal: 100, coinReward: 0 },
  { id: 73, level: 73, text: "Their vociferous vituperation was an execrable display.", wpmGoal: 147, accuracyGoal: 100, coinReward: 3 },
  { id: 74, level: 74, text: "The concatenation of events led to a serendipitous outcome.", wpmGoal: 148, accuracyGoal: 100, coinReward: 1 },
  { id: 75, level: 75, text: "The sycophant's obsequious praise was met with taciturn disdain.", wpmGoal: 150, accuracyGoal: 100, coinReward: 2 },
  { id: 76, level: 76, text: "The fast-paced ~`|<>{}|`~ symbols require quick finger dexterity.", wpmGoal: 151, accuracyGoal: 100, coinReward: 1 },
  { id: 77, level: 77, text: "My phone number is (123)-456-7890; call me maybe!", wpmGoal: 152, accuracyGoal: 100, coinReward: 1 },
  { id: 78, level: 78, text: "The equation `E=mc^2` is elegantly simple yet profound.", wpmGoal: 153, accuracyGoal: 100, coinReward: 0 },
  { id: 79, level: 79, text: "Let's meet at 5:30 PM, not 17:30. It's confusing!", wpmGoal: 154, accuracyGoal: 100, coinReward: 1 },
  { id: 80, level: 80, text: "The price is $99.99 + 8.25% tax, totaling ~$108.24.", wpmGoal: 156, accuracyGoal: 100, coinReward: 1 },
  { id: 81, level: 81, text: "for(let i=0; i<arr.length; i++){ await process(arr[i]); } // Fast loop!", wpmGoal: 157, accuracyGoal: 100, coinReward: 0 },
  { id: 82, level: 82, text: "The server's IP is 192.168.1.1, with a subnet of 255.255.255.0.", wpmGoal: 158, accuracyGoal: 100, coinReward: 1 },
  { id: 83, level: 83, text: "She quoted: \"It's true!\" (See page 42, paragraph 3).", wpmGoal: 159, accuracyGoal: 100, coinReward: 1 },
  { id: 84, level: 84, text: "The coordinates are 34.0522° N, 118.2437° W. A beautiful place.", wpmGoal: 160, accuracyGoal: 100, coinReward: 0 },
  { id: 85, level: 85, text: "The film's budget was a whopping $250,000,000. Can you believe it?!", wpmGoal: 162, accuracyGoal: 100, coinReward: 1 },
  { id: 86, level: 86, text: "<div id=\"main-container\" class=\"flex-center\">...</div> <!-- HTML -->", wpmGoal: 163, accuracyGoal: 100, coinReward: 1 },
  { id: 87, level: 87, text: "The hexadecimal value `0xDEADBEEF` is often used in debugging.", wpmGoal: 164, accuracyGoal: 100, coinReward: 1 },
  { id: 88, level: 88, text: "His keyboard shortcuts (e.g., Ctrl+C, Ctrl+V) are second nature.", wpmGoal: 165, accuracyGoal: 100, coinReward: 0 },
  { id: 89, level: 89, text: "The file path is `/usr/local/bin/script.sh`. Don't forget the args!", wpmGoal: 166, accuracyGoal: 100, coinReward: 1 },
  { id: 90, level: 90, text: "The quick brown fox jumps over the lazy dog 1234567890 times.", wpmGoal: 168, accuracyGoal: 100, coinReward: 0 },
  { id: 91, level: 91, text: "He said--and I quote--\"This is the end!\"... or is it?", wpmGoal: 169, accuracyGoal: 100, coinReward: 1 },
  { id: 92, level: 92, text: "const { data: userData } = await fetchData('users/1'); // Destructuring", wpmGoal: 170, accuracyGoal: 100, coinReward: 1 },
  { id: 93, level: 93, text: "The password requires one uppercase, one number, and one symbol (e.g., P@ssw0rd!).", wpmGoal: 171, accuracyGoal: 100, coinReward: 1 },
  { id: 94, level: 94, text: "The package.json file lists dependencies like \"react\": \"^18.2.0\".", wpmGoal: 172, accuracyGoal: 100, coinReward: 0 },
  { id: 95, level: 95, text: "The quick onyx goblin jumps over the lazy dwarf. (Another pangram!)", wpmGoal: 174, accuracyGoal: 100, coinReward: 1 },
  { id: 96, level: 96, text: "Please send the payment of €1,234.56 via wire transfer by 2024-12-31.", wpmGoal: 175, accuracyGoal: 100, coinReward: 1 },
  { id: 97, level: 97, text: "The chemical formula for water is H₂O; it's quite simple, isn't it?", wpmGoal: 176, accuracyGoal: 100, coinReward: 1 },
  { id: 98, level: 98, text: "A flock of crows is called a \"murder\" — how ominous!", wpmGoal: 177, accuracyGoal: 100, coinReward: 1 },
  { id: 99, level: 99, text: "Cwm fjord bank glyphs vext quiz. (The shortest pangram!)", wpmGoal: 178, accuracyGoal: 100, coinReward: 3 },
  { id: 100, level: 100, text: "With `(6*7=42)` figs, Jack lovingly quieted the xenophobic monkey-vizier.", wpmGoal: 180, accuracyGoal: 100, coinReward: 2 },
];

export const TASKS: Task[] = originalTasks.map(task => {
    // Special badge for level 50
    if (task.level === 50) {
        return {
            ...task,
            badge: {
                name: "Midway Maestro",
                icon: 'GrandMasterTrophy'
            }
        };
    }
    // Special case for the final, ultimate badge
    if (task.level === 100) {
        return {
            ...task,
            badge: {
                name: "Ultimate Typing Master",
                icon: 'MasterCrown'
            }
        };
    }
    
    // Generic badge for all other levels
    return {
        ...task,
        badge: {
            name: `Level ${task.level} Complete`,
            icon: `LevelBadge${task.level}` as keyof typeof BadgeIcons
        }
    };
});