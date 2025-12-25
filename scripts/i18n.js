// Internationalization (i18n) System
class I18n {
    constructor() {
        this.currentLanguage = 'de';
        this.translations = {};
        this.supportedLanguages = ['de', 'pl'];
    }

    // Detect browser language
    detectLanguage() {
        // Check localStorage first
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();

        if (this.supportedLanguages.includes(langCode)) {
            return langCode;
        }

        // Default to German
        return 'de';
    }

    // Load translation file
    async loadLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Language ${lang} is not supported. Defaulting to German.`);
            lang = 'de';
        }

        try {
            const response = await fetch(`assets/locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${response.statusText}`);
            }
            this.translations = await response.json();
            this.currentLanguage = lang;
            localStorage.setItem('preferredLanguage', lang);
            return true;
        } catch (error) {
            console.error('Error loading language file:', error);
            // Fallback to German if loading fails
            if (lang !== 'de') {
                return await this.loadLanguage('de');
            }
            return false;
        }
    }

    // Get translation by key (supports nested keys like "nav.home")
    translate(key) {
        const keys = key.split('.');
        let value = this.translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    }

    // Update all elements with data-i18n attributes
    updatePageContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translation;
            } else if (element.hasAttribute('data-i18n-placeholder')) {
                element.placeholder = translation;
            } else if (element.hasAttribute('data-i18n-html')) {
                // Allow HTML content for elements with data-i18n-html attribute
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update language toggle buttons
        this.updateLanguageToggle();

        // Update navigation links
        this.updateNavigationLinks();
    }

    // Update navigation links (WhatsApp, RSVP)
    updateNavigationLinks() {
        const whatsappLink = document.getElementById('whatsapp-link');
        const rsvpLink = document.getElementById('rsvp-link');
        const heroRsvpLink = document.getElementById('hero-rsvp-link');

        if (whatsappLink && this.translations.links) {
            const link = this.translate('links.whatsapp');
            if (link && link !== 'links.whatsapp') {
                whatsappLink.href = link;
            }
        }

        if (rsvpLink && this.translations.links) {
            const link = this.translate('links.rsvp');
            if (link && link !== 'links.rsvp') {
                rsvpLink.href = link;
            }
        }

        if (heroRsvpLink && this.translations.links) {
            const link = this.translate('links.rsvp');
            if (link && link !== 'links.rsvp') {
                heroRsvpLink.href = link;
            }
        }
    }

    // Update language toggle active state
    updateLanguageToggle() {
        const langButtons = document.querySelectorAll('.lang-toggle button');
        langButtons.forEach(button => {
            if (button.dataset.lang === this.currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Change language
    async changeLanguage(lang) {
        if (lang === this.currentLanguage) {
            return;
        }

        await this.loadLanguage(lang);
        this.updatePageContent();
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    // Initialize i18n system
    async init() {
        const detectedLang = this.detectLanguage();
        await this.loadLanguage(detectedLang);
        this.updatePageContent();
    }
}

// Create global i18n instance
const i18n = new I18n();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});

// Language toggle event listeners
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-toggle button');
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.dataset.lang;
            i18n.changeLanguage(lang);
        });
    });
});

