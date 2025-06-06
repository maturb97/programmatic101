import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './App.css'

// Initialize progress tracking in localStorage if not exists
if (!localStorage.getItem('programmatic101-progress')) {
  localStorage.setItem('programmatic101-progress', JSON.stringify({
    progress: {
      completedSections: [],
      achievementsBadges: [],
      currentStreak: 0,
      totalPoints: 0,
      startDate: new Date().toISOString()
    },
    preferences: {
      bookmarks: [],
      recentlyViewed: [],
      favoriteTemplates: [],
      currentPath: "onboarding"
    },
    userJourney: {
      startDate: new Date().toISOString(),
      sessionsCompleted: 0,
      lastVisit: new Date().toISOString(),
      totalTimeSpent: 0
    }
  }))
}

// Track session start
const updateLastVisit = () => {
  const stored = JSON.parse(localStorage.getItem('programmatic101-progress'))
  stored.userJourney.lastVisit = new Date().toISOString()
  stored.userJourney.sessionsCompleted += 1
  localStorage.setItem('programmatic101-progress', JSON.stringify(stored))
}

updateLastVisit()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/programmatic101">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)