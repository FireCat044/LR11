$(document).ready(function() {
    let words = [
        { word: "apple", translation: "яблуко", image: "images/apple.jpg" }, 
        { word: "banana", translation: "банан", image: "images/banana.jpg" }, 
        { word: "pear", translation: "груша", image: "images/pear.jpg" }, 
        { word: "pineapple", translation: "ананас", image: "images/pineapple.jpg" },
        { word: "avocado", translation: "авокадо", image: "images/avocado.jpg" },
        { word: "kiwi", translation: "ківі", image: "images/kiwi.jpg" },
        { word: "peach", translation: "персик", image: "images/peach.jpg" },
        { word: "lime", translation: "лайм", image: "images/lime.jpg" },
        { word: "passion fruit", translation: "маракуйя", image: "images/passion.jpg"},
        { word: "mango", translation: "манго", image: "images/mango.jpg" },
    ];

    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    words = shuffleArray(words);

    function showNextWord() {
        if (currentStep < words.length) {
            const word = words[currentStep];
            $("#card-container").html('<img class="card-img" src="' + word.image + '" alt="' + word.word + '">');
            $(".card-img").on("click", function() {
                const input = prompt("Перекладіть слово: " + word.word);
                checkTranslation(input);
            });
        } else {
            showResults();
            showRetryButton();
        }
    }

    function checkTranslation(input) {
        if (input && input.toLowerCase() === words[currentStep].translation.toLowerCase()) {
            alert("Правильно!");
            correctCount++;
        } else {
            alert("Неправильно :( Правильний переклад: " + words[currentStep].translation);
            incorrectCount++;
        }

        currentStep++;
        updateProgress();
        updateScore();
        setTimeout(showNextWord, 500);
    }

    // Функція для оновлення прогресу
    function updateProgress() {
        $("#current-step").text(currentStep + 1);
    }
    // Функція для оновлення рахунку
    function updateScore() {
        $("#correct-count").text(correctCount);
        $("#incorrect-count").text(incorrectCount);
    }
    // Функція для виведення результатів
    function showResults() {
        alert("Тест пройдений!\n\nПравильно: " + correctCount + "\nНеправильно: " + incorrectCount);
    }

    // Функція для показу кнопки retry
    function showRetryButton() {
        const retryButton = $('<button id="retry-btn">Retry</button>');
        retryButton.on("click", function() {
            currentStep = 0;
            correctCount = 0;
            incorrectCount = 0;
            words = shuffleArray(words);
            showNextWord();
            retryButton.remove(); // Видаляємо кнопку retry після натискання
        });
        $("#app").append(retryButton);
    }

    // Функція для перемішування масиву
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // Початкове відображення першого слова
    showNextWord();
})
