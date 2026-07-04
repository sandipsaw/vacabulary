import './style.css'
import { createStore } from 'redux'

const STORAGE_KEY = 'vocab-words'

function loadWords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function persistWords(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words))
}

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '').replace('/', '')
  return hash === 'add-word' ? 'add-word' : 'home'
}

const initialState = {
  page: getPageFromHash(),
  words: loadWords(),
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.page }
    case 'ADD_WORD': {
      const words = [action.payload, ...state.words]
      persistWords(words)
      return { ...state, words }
    }
    default:
      return state
  }
}

const store = createStore(reducer)

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}

function renderHomePage(words) {
  const featuredWords = words.slice(0, 3)

  return `
    <div class="page-shell">
      <header class="topbar">
        <a class="brand" href="#home">VocabVerse</a>
        <nav class="nav-links">
          <a href="#hero">Home</a>
          <a href="#categories">Categories</a>
          <a href="#word-of-the-day">Word of the Day</a>
          <a href="#challenge">Quiz</a>
          <a href="#about">About</a>
          <button class="nav-cta" data-route="add-word">Add Word</button>
        </nav>
      </header>

      <main>
        <section id="hero" class="hero-section">
          <div class="hero-copy">
            <p class="eyebrow">Smart English Vocabulary Studio</p>
            <h1>Expand Your Vocabulary. Speak with Confidence.</h1>
            <p class="hero-text">Learn new English words every day with meanings, pronunciation, examples, quizzes, and interactive practice.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#categories">Get Started</a>
              <a class="btn btn-secondary" href="#word-of-the-day">Explore Words</a>
              <a class="btn btn-tertiary" href="#challenge">Take Quiz</a>
            </div>
          </div>
          <div class="hero-card">
            <h3>Today’s focus</h3>
            <p>Build stronger vocabulary through daily practice and memorable examples.</p>
            <ul>
              <li>Pronunciation support</li>
              <li>Simple explanations</li>
              <li>Quiz and memory aids</li>
            </ul>
          </div>
        </section>

        <section class="search-panel">
          <input id="search-word" type="text" placeholder="Search vocabulary words or meanings" />
          <button type="button">Search</button>
        </section>

        <section id="categories" class="section">
          <div class="section-title">
            <p class="eyebrow">Categories</p>
            <h2>Learn by Category</h2>
          </div>
          <div class="chip-grid">
            ${['Daily Vocabulary','Business English','Academic Words','IELTS Vocabulary','TOEFL Vocabulary','Synonyms','Antonyms','Phrasal Verbs','Idioms','Slang','Verbs','Adjectives','Nouns','Advanced English'].map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join('')}
          </div>
        </section>

        <section id="word-of-the-day" class="section split-section">
          <div>
            <p class="eyebrow">Word of the Day</p>
            <h2>Eloquent</h2>
            <p><strong>Meaning:</strong> Fluent and persuasive in speaking or writing.</p>
            <p><strong>Pronunciation:</strong> /ˈeləkwənt/</p>
            <p><strong>Example:</strong> She gave an eloquent speech during the ceremony.</p>
            <a class="btn btn-primary" href="#challenge">Learn More</a>
          </div>
          <div class="info-card">
            <h3>Why it matters</h3>
            <p>Use powerful words to sound confident in essays, interviews, and conversations.</p>
          </div>
        </section>

        <section id="features" class="section">
          <div class="section-title">
            <p class="eyebrow">Why Choose Us</p>
            <h2>Why Learn With Us?</h2>
            <p>Vocabulary learning becomes simple with clear explanations, examples, and daily practice.</p>
          </div>
          <div class="feature-grid">
            ${[
              ['1000+ Words', 'Learn common, advanced, academic, and business vocabulary.'],
              ['Pronunciation', 'Listen to the correct pronunciation of every word.'],
              ['Simple Meanings', 'Understand words with easy definitions.'],
              ['Examples', 'See how words appear in real conversations.'],
              ['Quizzes', 'Practice with interactive quiz formats.'],
              ['Daily Challenge', 'Learn one new word every day.'],
            ].map(([title, text]) => `<article class="feature-card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}
          </div>
        </section>

        <section class="section split-section">
          <div>
            <p class="eyebrow">Learning Process</p>
            <h2>How It Works</h2>
            <ol class="steps-list">
              <li>Choose a vocabulary category.</li>
              <li>Read meanings with examples.</li>
              <li>Practice pronunciation.</li>
              <li>Take quizzes to improve memory.</li>
              <li>Track your progress.</li>
            </ol>
          </div>
          <div class="info-card">
            <h3>Daily Challenge</h3>
            <p>Improve your vocabulary every day with quick quizzes, flashcards, and word games.</p>
            <a class="btn btn-primary" href="#challenge">Start Quiz</a>
          </div>
        </section>

        <section id="challenge" class="section challenge-banner">
          <div>
            <p class="eyebrow">Challenge Yourself</p>
            <h2>Practice smarter, not harder.</h2>
            <p>Build confidence with multiple-choice questions, fill-in-the-blank tasks, matching games, and flashcards.</p>
          </div>
          <a class="btn btn-primary" href="#categories">Start Quiz</a>
        </section>

        <section class="section">
          <div class="section-title">
            <p class="eyebrow">Recently Added</p>
            <h2>Your stored vocabulary words</h2>
          </div>
          <div class="word-list">
            ${featuredWords.length ? featuredWords.map((word) => `
              <article class="word-card">
                <div class="word-card-header">
                  <h3>${escapeHtml(word.word)}</h3>
                  <span>${escapeHtml(word.difficultyLevel || 'Medium')}</span>
                </div>
                <p><strong>Meaning:</strong> ${escapeHtml(word.meaningEnglish || word.simpleMeaning || '')}</p>
                <p><strong>Hindi:</strong> ${escapeHtml(word.meaningHindi || '')}</p>
                <p><strong>Example:</strong> ${escapeHtml(word.exampleSentence || '')}</p>
              </article>
            `).join('') : '<p class="empty-state">No words have been added yet. Use the Add Word button to store your first word.</p>'}
          </div>
        </section>

        <section class="section testimonial-section">
          <div class="section-title">
            <p class="eyebrow">Testimonials</p>
            <h2>What Our Learners Say</h2>
          </div>
          <div class="testimonial-grid">
            <article class="testimonial-card">“This website helped me improve my English vocabulary for interviews.”<span>— Rahul</span></article>
            <article class="testimonial-card">“The quizzes are fun and make learning easy.”<span>— Priya</span></article>
            <article class="testimonial-card">“I learned hundreds of new words in just a few weeks.”<span>— Aman</span></article>
          </div>
        </section>

        <section id="about" class="section cta-banner">
          <h2>Ready to Improve Your English?</h2>
          <p>Start learning thousands of English words today and become a more confident speaker and writer.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#add-word">Get Started</a>
            <a class="btn btn-secondary" href="#categories">Explore Vocabulary</a>
          </div>
        </section>
      </main>

      <footer id="contact" class="footer">
        <div>
          <h3>Quick Links</h3>
          <a href="#hero">Home</a>
          <a href="#categories">Vocabulary</a>
          <a href="#categories">Categories</a>
          <a href="#challenge">Quiz</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h3>Resources</h3>
          <a href="#word-of-the-day">Daily Word</a>
          <a href="#challenge">Flashcards</a>
          <a href="#challenge">Word Games</a>
          <a href="#hero">Grammar</a>
        </div>
        <div>
          <h3>Social</h3>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">YouTube</a>
        </div>
      </footer>
    </div>
  `
}

function renderAddWordPage(words) {
  return `
    <div class="page-shell form-page">
      <header class="topbar compact">
        <a class="brand" href="#home">VocabVerse</a>
        <nav class="nav-links">
          <a href="#hero">Home</a>
          <button class="nav-cta" data-route="add-word">Add Word</button>
        </nav>
      </header>

      <main class="form-layout">
        <section class="form-card">
          <p class="eyebrow">Admin / Contributor Form</p>
          <h1>Add a New Vocabulary Word</h1>
          <p>Fill in the details below and save the word into the Redux store with local persistence.</p>

          <form id="word-form">
            <div class="form-grid">
              <label>
                Word
                <input name="word" required placeholder="Abundant" />
              </label>
              <label>
                Pronunciation
                <input name="pronunciation" placeholder="/əˈbʌndənt/" />
              </label>
              <label>
                Part of Speech
                <input name="partOfSpeech" placeholder="Adjective" />
              </label>
              <label>
                Difficulty Level
                <select name="difficultyLevel">
                  <option>Easy</option>
                  <option selected>Medium</option>
                  <option>Hard</option>
                </select>
              </label>
              <label>
                Category
                <input name="category" placeholder="Daily Vocabulary" />
              </label>
              <label>
                Image
                <input name="image" type="file" accept="image/*" />
              </label>
              <label>
                Audio
                <input name="audio" placeholder="https://example.com/audio.mp3" />
              </label>
              <label>
                Date Added
                <input name="dateAdded" value="${escapeHtml(new Date().toISOString().slice(0, 10))}" />
              </label>
            </div>

            <label>
              Meaning (English)
              <textarea name="meaningEnglish" rows="3" placeholder="Existing in large quantities"></textarea>
            </label>
            <label>
              Meaning (Hindi)
              <textarea name="meaningHindi" rows="3" placeholder="प्रचुर"></textarea>
            </label>
            <label>
              Simple Meaning
              <textarea name="simpleMeaning" rows="3" placeholder="More than enough"></textarea>
            </label>
            <label>
              Example Sentence
              <textarea name="exampleSentence" rows="3" placeholder="The garden has abundant flowers."></textarea>
            </label>
            <label>
              Hindi Example
              <textarea name="hindiExample" rows="3" placeholder="बगीचे में बहुत सारे फूल हैं।"></textarea>
            </label>
            <label>
              Synonyms
              <textarea name="synonyms" rows="2" placeholder="Plenty, Ample, Sufficient"></textarea>
            </label>
            <label>
              Antonyms
              <textarea name="antonyms" rows="2" placeholder="Scarce, Rare"></textarea>
            </label>
            <label>
              Memory Trick
              <textarea name="memoryTrick" rows="3" placeholder="Think of a bakery with buns everywhere = abundant buns."></textarea>
            </label>
            <label>
              Quiz
              <textarea name="quiz" rows="2" placeholder="MCQ, Fill in the Blank"></textarea>
            </label>

            <button class="submit-btn" type="submit">Save Word to Store</button>
          </form>
        </section>

        <aside class="sidebar-card">
          <h2>Stored Words</h2>
          ${words.length ? words.slice(0, 6).map((word) => `
            <article class="stored-word-card">
              <h3>${escapeHtml(word.word)}</h3>
              <p>${escapeHtml(word.meaningEnglish || word.simpleMeaning || '')}</p>
              <small>${escapeHtml(word.category || 'Vocabulary')}</small>
            </article>
          `).join('') : '<p class="empty-state">No words saved yet.</p>'}
        </aside>
      </main>
    </div>
  `
}

function bindEvents() {
  document.querySelectorAll('[data-route="add-word"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      window.location.hash = '#add-word'
      store.dispatch({ type: 'SET_PAGE', page: 'add-word' })
      render()
    })
  })

  const form = document.querySelector('#word-form')
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
      const formData = new FormData(form)
      const imageFile = formData.get('image')
      let imageValue = ''

      if (imageFile && imageFile.size) {
        imageValue = await readFileAsDataUrl(imageFile)
      }

      const payload = {
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        word: formData.get('word')?.toString().trim() || '',
        pronunciation: formData.get('pronunciation')?.toString().trim() || '',
        partOfSpeech: formData.get('partOfSpeech')?.toString().trim() || '',
        meaningEnglish: formData.get('meaningEnglish')?.toString().trim() || '',
        meaningHindi: formData.get('meaningHindi')?.toString().trim() || '',
        simpleMeaning: formData.get('simpleMeaning')?.toString().trim() || '',
        exampleSentence: formData.get('exampleSentence')?.toString().trim() || '',
        hindiExample: formData.get('hindiExample')?.toString().trim() || '',
        synonyms: formData.get('synonyms')?.toString().trim() || '',
        antonyms: formData.get('antonyms')?.toString().trim() || '',
        difficultyLevel: formData.get('difficultyLevel')?.toString().trim() || '',
        category: formData.get('category')?.toString().trim() || '',
        image: imageValue,
        audio: formData.get('audio')?.toString().trim() || '',
        memoryTrick: formData.get('memoryTrick')?.toString().trim() || '',
        quiz: formData.get('quiz')?.toString().trim() || '',
        dateAdded: formData.get('dateAdded')?.toString().trim() || new Date().toISOString().slice(0, 10),
      }

      store.dispatch({ type: 'ADD_WORD', payload })
      form.reset()
      window.location.hash = '#'
      store.dispatch({ type: 'SET_PAGE', page: 'home' })
      render()
    })
  }

  const searchInput = document.querySelector('#search-word')
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim()
      const cards = document.querySelectorAll('.word-card')
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase()
        card.style.display = text.includes(query) ? 'block' : 'none'
      })
    })
  }
}

function render() {
  const state = store.getState()
  const app = document.querySelector('#app')
  app.innerHTML = state.page === 'add-word' ? renderAddWordPage(state.words) : renderHomePage(state.words)
  bindEvents()
}

window.addEventListener('hashchange', () => {
  const page = getPageFromHash()
  store.dispatch({ type: 'SET_PAGE', page })
  render()
})

render()
