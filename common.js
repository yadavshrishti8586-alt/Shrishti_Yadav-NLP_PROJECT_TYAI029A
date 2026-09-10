const APP_API_BASE = window.location.hostname === 'gyaan-ai-backend.onrender.com' ? 'https://gyaan-ai-backend.onrender.com' : '';
const APP_TRANSLATIONS = {
  English: { home: 'Home', dashboard: 'Dashboard', aiTutor: 'AI Tutor', quiz: 'Quiz', studyMaterial: 'Study Material', uploadMaterial: 'Upload Material', login: 'Login', register: 'Register', logout: 'Log out', language: 'Language', title: 'Material title', subject: 'Subject', description: 'Description', chooseFile: 'Choose file', upload: 'Upload material', search: 'Search materials', allSubjects: 'All subjects', view: 'View', download: 'Download', uploadedBy: 'Uploaded by', empty: 'No study materials found yet.', loading: 'Loading...', success: 'Material uploaded successfully.', required: 'Please complete the required fields.', signIn: 'Please log in to continue.' },
  Hindi: { home: 'होम', dashboard: 'डैशबोर्ड', aiTutor: 'एआई ट्यूटर', quiz: 'क्विज़', studyMaterial: 'अध्ययन सामग्री', uploadMaterial: 'सामग्री अपलोड करें', login: 'लॉग इन', register: 'रजिस्टर', logout: 'लॉग आउट', language: 'भाषा', title: 'सामग्री का शीर्षक', subject: 'विषय', description: 'विवरण', chooseFile: 'फ़ाइल चुनें', upload: 'सामग्री अपलोड करें', search: 'सामग्री खोजें', allSubjects: 'सभी विषय', view: 'देखें', download: 'डाउनलोड', uploadedBy: 'अपलोड करने वाले', empty: 'अभी कोई अध्ययन सामग्री नहीं मिली।', loading: 'लोड हो रहा है...', success: 'सामग्री सफलतापूर्वक अपलोड हुई।', required: 'कृपया आवश्यक फ़ील्ड भरें।', signIn: 'जारी रखने के लिए लॉग इन करें।' },
  Marathi: { home: 'मुख्यपृष्ठ', dashboard: 'डॅशबोर्ड', aiTutor: 'एआय ट्यूटर', quiz: 'क्विझ', studyMaterial: 'अभ्यास साहित्य', uploadMaterial: 'साहित्य अपलोड करा', login: 'लॉग इन', register: 'नोंदणी', logout: 'लॉग आउट', language: 'भाषा', title: 'साहित्याचे शीर्षक', subject: 'विषय', description: 'वर्णन', chooseFile: 'फाइल निवडा', upload: 'साहित्य अपलोड करा', search: 'साहित्य शोधा', allSubjects: 'सर्व विषय', view: 'पहा', download: 'डाउनलोड', uploadedBy: 'अपलोड करणारे', empty: 'अद्याप अभ्यास साहित्य मिळाले नाही.', loading: 'लोड होत आहे...', success: 'साहित्य यशस्वीरित्या अपलोड झाले.', required: 'कृपया आवश्यक माहिती भरा.', signIn: 'पुढे जाण्यासाठी लॉग इन करा.' }
};

function currentLanguage() { return localStorage.getItem('language') || 'English'; }
function translatePage(language = currentLanguage()) {
  const dictionary = APP_TRANSLATIONS[language] || APP_TRANSLATIONS.English;
  document.documentElement.lang = language === 'Hindi' ? 'hi' : language === 'Marathi' ? 'mr' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(element => { if (dictionary[element.dataset.i18n]) element.textContent = dictionary[element.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => { element.placeholder = dictionary[element.dataset.i18nPlaceholder] || element.placeholder; });
  const selected = document.querySelector('#selectedLanguage');
  if (selected) selected.textContent = language;
}
function setLanguage(language) { localStorage.setItem('language', language); translatePage(language); window.dispatchEvent(new CustomEvent('languagechange', { detail: language })); }
function apiUrl(path) { return APP_API_BASE + path; }
function authHeaders(extra = {}) { const token = localStorage.getItem('token'); return { ...extra, ...(token ? { Authorization: `Bearer ${token}` } : {}) }; }
function requireAuth() { if (!localStorage.getItem('token')) { window.location.href = `/login?returnTo=${encodeURIComponent(window.location.pathname)}`; return false; } return true; }
function logout() { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/login'; }

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const languageMenu = navLinks.querySelector('.language-menu');
    if (languageMenu) languageMenu.remove();
    navLinks.querySelectorAll('a').forEach(link => {
      if (/^\/dashboard(?:\/)?$/i.test(link.getAttribute('href') || '')) {
        link.remove();
        return;
      }
      if (/AI%20Tutar|AI Tutar/i.test(link.getAttribute('href') || '')) link.href = '/ai-tutor';
      if (/quiz\.html/i.test(link.getAttribute('href') || '')) link.href = '/quiz';
      if (/subjects\.html|Subject\.Html/i.test(link.getAttribute('href') || '')) link.href = '/study-materials';
      if (/profile\.html/i.test(link.getAttribute('href') || '')) {
        link.href = '/profile';
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user?.name) {
          const icon = link.querySelector('.profile-icon');
          link.textContent = `${icon ? icon.textContent + ' ' : ''}${user.name}`;
        }
      }
    });
    const token = localStorage.getItem('token');
    if (token) {
      navLinks.closest('.nav-container')?.querySelectorAll('a[href="/login"], a[href="login.html"], a[href="Login.Html"]').forEach(link => link.remove());
    }
    const navActions = document.querySelector('.nav-actions');
    if (navActions && !navActions.querySelector('a[href="/profile"]')) {
      const profile = document.createElement('a');
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      profile.href = '/profile';
      profile.className = 'profile-btn';
      profile.textContent = user?.name || 'Profile';
      navActions.insertBefore(profile, navActions.firstChild);
    }
    const items = [['/study-materials', 'studyMaterial'], ['/upload-material', 'uploadMaterial']];
    items.forEach(([href, key]) => {
      if (!navLinks.querySelector(`a[href="${href}"]`)) {
        const link = document.createElement('a'); link.href = href; link.dataset.i18n = key; link.textContent = APP_TRANSLATIONS[currentLanguage()][key];
        languageMenu ? navLinks.insertBefore(link, languageMenu) : navLinks.appendChild(link);
      }
    });
  }
  translatePage();
  const menu = document.querySelector('#languageMenu');
  const button = document.querySelector('#languageBtn');
  if (button && menu) button.addEventListener('click', event => { event.stopPropagation(); menu.classList.toggle('open'); });
  document.querySelectorAll('[data-lang]').forEach(option => option.addEventListener('click', event => { event.preventDefault(); setLanguage(option.dataset.lang); menu?.classList.remove('open'); }));
  document.addEventListener('click', () => menu?.classList.remove('open'));
});
