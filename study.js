// =======================================
// SpellMind - Study.js
// =======================================

// ----------------------------
// بيانات الطفل والمؤشرات الأساسية
// ----------------------------
let sections = document.querySelectorAll(".pageSection");
let steps = document.querySelectorAll(".step");
let currentSection = 0;
let recognition = null;
const childName = localStorage.getItem("childName") || "المستكشف";
const character = localStorage.getItem("character") || "girl";

if (document.getElementById("childName")) {
    document.getElementById("childName").textContent = childName;
}
const openCameraBtn = document.getElementById("openCamera");
const cameraContainer = document.getElementById("cameraContainer");
 cameraView = document.getElementById("cameraView");
// ----------------------------
// عناصر الصفحة الثابتة
// ----------------------------
const teacherImage = document.getElementById("teacherImage");
const teacherText = document.getElementById("teacherText");
const currentLetter = document.getElementById("currentLetter");
const letterVideo = document.getElementById("letterVideo");
const playLetter = document.getElementById("playLetter");

// ----------------------------
// ضبط صورة الشخصية التلقائية ومسارها الصحيح
// ----------------------------
if (teacherImage) {
    if (character === "boy") {
        teacherImage.src = "images/boy.jpg";
    } else {
        teacherImage.src = "images/girl.jpg";
    }
}

// ----------------------------
// كائن بيانات الحروف والمقاطع والكلمات
// ----------------------------
// الإمساك بعنصر الفيديو من صفحة الـ HTML
const letterData = {
    letter: "ب",
    forms: ["ب", "بـ", "ـبـ", "ـب"],
    girlVideo: "video/laila.mp4",
    boyVideo: "video/karam.mp4",
    sound: "audio/bbb.mp3",
    syllables: [
        { text: "با", sound: "audio/baa.mp3" },
        { text: "بو", sound: "audio/boo.mp3" },
        { text: "بي", sound: "audio/bee.mp3" }
    ],
    words: [
        { text: "باب", image: "images/bab.jpg", sound: "audio/Bab.mp3" },
        { text: "بطة", image: "images/bata.jpg", sound: "audio/Bataa.mp3" },
        { text: "بيت", image: "images/bayte.jpg", sound: "audio/Bayt.mp3" }
    ]
};

// تهيئة مسار الفيديو التعليمي بناءً على الشخصية المختارة عند البدء
if (letterVideo) {
    if (character === "boy") {
        letterVideo.src = letterData.boyVideo;
    } else {
        letterVideo.src = letterData.girlVideo;
    }
    letterVideo.load();
}

// ----------------------------
// دالة تحميل بيانات الحرف للشاشة الأولى
// ----------------------------
function loadLetter() {
    const lesson = letterData;

    if (currentLetter) {
        currentLetter.textContent = lesson.letter;
    }

    const forms = document.querySelectorAll(".letterForms div");
    lesson.forms.forEach((form, index) => {
        if (forms[index]) {
            forms[index].textContent = form;
        }
    });
}

// تشغيل نطق الحرف عند الضغط
if (playLetter) {
    playLetter.onclick = function () {
        const lesson = letterData;
        const audio = new Audio(lesson.sound);
        audio.play();
    };
}

// استدعاء تحميل البيانات الأولي لقسم الحرف
loadLetter();


function showCurrentSection() {
    
    sections.forEach((section, index) => {
        if (index === currentSection) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });

    
    steps.forEach((step, index) => {
        step.classList.remove("active");
    });
    
    // ربط المراحل الـ 7 بالمؤشرات الـ 5 العلوية للطفل
    if (currentSection <= 1 && steps[0]) steps[0].classList.add("active"); // مرحلة الحرف والشخصية
    else if (currentSection === 2 && steps[1]) steps[1].classList.add("active"); // مرحلة نطق الفيديو
    else if (currentSection === 3 && steps[1]) steps[1].classList.add("active"); // مرحلة تدريب الكاميرا والنطق
    else if (currentSection === 4 && steps[2]) steps[2].classList.add("active"); // مرحلة تعلم المقاطع
    else if (currentSection === 5 && steps[3]) steps[3].classList.add("active"); // مرحلة تعلم الكلمات
    else if (currentSection >= 6 && steps[4]) steps[4].classList.add("active"); // مرحلة اللعبة والاستراحة والنهاية

    // التحكم التلقائي بظهور زر السابق عند الشاشة الأولى أو شاشة النهاية الأخيرة
    const prevBtn = document.getElementById("previousButton");
    if (prevBtn) {
        if (currentSection === 0 || currentSection === sections.length - 1) {
            prevBtn.style.display = "none";
        } else {
            prevBtn.style.display = "inline-block";
        }
    }

    // إخفاء أزرار التنقل بالكامل عند الوصول لشاشة النهاية والتكريم لعدم إفساد الواجهة
    const navigationContainer = document.querySelector(".navigation");
    if (navigationContainer) {
        if (currentSection === sections.length - 1) {
            navigationContainer.style.display = "none";
        } else {
            navigationContainer.style.display = "flex";
        }
    }
}

// تفعيل نظام الصفحات فور تشغيل الكود للشاشة رقم 0
showCurrentSection();

// برمجة زر التالي للانتقال بين المراحل الـ 7
const nextButton = document.getElementById("nextButton");
if (nextButton) {
    nextButton.onclick = function () {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showCurrentSection();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            // تفعيل مؤقت الاستراحة الذكي إذا وصل الطفل لقسم الـ breakSection
            if (sections[currentSection] && sections[currentSection].id === "breakSection") {
                if (typeof startBreakTimer === "function") {
                    startBreakTimer();
                }
            }
        }
    };
}

// برمجة زر السابق للرجوع للمراحل السابقة
const previousButton = document.getElementById("previousButton");
if (previousButton) {
    previousButton.onclick = function () {
        if (currentSection > 0) {
            currentSection--;
            showCurrentSection();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };
}

// زر المتابعة الخاص بصفحة الاستراحة بعد انتهاء المؤقت
const continueButton = document.getElementById("continueButton");
if (continueButton) {
    continueButton.onclick = function () {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showCurrentSection();
        }
    };
}

// ===============================
// تشغيل أصوات المقاطع والكلمات (التفاعلية)
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    // أصوات المقاطع الصوتية (با، بو، بي)
    let syllableButtons = document.querySelectorAll(".playSyllable");
    syllableButtons.forEach(function (button) {
        button.onclick = function () {
            let text = button.getAttribute("data-text");
            let audioFile = "";

            if (text === "با") {
                audioFile = "audio/baa.mp3";
            } else if (text === "بو") {
                audioFile = "audio/boo.mp3";
            } else if (text === "بي") {
                audioFile = "audio/bee.mp3";
            }

            if (audioFile !== "") {
                let audio = new Audio(audioFile);
                audio.play();
            }
        };
    });

    // أصوات الكلمات المفتاحية بالصور (باب، بطة، بيت)
    let wordButtons = document.querySelectorAll(".playWord");
    wordButtons.forEach(function (button) {
        button.onclick = function () {
            let word = button.getAttribute("data-text");
            let audioFile = "";

            if (word === "باب") {
                audioFile = "audio/Bab.mp3";
            } else if (word === "بطة") {
                audioFile = "audio/Bataa.mp3";
            } else if (word === "بيت") {
                audioFile = "audio/Bayt.mp3";
            }

            if (audioFile !== "") {
                let audio = new Audio(audioFile);
                audio.play();
            }
        };
    });
});

// ===============================
// نظام الميكروفون والتحقق من النطق لقنوات التفاعل
// ===============================
const speakLetterBtn = document.getElementById("speakLetter");
if (speakLetterBtn) {
    speakLetterBtn.onclick = function () {
        if (typeof startRecognition === "function") {
            startRecognition("ب");
        }
    };
}

let syllableMicButtons = document.querySelectorAll(".saySyllable");
syllableMicButtons.forEach(function (button) {
    button.onclick = function () {
        let answer = button.getAttribute("data-text");
        if (typeof startRecognition === "function") {
            startRecognition(answer);
        }
    };
});

let wordMicButtons = document.querySelectorAll(".sayWord");
wordMicButtons.forEach(function (button) {
    button.onclick = function () {
        let answer = button.getAttribute("data-text");
        if (typeof startRecognition === "function") {
            startRecognition(answer);
        }
    };
});

// ميكروفون صفحة التدريب الإضافي
const useMicBtn = document.getElementById("useMic");
if (useMicBtn) {
    useMicBtn.onclick = function () {
        if (typeof startRecognition === "function") {
            startRecognition("ب");
        }
    };
}

// ===============================
// تشغيل الكاميرا المباشرة للطفل
// ===============================
 cameraButton = document.getElementById("openCamera");
 cameraView = document.getElementById("cameraView");

if (cameraButton && cameraView) {
    cameraButton.onclick = function () {
        navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then(function (stream) {
            cameraView.srcObject = stream;
        })
        .catch(function () {
            if (typeof speak === "function") {
                speak("لم يتم تشغيل الكاميرا");
            }
        });
    };
}

// ===============================
// إعادة تشغيل الفيديو التعليمي
// ===============================
let replay = document.getElementById("replayVideo");
if (replay && letterVideo) {
    replay.onclick = function () {
        letterVideo.currentTime = 0;
        letterVideo.play();
    };
}

// ===============================
// لعبة الذاكرة ومطابقة الكروت
// ===============================
let cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;

cards.forEach(function (card) {
    card.onclick = function () {
        if (card.classList.contains("open")) {
            return;
        }

        card.innerText = card.dataset.card;
        card.classList.add("open");

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;

            if (firstCard.dataset.card === secondCard.dataset.card) {
                if (typeof speak === "function") {
                    speak("أحسنت");
                }
                firstCard = null;
                secondCard = null;
            } else {
                if (typeof speak === "function") {
                    speak("حاول مرة أخرى");
                }
                setTimeout(function () {
                    firstCard.innerText = "❓";
                    secondCard.innerText = "❓";

                    firstCard.classList.remove("open");
                    secondCard.classList.remove("open");

                    firstCard = null;
                    secondCard = null;
                }, 1000);
            }
        }
    };
});

// إعادة تهيئة لعبة الذاكرة من جديد
let restart = document.getElementById("restartGame");
if (restart) {
    restart.onclick = function () {
        cards.forEach(function (card) {
            card.innerText = "❓";
            card.classList.remove("open");
        });
        firstCard = null;
        secondCard = null;
    };
}

// ===============================
// شاشة النهاية والتكريم والعودة للملف الرئيسي
// ===============================
let finishName = document.getElementById("finishName");
if (finishName && childName) {
    finishName.innerText = childName;
}

const goPlanetBtn = document.getElementById("goPlanet");
if (goPlanetBtn) {
    goPlanetBtn.onclick = function () {
        window.location.href = "planet.html";
    };
}

// تفعيل مؤقت الجلسة التلقائي الكلي عند بداية التشغيل
if (typeof startSessionTimer === "function") {
    startSessionTimer();
}
document.addEventListener("DOMContentLoaded", function () {
    let wordButtons = document.querySelectorAll(".playWord");
    let recognition;
    // 1. تهيئة نظام التعرف على الصوت
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ar-SA';
        recognition.interimResults = false;
    }

    // مصفوفة العبارات التشجيعية
    const praisePhrases = [
        "ممتــــاز! بطل Spillmind الصغير! 🌟",
        "أحسنت النطق، إجابة رائعة جداً! 🎉",
        "ذكاء خارق! نطقك صحيح مئة بالمئة! 👏",
        "يا لك من رائع! استمر في هذا الإبداع! ❤️"
    ];

    wordButtons.forEach(function (button) {
        button.onclick = function () {
            let word = button.getAttribute("data-text");
            let audioFile = "";

            // تحديد مسار الصوت بناءً على الكلمة
            if (word === "باب") {
                audioFile = "audio/Bab.mp3"; 
            } else if (word === "بطة") {
                audioFile = "audio/Bataa.mp3";
            } else if (word === "بيت") {
                audioFile = "audio/Bayt.mp3";
            }

            if (audioFile !== "") {
                let audio = new Audio(audioFile);
                
                // حفظ اللون الأصلي للزر لإعادته لاحقاً
                let originalBg = button.style.backgroundColor || "#4A6FA5";
                
                // تشغيل الصوت الأصلي أولاً
                audio.play().then(() => {
                    // بعد انتهاء نطق الكلمة من التطبيق، نبدأ بالاستماع للطفل
                    audio.onended = function() {
                        if (!recognition) return;

                        // تغيير شكل الزر للإشارة إلى الاستماع
                        button.style.backgroundColor = "#e53e3e"; 
                        button.innerText = "🎙️ اسمعك..";

                        recognition.start();

                        recognition.onresult = function(event) {
                            // إعادة الزر لشكله الطبيعي
                            button.style.backgroundColor = originalBg;
                            button.innerText = "🔊"; 

                            let spokenText = event.results[0][0].transcript.trim();
                            
                            // تنظيف الكلمات للمقارنة
                            let cleanSpoken = cleanArabicText(spokenText);
                            let cleanTarget = cleanArabicText(word);

                            // أين تريد عرض النتيجة؟ (تأكد من وجود عنصر يحمل id="speechResult" في الـ HTML)
                            let speechResult = document.getElementById('speechResult');
                            if (speechResult) {
                                if (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget)) {
                                    let randomPraise = praisePhrases[Math.floor(Math.random() * praisePhrases.length)];
                                    speechResult.innerHTML = `<span style="color: #38a169; font-weight:bold;">✅ صح (${spokenText}):</span> ${randomPraise}`;
                                } else {
                                    speechResult.innerHTML = `<span style="color: #e53e3e; font-weight:bold;">❌ سمعتك تقول (${spokenText}):</span> حاول مجدداً يا بطل! 💪`;
                                }
                            }
                        };

                        recognition.onerror = function() {
                            button.style.backgroundColor = originalBg;
                            button.innerText = "🔊";
                        };
                    };
                }).catch(function(error) {
                    console.log("خطأ في تشغيل الصوت: ", error);
                });
            }
        };
    });
});

// دالة تنظيف النص العربي من الحركات والتشكيل لقارنة دقيقة
function cleanArabicText(text) {
    return text
        .replace(/[\u064B-\u0652]/g, "") 
        .replace(/أ|إ|آ/g, "ا")       
        .replace(/ة/g, "ه");           
}
// ==========================================
// تشغيل صوت الحرف ب
// ==========================================
const playLetterBtn = document.getElementById("playLetter");
if (playLetterBtn) {
    playLetterBtn.onclick = function () {
        let audio = new Audio("audio/bbb.mp3");
        audio.play().catch(function(error) {
            console.log("خطأ في تشغيل صوت الحرف: ", error);
        });
    }
}

// ==========================================
// تشغيل أصوات المقاطع (با، بو، بي)
// ==========================================
/*let syllableButtons = document.querySelectorAll(".playSyllable");
syllableButtons.forEach(function (button) {
    button.onclick = function () {
        // قراءة النص المكتوب داخل الـ h3 الذي يسبق الزر مباشرة
        let card = button.parentElement;
        let heading = card.querySelector("h3");
        let text = heading ? heading.innerText.trim() : "";

        let audioFile = "";

        // فحص النص وتشغيل الملف المطابق
        if (text.includes("با") || text.includes("بَ")) {
            audioFile = "audio/baa.mp3";
        } else if (text.includes("بو") || text.includes("بُ")) {
            audioFile = "audio/boo.mp3";
        } else if (text.includes("بي") || text.includes("بِ")) {
            audioFile = "audio/bee.mp3";
        }

        if (audioFile !== "") {
            let audio = new Audio(audioFile);
            audio.play().catch(function(error) {
                console.log("خطأ في تشغيل صوت المقطع: ", error);
            });
        }
    };
});*/
// 1. مصفوفة الجمل التشجيعية العشوائية للأطفال
const praisePhrases = [
    "ممتــــاز! بطل Spillmind الصغير! 🌟",
    "أحسنت النطق، إجابة رائعة جداً! 🎉",
    "ذكاء خارق! نطقك صحيح مئة بالمئة! 👏",
    "يا لك من رائع! استمر في هذا الإبداع! ❤️",
    "صوتك جميل ونطقك ممتاز جداً! 🚀"
];

// 2. تهيئة ميزة التعرف على الصوت (Speech Recognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("نظام التعرف على الصوت غير مدعوم في هذا المتصفح. يرجى استخدام Google Chrome أو Edge.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA'; // ضبط اللغة للعربية (السعودية كمثال قياسي)
    recognition.interimResults = false; // الانتظار حتى ينتهي الطفل من الكلام بالكامل
    recognition.maxAlternatives = 1;

    const startMicBtn = document.getElementById('startMicBtn');
    const speechResult = document.getElementById('speechResult');
    const currentTargetText = document.getElementById('currentTargetText'); // النص الذي يجب على الطفل قراءته حالياً

    // 3. عند الضغط على زر الميكروفون
    startMicBtn.addEventListener('click', () => {
        speechResult.textContent = "🎙️ أنا أستمع إليك الآن يا بطل... تكلم";
        speechResult.style.color = "#3182ce";
        startMicBtn.style.backgroundColor = "#e53e3e"; // تغيير لون الزر للأحمر أثناء الاستماع
        
        recognition.start();
    });

    // 4. معالجة النتيجة بعد انتهاء الطفل من النطق
    recognition.onresult = function(event) {
        startMicBtn.style.backgroundColor = "#4A6FA5"; // إعادة لون الزر الطبيعي
        
        // الكلمة التي سمعها الجهاز
        let spokenText = event.results[0][0].transcript.trim();
        // الكلمة المطلوبة من الطفل (مثلاً: "ب"، "با"، "باب")
        let targetText = currentTargetText.textContent.trim();

        // تنظيف النصوص من الحركات لتسهيل المقارنة الصحيحة
        let cleanSpoken = cleanArabicText(spokenText);
        let cleanTarget = cleanArabicText(targetText);

        if (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget)) {
            // اختيار جملة تشجيعية عشوائية
            let randomPraise = praisePhrases[Math.floor(Math.random() * praisePhrases.length)];
            speechResult.innerHTML = `<span style="color: #38a169;">✅ سمعتُك تقول (${spokenText})</span><br>${randomPraise}`;
            
            // (اختياري) يمكنك تشغيل صوت تصفيق هنا إذا كان لديك ملف صوتي
        } else {
            speechResult.innerHTML = `<span style="color: #e53e3e;">❌ سمعتُك تقول (${spokenText})</span><br>حاول مرة أخرى يا بطل، أنت تستطيع فعلها! 💪`;
        }
    };

    // في حال حدث خطأ أو لم يسمع المتصفح صوتاً
    recognition.onerror = function(event) {
        startMicBtn.style.backgroundColor = "#4A6FA5";
        speechResult.textContent = "⚠️ لم أسمعك جيداً، اضغط على الميكروفون وحاول مجدداً.";
        speechResult.style.color = "#dd6b20";
    };
}

// دالة لتنظيف النص العربي من التشكيل لتجنب أخطاء المقارنة
function cleanArabicText(text) {
    return text
        .replace(/[\u064B-\u0652]/g, "") // إزالة التشكيل (الفتحة، الضمة، الكسرة، إلخ)
        .replace(/أ|إ|آ/g, "ا")       // توحيد الألفات
        .replace(/ة/g, "ه");           // توحيد التاء المربوطة والهاء في أواخر الكلمات (اختياري)
}
document.addEventListener("DOMContentLoaded", function () {
    // 1. الإمساك بعناصر الـ HTML الخاصة بك بدقة
    // playLetterBtn = document.getElementById("playLetter");
   //  speakLetterBtn = document.getElementById("speakLetter");
    //const practiceMessage = document.getElementById("practiceMessage");

    // 2. تهيئة نظام التعرف على الصوت (Speech Recognition)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'ar-SA'; // لغة الاستماع: العربية
        recognition.interimResults = false; // الانتظار حتى ينتهي الطفل من النطق تماماً
    }

    // 3. مصفوفة الجمل التشجيعية العشوائية
    const praisePhrases = [
        "ممتــــاز! بطل Spillmind الصغير! 🌟",
        "أحسنت النطق، إجابة رائعة جداً! 🎉",
        "ذكاء خارق! نطقك صحيح مئة بالمئة! 👏",
        "يا لك من رائع! استمر في هذا الإبداع! ❤️",
        "صوتك جميل ونطقك ممتاز جداً! 🚀"
    ];

    // 4. تشغيل صوت الحرف عند الضغط على زر الاستماع
    if (playLetterBtn) {
        playLetterBtn.onclick = function () {
            let audio = new Audio("audio/bbb.mp3"); 
            audio.play().catch(function(error) {
                console.log("خطأ في تشغيل الصوت: ", error);
            });
        };
    }

    // 5. ميزة الاستماع عند الضغط على زر "انطق الحرف" ليتحول للأحمر ويستمع
    if (speakLetterBtn && recognition) {
        speakLetterBtn.onclick = function () {
            // أ) حفظ الشكل واللون الأصلي للزر لإعادته لاحقاً
            let originalText = speakLetterBtn.innerHTML;
            let originalBg = speakLetterBtn.style.backgroundColor || "";

            // ب) تغيير الزر نفسه ليصبح أحمر ويكتب "اسمعك..."
            speakLetterBtn.style.backgroundColor = "#c5423a"; // اللون الأحمر التفاعلي
            speakLetterBtn.style.color = "white";
            speakLetterBtn.innerHTML = "🎙️ اسمعك...";
            
            // جـ) تحديث نص المساعدة أسفل الزر
            if (practiceMessage) {
                practiceMessage.textContent = "تكلم الآن يا بطل، أنا أنصت إليك... 👂";
                practiceMessage.style.color = "#3182ce";
            }

            // د) بدء تشغيل الميكروفون
            recognition.start();

            // هـ) معالجة النتيجة عندما ينتهي الطفل من الكلام
            recognition.onresult = function (event) {
                // إرجاع الزر لحالته ولونه الطبيعي فوراً
                speakLetterBtn.style.backgroundColor = originalBg;
                speakLetterBtn.innerHTML = originalText;

                // الكلمة التي التقطها الميكروفون
                let spokenText = event.results[0][0].transcript.trim();
                
                // تنظيف النص العربي من الحركات والتشكيل لتجنب أخطاء المقارنة
                let cleanSpoken = cleanArabicText(spokenText);
                let targetLetter = "ب";

                if (practiceMessage) {
                    // إذا نطق الطفل الحرف صح أو قال كلمة "باء"
                    if (cleanSpoken === targetLetter || cleanSpoken.includes("باء") || cleanSpoken.includes(targetLetter)) {
                        let randomPraise = praisePhrases[Math.floor(Math.random() * praisePhrases.length)];
                        practiceMessage.innerHTML = `<span style="color: #38a169;">✅ سمعتك تقول (${spokenText}):</span><br>${randomPraise}`;
                    } else {
                        // إذا نطق شيء آخر خاطئ
                        practiceMessage.innerHTML = `<span style="color: #e53e3e;">❌ سمعتك تقول (${spokenText}):</span><br>حاول مرة أخرى يا بطل، اضغط على الميكروفون وقل "ب" 💪`;
                    }
                }
            };

            // و) في حال حدوث خطأ أو لم يصدر الطفل أي صوت في الوقت المحدد
            recognition.onerror = function () {
                // إرجاع الزر لطبيعته حتى لا يعلق على اللون الأحمر
                speakLetterBtn.style.backgroundColor = originalBg;
                speakLetterBtn.innerHTML = originalText;
                
                if (practiceMessage) {
                    practiceMessage.textContent = "⚠️ لم أسمعك جيداً، اضغط على زر انطق وحاول مجدداً.";
                    practiceMessage.style.color = "#dd6b20";
                }
            };
        };
    }
});

// دالة تنظيف النص العربي من الحركات والتشكيل (الفتحة، الضمة، الكسرة...) لمقارنة برمجية دقيقة
function cleanArabicText(text) {
    return text
        .replace(/[\u064B-\u0652]/g, "") // حذف التشكيل
        .replace(/أ|إ|آ/g, "ا")       // توحيد الألف
        .replace(/ة/g, "ه");           // توحيد الهاء والتاء المربوطة
}


if (openCameraBtn) {
    openCameraBtn.onclick = function () {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // إظهار حاوية الكاميرا
                cameraContainer.style.display = "block";
                // ربط البث
                cameraView.srcObject = stream;
                cameraView.play();
                // إخفاء الزر بعد الموافقة والتشغيل
                openCameraBtn.style.display = "none";
            })
            .catch(function (err) {
                alert("يا بطل، المتصفح يحتاج إذنك لفتح الكاميرا لتتمكن من رؤية نفسك!");
            });
    };
}
function playAudio() {
    let audio = new Audio("audio/baa.mp3");

    audio.play()
    .then(() => {
        console.log("اشتغل الصوت بنجاح");
    })
    .catch(error => {
        console.log("خطأ في الصوت:", error);
    });
}
/*let recognition = window.recognition;
const sayButtons = document.querySelectorAll(".saySyllable");

sayButtons.forEach(function(button) {
    button.onclick = function() {
        let target = button.getAttribute("data-text");

        if (recognition) {
            speechResult.textContent = "🎙️ أنا أستمع إليك... قل " + target;
            recognition.start();
        } else {
            alert("التعرف على الصوت غير متوفر");
        }
    };
});*/
const sayButtons = document.querySelectorAll(".saySyllable");
sayButtons.forEach(function(button) {
    button.onclick = function() {
        let target = button.getAttribute("data-text");

        console.log("تم الضغط على انطق", target);

        if (recognition) {
            console.log("بدأ الاستماع");
            speechResult.textContent = "🎙️ أنا أستمع إليك... قل " + target;
            recognition.start();
        } else {
            console.log("recognition غير موجود");
            alert("التعرف على الصوت غير متوفر");
        }
    };
});