// Quantum Trade Platform - Complete Translations
class QuantumTrade {
    constructor() {
        this.init();
    }

    init() {
        this.setupParticles();
        this.setupAuthTabs();
        this.setupLanguage();
        this.setupAnimations();
    }

    setupParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--quantum-cyan);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${10 + Math.random() * 20}s linear infinite;
            `;
            container.appendChild(particle);
        }

        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupAuthTabs() {
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');

                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                forms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${tabName}Form`) {
                        form.classList.add('active');
                    }
                });
            });
        });

        const urlParams = new URLSearchParams(window.location.search);
        const authType = urlParams.get('type');
        if (authType === 'register') {
            const registerTab = document.querySelector('[data-tab="register"]');
            if (registerTab) registerTab.click();
        }
    }

    setupLanguage() {
        const savedLang = localStorage.getItem('quantum_lang') || 'ru';
        this.applyLanguage(savedLang);
    }

    applyLanguage(lang) {
        localStorage.setItem('quantum_lang', lang);
        document.documentElement.lang = lang;
        
        // Функция перевода
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .instrument-card, .value-card, .instruction-step').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    startTrading() {
        if (!this.checkAuth()) {
            window.location.href = 'auth.html?type=login';
            return;
        }
        alert('🚀 Запуск торгового терминала...');
    }

    openDemo() {
        alert('🎮 Демо-счет активирован!');
    }

    checkAuth() {
        return localStorage.getItem('quantum_user') !== null;
    }

    simulateMarketData() {
        const prices = document.querySelectorAll('.instrument-price');
        prices.forEach(priceEl => {
            setInterval(() => {
                const change = (Math.random() - 0.5) * 4;
                const newValue = Math.max(0.1, parseFloat(priceEl.textContent) + change);
                priceEl.textContent = `${change >= 0 ? '+' : ''}${newValue.toFixed(1)}%`;
                priceEl.style.color = change >= 0 ? 'var(--profit-green)' : 'var(--warning-red)';
            }, 3000);
        });
    }
}

// ПОЛНЫЕ ПЕРЕВОДЫ ДЛЯ ВСЕГО САЙТА
const translations = {
    ru: {
        // Страница выбора языка
        "platform_name": "ПЕРЕДОВАЯ ТОРГОВАЯ ПЛАТФОРМА",
        "russian": "РУССКИЙ",
        "ukrainian": "УКРАЇНСЬКА", 
        "english": "ENGLISH",
        
        // Навигация
        "home": "ГЛАВНАЯ",
        "about": "О КОМПАНИИ",
        "instructions": "ИНСТРУКЦИЯ",
        
        // Главная страница
        "professional_edition": "PROFESSIONAL EDITION",
        "art_of_trading": "ИСКУССТВО",
        "trading_future": "ТОРГОВЛИ",
        "future": "БУДУЩЕГО",
        "hero_subtitle": "Используйте мощь искусственного интеллекта и передовые алгоритмы для достижения беспрецедентных результатов на финансовых рынках",
        "trading_bot": "Торговый Бот",
        "telegram_channel": "TELEGRAM КАНАЛ",
        "trading_volume": "ОБЪЕМ ТОРГОВ",
        "traders": "ТРЕЙДЕРОВ", 
        "execution": "ИСПОЛНЕНИЕ",
        
        // Технологии
        "future_tech": "ТЕХНОЛОГИИ БУДУЩЕГО",
        "tech_subtitle": "Инновационные решения для профессиональных трейдеров",
        "ai_analytics": "AI АНАЛИТИКА",
        "ai_desc": "Нейросети анализируют рынок 24/7 и предоставляют точные прогнозы",
        "fast_execution": "СВЕРХБЫСТРОЕ ИСПОЛНЕНИЕ", 
        "fast_desc": "Скорость исполнения ордеров менее 1 миллисекунды",
        "max_security": "МАКСИМАЛЬНАЯ БЕЗОПАСНОСТЬ",
        "security_desc": "Военное шифрование и холодное хранение активов",
        "prediction": "ПРОГНОЗИРОВАНИЕ",
        "prediction_desc": "Машинное обучение предсказывает движение цен с точностью 87%",
        
        // Инструменты
        "trading_instruments": "ТОРГОВЫЕ ИНСТРУМЕНТЫ", 
        "instruments_subtitle": "Доступ к мировым финансовым рынкам",
        "cryptocurrencies": "КРИПТОВАЛЮТЫ",
        "crypto_desc": "200+ торговых пар с минимальными спредами",
        "forex": "ФОРЕКС",
        "forex_desc": "60+ валютных пар с кредитным плечом до 1:500", 
        "stocks": "АКЦИИ",
        "stocks_desc": "Торгуйте акциями компаний из S&P500 и NASDAQ",
        
        // Поддержка
        "support_247": "ПОДДЕРЖКА 24/7",
        "need_help": "НУЖНА ПОМОЩЬ?",
        "support_text": "Наша команда поддержки всегда на связи. Получите быстрый ответ на любой вопрос в Telegram",
        "support_manager": "Менеджер поддержки",
        "write_telegram": "НАПИСАТЬ В ТЕЛЕГРАМ",
        
        // О компании
        "about_company": "О КОМПАНИИ QUANTUM TRADE",
        "about_subtitle": "Лидер в области алгоритмического трейдинга и финансовых технологий",
        "our_mission": "НАША МИССИЯ", 
        "mission_text": "Мы создаем будущее финансовых рынков, объединяя передовые технологии искусственного интеллекта с глубоким пониманием рыночной динамики.",
        "founded": "ГОД ОСНОВАНИЯ",
        "countries": "СТРАН",
        "years_market": "ЛЕТ НА РЫНКЕ", 
        "community": "Участников Сообщества",
        "total_earnings": "СУМАРНИЙ ЗАРАБОТОК",
        "trained_beginners": "НАУЧЕННЫХ НОВИЧКОВ",
        "practicing_traders": "Трейдеров-Практиков",
        
        // Ценности
        "our_values": "НАШИ ЦЕННОСТИ",
        "innovation": "ИННОВАЦИИ", 
        "innovation_desc": "Постоянное развитие и внедрение передовых технологий",
        "reliability": "НАДЕЖНОСТЬ",
        "reliability_desc": "Гарантия безопасности средств и стабильности платформы", 
        "result": "РЕЗУЛЬТАТ",
        "result_desc": "Ориентация на достижение максимальной эффективности",
        
        // Инструкция
        "trader_guide": "РУКОВОДСТВО ТРЕЙДЕРА",
        "guide_subtitle": "Полное руководство по использованию платформы Quantum Trade",
        "registration": "РЕГИСТРАЦИЯ И ВЕРИФИКАЦИЯ",
        "registration_desc": "Создайте аккаунт, подтвердите email и пройдите KYC верификацию для доступа ко всем функциям платформы",
        "fast_registration": "✅ Быстрая регистрация за 2 минуты",
        "instant_verification": "✅ Мгновенная верификация документов", 
        "demo_access": "✅ Доступ к демо-счету сразу после регистрации",
        "terminal_mastery": "ОСВОЕНИЕ ТЕРМИНАЛА",
        "terminal_desc": "Изучите интерфейс торгового терминала и основные инструменты для анализа рынка",
        "workspace_setup": "📊 Настройка рабочих пространств",
        "indicators": "🔧 Добавление технических индикаторов", 
        "hotkeys": "⚡ Быстрые клавиши для торговли",
        "trading_strategy": "ТОРГОВАЯ СТРАТЕГИЯ",
        "strategy_desc": "Разработайте и протестируйте свою торговую стратегию на демо-счете",
        "ai_assistant": "🧠 Использование AI-ассистента",
        "data_analysis": "📈 Анализ исторических данных",
        "strategy_optimization": "🎯 Оптимизация параметров стратегии",
        "real_trading": "РЕАЛЬНАЯ ТОРГОВЛЯ", 
        "real_trading_desc": "Начните торговать с реальными средствами, используя все преимущества платформы",
        "deposit": "💳 Пополнение счета",
        "risk_management": "🛡️ Управление рисками",
        "mobile_trading": "📱 Мобильная торговля"
    },

    en: {
        // Language selection page
        "platform_name": "ADVANCED TRADING PLATFORM",
        "russian": "RUSSIAN", 
        "ukrainian": "UKRAINIAN",
        "english": "ENGLISH",
        
        // Navigation
        "home": "HOME",
        "about": "ABOUT",
        "instructions": "INSTRUCTIONS",
        
        // Main page
        "professional_edition": "PROFESSIONAL EDITION",
        "art_of_trading": "ART",
        "trading_future": "OF TRADING", 
        "future": "FUTURE",
        "hero_subtitle": "Use the power of artificial intelligence and advanced algorithms to achieve unprecedented results in financial markets",
        "trading_bot": "Trading Bot",
        "telegram_channel": "TELEGRAM CHANNEL",
        "trading_volume": "TRADING VOLUME",
        "traders": "TRADERS",
        "execution": "EXECUTION",
        
        // Technologies
        "future_tech": "FUTURE TECHNOLOGIES",
        "tech_subtitle": "Innovative solutions for professional traders",
        "ai_analytics": "AI ANALYTICS",
        "ai_desc": "Neural networks analyze the market 24/7 and provide accurate forecasts",
        "fast_execution": "ULTRA-FAST EXECUTION",
        "fast_desc": "Order execution speed less than 1 millisecond", 
        "max_security": "MAXIMUM SECURITY",
        "security_desc": "Military-grade encryption and cold storage of assets",
        "prediction": "PREDICTION",
        "prediction_desc": "Machine learning predicts price movements with 87% accuracy",
        
        // Instruments
        "trading_instruments": "TRADING INSTRUMENTS",
        "instruments_subtitle": "Access to global financial markets", 
        "cryptocurrencies": "CRYPTOCURRENCIES",
        "crypto_desc": "200+ trading pairs with minimal spreads",
        "forex": "FOREX",
        "forex_desc": "60+ currency pairs with leverage up to 1:500",
        "stocks": "STOCKS",
        "stocks_desc": "Trade stocks from S&P500 and NASDAQ companies",
        
        // Support
        "support_247": "SUPPORT 24/7",
        "need_help": "NEED HELP?",
        "support_text": "Our support team is always available. Get a quick answer to any question in Telegram",
        "support_manager": "Support Manager", 
        "write_telegram": "WRITE IN TELEGRAM",
        
        // About company
        "about_company": "ABOUT QUANTUM TRADE",
        "about_subtitle": "Leader in algorithmic trading and financial technologies",
        "our_mission": "OUR MISSION",
        "mission_text": "We create the future of financial markets by combining advanced artificial intelligence technologies with deep understanding of market dynamics.",
        "founded": "YEAR FOUNDED",
        "countries": "COUNTRIES", 
        "years_market": "YEARS ON MARKET",
        "community": "Community Members",
        "total_earnings": "TOTAL EARNINGS",
        "trained_beginners": "TRAINED BEGINNERS",
        "practicing_traders": "Practicing Traders",
        
        // Values
        "our_values": "OUR VALUES",
        "innovation": "INNOVATION",
        "innovation_desc": "Continuous development and implementation of advanced technologies", 
        "reliability": "RELIABILITY",
        "reliability_desc": "Guarantee of fund security and platform stability",
        "result": "RESULT",
        "result_desc": "Focus on achieving maximum efficiency",
        
        // Instructions
        "trader_guide": "TRADER'S GUIDE",
        "guide_subtitle": "Complete guide to using Quantum Trade platform",
        "registration": "REGISTRATION AND VERIFICATION",
        "registration_desc": "Create an account, confirm email and complete KYC verification to access all platform features",
        "fast_registration": "✅ Fast registration in 2 minutes",
        "instant_verification": "✅ Instant document verification",
        "demo_access": "✅ Demo account access immediately after registration",
        "terminal_mastery": "TERMINAL MASTERY", 
        "terminal_desc": "Learn the trading terminal interface and basic market analysis tools",
        "workspace_setup": "📊 Workspace setup",
        "indicators": "🔧 Adding technical indicators",
        "hotkeys": "⚡ Quick trading hotkeys",
        "trading_strategy": "TRADING STRATEGY",
        "strategy_desc": "Develop and test your trading strategy on a demo account",
        "ai_assistant": "🧠 Using AI assistant",
        "data_analysis": "📈 Historical data analysis", 
        "strategy_optimization": "🎯 Strategy parameter optimization",
        "real_trading": "REAL TRADING",
        "real_trading_desc": "Start trading with real funds using all platform advantages",
        "deposit": "💳 Account deposit",
        "risk_management": "🛡️ Risk management",
        "mobile_trading": "📱 Mobile trading"
    },

    uk: {
        // Сторінка вибору мови
        "platform_name": "ПЕРЕДОВА ТОРГІВЕЛЬНА ПЛАТФОРМА",
        "russian": "РОСІЙСЬКА",
        "ukrainian": "УКРАЇНСЬКА",
        "english": "ENGLISH",
        
        // Навігація
        "home": "ГОЛОВНА",
        "about": "ПРО КОМПАНІЮ", 
        "instructions": "ІНСТРУКЦІЯ",
        
        // Головна сторінка
        "professional_edition": "PROFESSIONAL EDITION",
        "art_of_trading": "МИСТЕЦТВО",
        "trading_future": "ТОРГІВЛІ",
        "future": "МАЙБУТНЬОГО",
        "hero_subtitle": "Використовуйте потужність штучного інтелекту та передові алгоритми для досягнення безпрецедентних результатів на фінансових ринках",
        "trading_bot": "Торговий Бот",
        "telegram_channel": "TELEGRAM КАНАЛ",
        "trading_volume": "ОБ'ЄМ ТОРГІВЛІ",
        "traders": "ТРЕЙДЕРІВ",
        "execution": "ВИКОНАННЯ",
        
        // Технології
        "future_tech": "ТЕХНОЛОГІЇ МАЙБУТНЬОГО",
        "tech_subtitle": "Інноваційні рішення для професійних трейдерів",
        "ai_analytics": "AI АНАЛІТИКА",
        "ai_desc": "Нейромережі аналізують ринок 24/7 та надають точні прогнози",
        "fast_execution": "НАДШВИДКЕ ВИКОНАННЯ",
        "fast_desc": "Швидкість виконання ордерів менше 1 мілісекунди",
        "max_security": "МАКСИМАЛЬНА БЕЗПЕКА",
        "security_desc": "Військове шифрування та холодне зберігання активів",
        "prediction": "ПРОГНОЗУВАННЯ",
        "prediction_desc": "Машинне навчання передбачає рух цін з точністю 87%",
        
        // Інструменти
        "trading_instruments": "ТОРГІВЕЛЬНІ ІНСТРУМЕНТИ",
        "instruments_subtitle": "Доступ до світових фінансових ринків",
        "cryptocurrencies": "КРИПТОВАЛЮТИ",
        "crypto_desc": "200+ торгових пар з мінімальними спредами",
        "forex": "ФОРЕКС",
        "forex_desc": "60+ валютних пар з кредитним плечем до 1:500",
        "stocks": "АКЦІЇ",
        "stocks_desc": "Торгуйте акціями компаній з S&P500 та NASDAQ",
        
        // Підтримка
        "support_247": "ПІДТРИМКА 24/7",
        "need_help": "ПОТРІБНА ДОПОМОГА?",
        "support_text": "Наша команда підтримки завжди на зв'язку. Отримайте швидку відповідь на будь-яке питання в Telegram",
        "support_manager": "Менеджер підтримки",
        "write_telegram": "НАПИСАТИ В TELEGRAM",
        
        // Про компанію
        "about_company": "ПРО КОМПАНІЮ QUANTUM TRADE",
        "about_subtitle": "Лідер у галузі алгоритмічної торгівлі та фінансових технологій",
        "our_mission": "НАША МІСІЯ",
        "mission_text": "Ми створюємо майбутнє фінансових ринків, поєднуючи передові технології штучного інтелекту з глибоким розумінням ринкової динаміки.",
        "founded": "РІК ЗАСНУВАННЯ",
        "countries": "КРАЇН",
        "years_market": "РОКІВ НА РИНКУ",
        "community": "Учасників Спільноти",
        "total_earnings": "СУМАРНИЙ ЗАРОБІТОК",
        "trained_beginners": "НАВЧЕНИХ НОВАЧКІВ",
        "practicing_traders": "Трейдерів-Практиків",
        
        // Цінності
        "our_values": "НАШІ ЦІННОСТІ",
        "innovation": "ІННОВАЦІЇ",
        "innovation_desc": "Постійний розвиток та впровадження передових технологій",
        "reliability": "НАДІЙНІСТЬ",
        "reliability_desc": "Гарантія безпеки коштів та стабільності платформи",
        "result": "РЕЗУЛЬТАТ",
        "result_desc": "Орієнтація на досягнення максимальної ефективності",
        
        // Інструкція
        "trader_guide": "КЕРІВНИЦТВО ТРЕЙДЕРА",
        "guide_subtitle": "Повний посібник з використання платформи Quantum Trade",
        "registration": "РЕЄСТРАЦІЯ ТА ВЕРИФІКАЦІЯ",
        "registration_desc": "Створіть акаунт, підтвердьте email та пройдіть KYC верифікацію для доступу до всіх функцій платформи",
        "fast_registration": "✅ Швидка реєстрація за 2 хвилини",
        "instant_verification": "✅ Миттєва верифікація документів",
        "demo_access": "✅ Доступ до демо-рахунку відразу після реєстрації",
        "terminal_mastery": "ОПАНУВАННЯ ТЕРМІНАЛУ",
        "terminal_desc": "Вивчіть інтерфейс торгового термінала та основні інструменти для аналізу ринку",
        "workspace_setup": "📊 Налаштування робочих просторів",
        "indicators": "🔧 Додавання технічних індикаторів",
        "hotkeys": "⚡ Швидкі клавіші для торгівлі",
        "trading_strategy": "ТОРГІВЕЛЬНА СТРАТЕГІЯ",
        "strategy_desc": "Розробіть і протестуйте свою торгову стратегію на демо-рахунку",
        "ai_assistant": "🧠 Використання AI-асистента",
        "data_analysis": "📈 Аналіз історичних даних",
        "strategy_optimization": "🎯 Оптимізація параметрів стратегії",
        "real_trading": "РЕАЛЬНА ТОРГІВЛЯ",
        "real_trading_desc": "Почніть торгувати з реальними коштами, використовуючи всі переваги платформи",
        "deposit": "💳 Поповнення рахунку",
        "risk_management": "🛡️ Управління ризиками",
        "mobile_trading": "📱 Мобільна торгівля",

        // В объект translations добавьте эти ключи:

    ru: {
    // ... существующие переводы ...
    
    // Новая навигация
    "traders": "ТРЕЙДЕРЫ",
    
    // Страница трейдеров
    "our_traders": "НАШИ ТРЕЙДЕРЫ",
    "traders_subtitle": "Профессиональная команда трейдеров с многолетним опытом работы на финансовых рынках",
    "professional_traders": "Профессиональных трейдеров",
    "years_experience": "Лет средний опыт",
    "total_volume": "Общий объем торгов",
    "profit": "Прибыль",
    "success_rate": "Успешных сделок",
    "experience_years": "Лет опыта",
    "specialization": "Специализация:",
    "performance": "Эффективность",
    
    // Специализации
    "crypto_trading": "Криптотрейдинг",
    "swing_trading": "Свинг-трейдинг",
    "forex_trading": "Форекс",
    "algorithmic": "Алгоритмическая торговля",
    "scalping": "Скальпинг",
    "day_trading": "Дейтрейдинг",
    "ai_analysis": "AI-анализ",
    "stocks": "Акции",
    
    // Имена трейдеров
    "trader1_name": "Александр Волков",
    "trader1_title": "Старший трейдер",
    "trader1_desc": "Специализируется на среднесрочных стратегиях с использованием AI-анализа. Разработал собственную систему риск-менеджмента.",
    
    "trader2_name": "Максим Иванов",
    "trader2_title": "Алгоритмический трейдер",
    "trader2_desc": "Эксперт в создании торговых алгоритмов. Разрабатывает автоматизированные системы для высокочастотной торговли.",
    
    "trader3_name": "Дмитрий Петров",
    "trader3_title": "Скальпер",
    "trader3_desc": "Мастер краткосрочных стратегий. Специализируется на скальпинге с использованием продвинутых технических индикаторов.",
    
    "trader4_name": "Екатерина Смирнова",
    "trader4_title": "AI-аналитик",
    "trader4_desc": "Специалист по машинному обучению и AI-анализу рынков. Разрабатывает нейросети для прогнозирования ценовых движений.",
    
    // Присоединиться
    "join_team": "СТАНЬТЕ ЧАСТЬЮ НАШЕЙ КОМАНДЫ",
    "join_text": "Присоединяйтесь к профессиональным трейдерам Quantum Trade. Мы предоставляем передовые инструменты, аналитику и поддержку 24/7.",
    "contact_manager": "Связаться с менеджером"
},

en: {
    // ... existing translations ...
    
    // New navigation
    "traders": "TRADERS",
    
    // Traders page
    "our_traders": "OUR TRADERS",
    "traders_subtitle": "Professional team of traders with years of experience in financial markets",
    "professional_traders": "Professional traders",
    "years_experience": "Years average experience",
    "total_volume": "Total trading volume",
    "profit": "Profit",
    "success_rate": "Success rate",
    "experience_years": "Years experience",
    "specialization": "Specialization:",
    "performance": "Performance",
    
    // Specializations
    "crypto_trading": "Crypto Trading",
    "swing_trading": "Swing Trading",
    "forex_trading": "Forex",
    "algorithmic": "Algorithmic Trading",
    "scalping": "Scalping",
    "day_trading": "Day Trading",
    "ai_analysis": "AI Analysis",
    "stocks": "Stocks",
    
    // Trader names
    "trader1_name": "Alexander Volkov",
    "trader1_title": "Senior Trader",
    "trader1_desc": "Specializes in medium-term strategies using AI analysis. Developed his own risk management system.",
    
    "trader2_name": "Maxim Ivanov",
    "trader2_title": "Algorithmic Trader",
    "trader2_desc": "Expert in creating trading algorithms. Develops automated systems for high-frequency trading.",
    
    "trader3_name": "Dmitry Petrov",
    "trader3_title": "Scalper",
    "trader3_desc": "Master of short-term strategies. Specializes in scalping using advanced technical indicators.",
    
    "trader4_name": "Ekaterina Smirnova",
    "trader4_title": "AI Analyst",
    "trader4_desc": "Specialist in machine learning and AI market analysis. Develops neural networks for price movement forecasting.",
    
    // Join team
    "join_team": "JOIN OUR TEAM",
    "join_text": "Join Quantum Trade professional traders. We provide advanced tools, analytics and 24/7 support.",
    "contact_manager": "Contact manager"
},

uk: {
    // ... існуючі переклади ...
    
    // Нова навігація
    "traders": "ТРЕЙДЕРИ",
    
    // Сторінка трейдерів
    "our_traders": "НАШІ ТРЕЙДЕРИ",
    "traders_subtitle": "Професійна команда трейдерів з багаторічним досвідом роботи на фінансових ринках",
    "professional_traders": "Професійних трейдерів",
    "years_experience": "Років середній досвід",
    "total_volume": "Загальний об'єм торгів",
    "profit": "Прибуток",
    "success_rate": "Успішних угод",
    "experience_years": "Років досвіду",
    "specialization": "Спеціалізація:",
    "performance": "Ефективність",
    
    // Спеціалізації
    "crypto_trading": "Криптотрейдинг",
    "swing_trading": "Свинг-трейдинг",
    "forex_trading": "Форекс",
    "algorithmic": "Алгоритмічна торгівля",
    "scalping": "Скальпінг",
    "day_trading": "Дейтрейдинг",
    "ai_analysis": "AI-аналіз",
    "stocks": "Акції",
    
    // Імена трейдерів
    "trader1_name": "Олександр Волков",
    "trader1_title": "Старший трейдер",
    "trader1_desc": "Спеціалізується на середньострокових стратегіях з використанням AI-аналізу. Розробив власну систему ризик-менеджменту.",
    
    "trader2_name": "Максим Іванов",
    "trader2_title": "Алгоритмічний трейдер",
    "trader2_desc": "Експерт у створенні торгових алгоритмів. Розробляє автоматизовані системи для високочастотної торгівлі.",
    
    "trader3_name": "Дмитро Петров",
    "trader3_title": "Скальпер",
    "trader3_desc": "Майстер короткострокових стратегій. Спеціалізується на скальпінгу з використанням просунутих технічних індикаторів.",
    
    "trader4_name": "Катерина Смирнова",
    "trader4_title": "AI-аналітик",
    "trader4_desc": "Фахівець з машинного навчання та AI-аналізу ринків. Розробляє нейромережі для прогнозування цінових рухів.",
    
    // Приєднатися
    "join_team": "СТАНЬТЕ ЧАСТИНОЮ НАШОЇ КОМАНДИ",
    "join_text": "Приєднуйтесь до професійних трейдерів Quantum Trade. Ми надаємо передові інструменти, аналітику та підтримку 24/7.",
    "contact_manager": "Зв'язатися з менеджером",

    // В объект translations добавьте:

// В объекте translations ДОЛЖНЫ быть эти ключи:

ru: {
    // ... другие переводы ...
    
    "active_users": "Активных пользователей",
    "successful_signals": "Успешных сигналов", 
    "failed_signals": "Неудачных сигналов",
    "success_rate_percent": "97.5% Успешность"
},

en: {
    // ... другие переводы ...
    
    "active_users": "Active users",
    "successful_signals": "Successful signals",
    "failed_signals": "Failed signals", 
    "success_rate_percent": "97.5% Success rate"
},

uk: {
    // ... другие переводы ...
    
    "active_users": "Активних користувачів",
    "successful_signals": "Успішних сигналів",
    "failed_signals": "Невдалих сигналів",
    "success_rate_percent": "97.5% Успішність"
}
}

}

    };

// ПРОСТАЯ ФУНКЦИЯ ВЫБОРА ЯЗЫКА
function selectLanguage(lang) {
    localStorage.setItem('quantum_lang', lang);
    window.location.href = 'home.html';
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', function() {
    window.quantumApp = new QuantumTrade();
    
    // Применяем язык ко всем страницам
    const savedLang = localStorage.getItem('quantum_lang') || 'ru';
    window.quantumApp.applyLanguage(savedLang);
    
    if (document.querySelector('.instrument-price')) {
        window.quantumApp.simulateMarketData();
    }
});

// Остальной код остается без изменений...
class UserDB {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('quantum_users')) {
            localStorage.setItem('quantum_users', JSON.stringify([]));
        }
    }

    register(userData) {
        const users = JSON.parse(localStorage.getItem('quantum_users'));

        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Пользователь с таким email уже существует' };
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            balance: 10000,
            verified: false
        };

        users.push(newUser);
        localStorage.setItem('quantum_users', JSON.stringify(users));
        
        this.login(userData.email, userData.password);
        
        return { success: true, message: 'Регистрация успешна!', user: newUser };
    }

    login(email, password) {
        const users = JSON.parse(localStorage.getItem('quantum_users'));
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('quantum_user', JSON.stringify(user));
            return { success: true, message: 'Вход выполнен успешно!', user };
        } else {
            return { success: false, message: 'Неверный email или пароль' };
        }
    }

    logout() {
        localStorage.removeItem('quantum_user');
        return { success: true, message: 'Выход выполнен успешно!' };
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('quantum_user'));
    }
}

// Инициализация UserDB
document.addEventListener('DOMContentLoaded', function() {
    window.userDB = new UserDB();
    setupAuthForms();
});

function setupAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            const result = window.userDB.login(email, password);
            showNotification(result.message, result.success ? 'success' : 'error');
            
            if (result.success) {
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

            if (password !== confirmPassword) {
                showNotification('Пароли не совпадают!', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Пароль должен содержать минимум 6 символов', 'error');
                return;
            }

            const result = window.userDB.register({ name, email, password });
            showNotification(result.message, result.success ? 'success' : 'error');
            
            if (result.success) {
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            }
        });
    }
}

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.quantum-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `quantum-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
}

function startTrading() {
    if (window.quantumApp) {
        window.quantumApp.startTrading();
    }
}

function openTelegramBot() {
    window.open('https://t.me/AlfaSigBot', '_blank');
}

// В объект translations добавьте эти ключи:

// Добавьте эту функцию в класс QuantumTrade или отдельно
function animateCounters() {
    const usersElement = document.getElementById('usersCount');
    const successElement = document.getElementById('successSignals');
    const failedElement = document.getElementById('failedSignals');
    
    if (usersElement) {
        animateValue(usersElement, 0, 9600, 2000);
    }
    if (successElement) {
        animateValue(successElement, 0, 12847, 2500);
    }
    if (failedElement) {
        animateValue(failedElement, 0, 324, 1500);
    }
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Вызовите функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    
    // Анимация счетчиков
    if (document.querySelector('.stats-section')) {
        setTimeout(animateCounters, 1000);
    }
});

// Принудительное обновление перевода при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('quantum_lang') || 'ru';
    
    // Применяем перевод ко всем элементам с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[savedLang] && translations[savedLang][key]) {
            element.textContent = translations[savedLang][key];
        }
    });
});

function selectLanguage(lang) {
    localStorage.setItem('quantum_lang', lang);
    
    // Применяем язык сразу
    if (window.quantumApp) {
        window.quantumApp.applyLanguage(lang);
    }
    
    // Переходим на главную страницу
    window.location.href = 'home.html';
}
