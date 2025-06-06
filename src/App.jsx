import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'

// Pages (will be created next)
import OnboardingPath from './pages/OnboardingPath'
import KnowledgeHub from './pages/KnowledgeHub'
import DecisionFrameworks from './pages/DecisionFrameworks'
import TemplateLibrary from './pages/TemplateLibrary'
import DailyOperations from './pages/DailyOperations'

function App() {
  const [progress, setProgress] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Load progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('programmatic101-progress')
    if (stored) {
      setProgress(JSON.parse(stored))
    }
  }, [])

  // Update progress in localStorage
  const updateProgress = (newProgress) => {
    localStorage.setItem('programmatic101-progress', JSON.stringify(newProgress))
    setProgress(newProgress)
  }

  // Navigation items
  const navigationItems = [
    {
      path: '/',
      icon: '🎯',
      title: 'Onboarding Path',
      description: 'Start your journey'
    },
    {
      path: '/knowledge',
      icon: '📚',
      title: 'Knowledge Hub',
      description: 'Learn the fundamentals'
    },
    {
      path: '/decisions',
      icon: '🧭',
      title: 'Decision Frameworks',
      description: 'Solve problems step-by-step'
    },
    {
      path: '/templates',
      icon: '📝',
      title: 'Template Library',
      description: 'Ready-to-use responses'
    },
    {
      path: '/operations',
      icon: '⚡',
      title: 'Daily Operations',
      description: 'Quick reference'
    }
  ]

  // Calculate overall progress percentage
  const getProgressPercentage = () => {
    if (!progress) return 0
    const totalSections = 50 // Approximate total sections
    const completed = progress.progress.completedSections.length
    return Math.min(Math.round((completed / totalSections) * 100), 100)
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <h1>Programmatic 101</h1>
          </div>

          <div className="header-stats">
            {progress && (
              <>
                <div className="stat">
                  <span className="stat-icon">🏆</span>
                  <span>{progress.progress.achievementsBadges.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">⭐</span>
                  <span>{progress.progress.totalPoints}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🔥</span>
                  <span>{progress.progress.currentStreak}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          {/* Progress Overview */}
          <div className="progress-overview">
            <h3>Your Progress</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <p>{getProgressPercentage()}% Complete</p>
          </div>

          {/* Navigation */}
          <nav className="navigation">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'nav-item-active' : ''}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <div className="nav-content">
                  <span className="nav-title">{item.title}</span>
                  <span className="nav-description">{item.description}</span>
                </div>
              </NavLink>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h4>Quick Actions</h4>
            <button className="quick-action">
              <span>🔍</span>
              Search Knowledge
            </button>
            <button className="quick-action">
              <span>📊</span>
              View Analytics
            </button>
            <button className="quick-action">
              <span>🎯</span>
              Daily Challenge
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? 'main-shifted' : ''}`}>
        <div className="content-wrapper">
          <Routes>
            <Route 
              path="/" 
              element={
                <OnboardingPath 
                  progress={progress} 
                  updateProgress={updateProgress} 
                />
              } 
            />
            <Route 
              path="/knowledge" 
              element={
                <KnowledgeHub 
                  progress={progress} 
                  updateProgress={updateProgress} 
                />
              } 
            />
            <Route 
              path="/decisions" 
              element={
                <DecisionFrameworks 
                  progress={progress} 
                  updateProgress={updateProgress} 
                />
              } 
            />
            <Route 
              path="/templates" 
              element={
                <TemplateLibrary 
                  progress={progress} 
                  updateProgress={updateProgress} 
                />
              } 
            />
            <Route 
              path="/operations" 
              element={
                <DailyOperations 
                  progress={progress} 
                  updateProgress={updateProgress} 
                />
              } 
            />
          </Routes>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default App