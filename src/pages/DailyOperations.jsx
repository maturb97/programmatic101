import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DailyOperations = ({ progress, updateProgress }) => {
  const [activeCalculator, setActiveCalculator] = useState(null)
  const [calculatorValues, setCalculatorValues] = useState({})
  const [dailyChallenge, setDailyChallenge] = useState(null)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [quickNotes, setQuickNotes] = useState('')
  const [checklist, setChecklist] = useState(new Set())

  // Daily challenge questions pool
  const challengeQuestions = [
    {
      id: 'cpm-calculation',
      question: 'Campaign spent 15,000 PLN with 3,750,000 impressions. What is the CPM?',
      options: ['3 PLN', '4 PLN', '5 PLN', '6 PLN'],
      correct: 1,
      explanation: 'CPM = (15,000 ÷ 3,750,000) × 1,000 = 4 PLN'
    },
    {
      id: 'viewability-standard',
      question: 'What is the MRC viewability standard for video ads?',
      options: ['50% pixels, 1 second', '50% pixels, 2 seconds', '100% pixels, 1 second', '25% pixels, 2 seconds'],
      correct: 1,
      explanation: 'Video ads must have 50% of pixels visible for 2+ seconds to be considered viewable'
    },
    {
      id: 'frequency-cap',
      question: 'What frequency cap would you recommend for a brand awareness campaign?',
      options: ['1-2 per month', '3-5 per month', '10-15 per month', '20+ per month'],
      correct: 1,
      explanation: 'Awareness campaigns typically use 3-5 impressions per month to avoid ad fatigue'
    },
    {
      id: 'attribution-window',
      question: 'For awareness campaigns, what view-through attribution window is most common?',
      options: ['1 day', '7 days', '30 days', '90 days'],
      correct: 2,
      explanation: '30-day view-through attribution is standard for awareness campaigns'
    },
    {
      id: 'budget-allocation',
      question: 'Client has 100k PLN budget for awareness campaign with display and video assets. Recommended split?',
      options: ['90% Display, 10% Video', '70% Display, 30% Video', '50% Display, 50% Video', '30% Display, 70% Video'],
      correct: 1,
      explanation: 'For awareness with good budget, 70% display + 30% video maximizes reach while adding video impact'
    }
  ]

  // Daily checklist items
  const dailyChecklistItems = [
    { id: 'check-campaigns', label: 'Check active campaign performance' },
    { id: 'review-budgets', label: 'Review budget pacing and spend' },
    { id: 'analyze-metrics', label: 'Analyze key metrics (CTR, CPM, viewability)' },
    { id: 'respond-emails', label: 'Respond to client emails and briefs' },
    { id: 'optimize-underperforming', label: 'Optimize underperforming line items' },
    { id: 'update-reports', label: 'Update client reports if due' },
    { id: 'plan-tomorrow', label: 'Plan tomorrow\'s priorities' }
  ]

  // Quick reference data
  const quickReference = {
    benchmarks: [
      { metric: 'Display CTR', benchmark: '0.05-0.15%', note: 'Higher for remarketing' },
      { metric: 'Video CTR', benchmark: '0.15-0.30%', note: 'Varies by platform' },
      { metric: 'Display CPM', benchmark: '8-15 PLN', note: 'Polish market average' },
      { metric: 'Video CPM', benchmark: '15-30 PLN', note: 'Premium placements higher' },
      { metric: 'Viewability Rate', benchmark: '60-75%', note: '80%+ for premium' },
      { metric: 'Frequency Cap', benchmark: '3-5/month', note: 'Awareness campaigns' }
    ],
    shortcuts: [
      { action: 'DV360 Login', shortcut: 'Cmd+Shift+D', note: 'Quick access' },
      { action: 'Campaign Manager', shortcut: 'Cmd+Shift+C', note: 'Conversion tracking' },
      { action: 'Analytics', shortcut: 'Cmd+Shift+A', note: 'Performance data' },
      { action: 'Teams Templates', shortcut: 'Cmd+Shift+T', note: 'Shared resources' }
    ],
    redFlags: [
      { issue: 'CTR below 0.02%', action: 'Check targeting and creative' },
      { issue: 'Viewability below 50%', action: 'Review placement strategy' },
      { issue: 'CPM 2x benchmark', action: 'Adjust bidding strategy' },
      { issue: 'Budget overspend', action: 'Implement pacing controls' },
      { issue: 'Zero conversions', action: 'Verify tracking setup' }
    ]
  }

  // Calculator configurations
  const calculators = {
    cpm: {
      title: 'CPM Calculator',
      icon: '💰',
      inputs: [
        { key: 'cost', label: 'Total Cost (PLN)', type: 'number', placeholder: '10000' },
        { key: 'impressions', label: 'Total Impressions', type: 'number', placeholder: '2500000' }
      ],
      calculate: (values) => {
        const { cost, impressions } = values
        if (!cost || !impressions) return null
        const cpm = (cost / impressions) * 1000
        return {
          result: `${cpm.toFixed(2)} PLN`,
          explanation: `CPM = (${cost} ÷ ${impressions}) × 1,000 = ${cpm.toFixed(2)} PLN`
        }
      }
    },
    ctr: {
      title: 'CTR Calculator',
      icon: '👆',
      inputs: [
        { key: 'clicks', label: 'Total Clicks', type: 'number', placeholder: '1500' },
        { key: 'impressions', label: 'Total Impressions', type: 'number', placeholder: '500000' }
      ],
      calculate: (values) => {
        const { clicks, impressions } = values
        if (!clicks || !impressions) return null
        const ctr = (clicks / impressions) * 100
        return {
          result: `${ctr.toFixed(3)}%`,
          explanation: `CTR = (${clicks} ÷ ${impressions}) × 100 = ${ctr.toFixed(3)}%`
        }
      }
    },
    viewability: {
      title: 'Viewability Rate',
      icon: '👀',
      inputs: [
        { key: 'viewableImpressions', label: 'Viewable Impressions', type: 'number', placeholder: '1800000' },
        { key: 'totalImpressions', label: 'Total Impressions', type: 'number', placeholder: '2500000' }
      ],
      calculate: (values) => {
        const { viewableImpressions, totalImpressions } = values
        if (!viewableImpressions || !totalImpressions) return null
        const viewability = (viewableImpressions / totalImpressions) * 100
        return {
          result: `${viewability.toFixed(1)}%`,
          explanation: `Viewability = (${viewableImpressions} ÷ ${totalImpressions}) × 100 = ${viewability.toFixed(1)}%`
        }
      }
    },
    budgetPacing: {
      title: 'Budget Pacing',
      icon: '📊',
      inputs: [
        { key: 'spentBudget', label: 'Spent Budget (PLN)', type: 'number', placeholder: '25000' },
        { key: 'totalBudget', label: 'Total Budget (PLN)', type: 'number', placeholder: '100000' },
        { key: 'daysElapsed', label: 'Days Elapsed', type: 'number', placeholder: '15' },
        { key: 'totalDays', label: 'Total Campaign Days', type: 'number', placeholder: '30' }
      ],
      calculate: (values) => {
        const { spentBudget, totalBudget, daysElapsed, totalDays } = values
        if (!spentBudget || !totalBudget || !daysElapsed || !totalDays) return null
        
        const spentPercentage = (spentBudget / totalBudget) * 100
        const timePercentage = (daysElapsed / totalDays) * 100
        const pacingStatus = spentPercentage - timePercentage
        
        let status = 'On Track'
        if (pacingStatus > 10) status = 'Overspending'
        else if (pacingStatus < -10) status = 'Underspending'
        
        return {
          result: `${status} (${pacingStatus > 0 ? '+' : ''}${pacingStatus.toFixed(1)}%)`,
          explanation: `Spent ${spentPercentage.toFixed(1)}% of budget in ${timePercentage.toFixed(1)}% of time`
        }
      }
    }
  }

  // Load progress and daily state
  useEffect(() => {
    // Load quick notes
    const savedNotes = localStorage.getItem('programmatic101-daily-notes')
    if (savedNotes) {
      setQuickNotes(savedNotes)
    }

    // Load today's checklist
    const today = new Date().toDateString()
    const savedChecklist = localStorage.getItem(`programmatic101-checklist-${today}`)
    if (savedChecklist) {
      setChecklist(new Set(JSON.parse(savedChecklist)))
    }

    // Load or generate daily challenge
    const savedChallenge = localStorage.getItem(`programmatic101-challenge-${today}`)
    if (savedChallenge) {
      const challengeData = JSON.parse(savedChallenge)
      setDailyChallenge(challengeData.challenge)
      setChallengeCompleted(challengeData.completed)
    } else {
      // Generate new challenge
      const randomChallenge = challengeQuestions[Math.floor(Math.random() * challengeQuestions.length)]
      setDailyChallenge(randomChallenge)
      localStorage.setItem(`programmatic101-challenge-${today}`, JSON.stringify({
        challenge: randomChallenge,
        completed: false
      }))
    }
  }, [])

  // Save quick notes
  useEffect(() => {
    localStorage.setItem('programmatic101-daily-notes', quickNotes)
  }, [quickNotes])

  // Update calculator values
  const updateCalculatorValue = (key, value) => {
    setCalculatorValues(prev => ({
      ...prev,
      [activeCalculator]: {
        ...prev[activeCalculator],
        [key]: value
      }
    }))
  }

  // Toggle checklist item
  const toggleChecklistItem = (itemId) => {
    const newChecklist = new Set(checklist)
    if (newChecklist.has(itemId)) {
      newChecklist.delete(itemId)
    } else {
      newChecklist.add(itemId)
    }
    setChecklist(newChecklist)

    // Save to localStorage
    const today = new Date().toDateString()
    localStorage.setItem(`programmatic101-checklist-${today}`, JSON.stringify(Array.from(newChecklist)))

    // Award points for completing checklist items
    if (!checklist.has(itemId) && progress) {
      const newProgress = { ...progress }
      newProgress.progress.totalPoints += 10
      updateProgress(newProgress)
    }
  }

  // Answer daily challenge
  const answerChallenge = (selectedAnswer) => {
    if (challengeCompleted) return

    const isCorrect = selectedAnswer === dailyChallenge.correct
    setChallengeCompleted(true)

    // Save completion
    const today = new Date().toDateString()
    localStorage.setItem(`programmatic101-challenge-${today}`, JSON.stringify({
      challenge: dailyChallenge,
      completed: true,
      correct: isCorrect
    }))

    // Award points and check streak
    if (progress && isCorrect) {
      const newProgress = { ...progress }
      newProgress.progress.totalPoints += 50
      newProgress.progress.currentStreak += 1

      // Check for daily challenge achievement
      if (newProgress.progress.currentStreak >= 7 && !newProgress.progress.achievementsBadges.includes('daily-champion')) {
        newProgress.progress.achievementsBadges.push('daily-champion')
        newProgress.progress.totalPoints += 500
      }

      updateProgress(newProgress)
    }
  }

  const activeCalc = calculators[activeCalculator]
  const calcValues = calculatorValues[activeCalculator] || {}
  const calcResult = activeCalc?.calculate(calcValues)

  return (
    <div className="page daily-operations-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Daily Operations ⚡</h1>
        <p className="page-subtitle">
          Your workspace for daily programmatic tasks. Quick calculations, references, and productivity tools.
        </p>
      </div>

      <div className="operations-grid">
        {/* Daily Challenge */}
        <div className="operations-card daily-challenge">
          <h3>🎯 Daily Challenge</h3>
          {dailyChallenge && (
            <div className="challenge-content">
              <p className="challenge-question">{dailyChallenge.question}</p>
              
              {!challengeCompleted ? (
                <div className="challenge-options">
                  {dailyChallenge.options.map((option, index) => (
                    <button
                      key={index}
                      className="challenge-option"
                      onClick={() => answerChallenge(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="challenge-result">
                  <div className="correct-answer">
                    ✅ <strong>Correct Answer:</strong> {dailyChallenge.options[dailyChallenge.correct]}
                  </div>
                  <div className="explanation">
                    <strong>Explanation:</strong> {dailyChallenge.explanation}
                  </div>
                  <div className="streak-info">
                    🔥 Current Streak: {progress?.progress?.currentStreak || 0} days
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Daily Checklist */}
        <div className="operations-card daily-checklist">
          <h3>📋 Daily Checklist</h3>
          <div className="checklist-progress">
            {checklist.size}/{dailyChecklistItems.length} completed
          </div>
          <div className="checklist-items">
            {dailyChecklistItems.map(item => (
              <label key={item.id} className="checklist-item">
                <input
                  type="checkbox"
                  checked={checklist.has(item.id)}
                  onChange={() => toggleChecklistItem(item.id)}
                />
                <span className={checklist.has(item.id) ? 'completed' : ''}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Quick Calculators */}
        <div className="operations-card calculators">
          <h3>🧮 Quick Calculators</h3>
          <div className="calculator-tabs">
            {Object.entries(calculators).map(([key, calc]) => (
              <button
                key={key}
                className={`calc-tab ${activeCalculator === key ? 'active' : ''}`}
                onClick={() => setActiveCalculator(key)}
              >
                <span className="calc-icon">{calc.icon}</span>
                <span className="calc-name">{calc.title}</span>
              </button>
            ))}
          </div>

          {activeCalc && (
            <div className="calculator-content">
              <div className="calc-inputs">
                {activeCalc.inputs.map(input => (
                  <div key={input.key} className="calc-input">
                    <label>{input.label}:</label>
                    <input
                      type={input.type}
                      placeholder={input.placeholder}
                      value={calcValues[input.key] || ''}
                      onChange={(e) => updateCalculatorValue(input.key, e.target.value)}
                    />
                  </div>
                ))}
              </div>

              {calcResult && (
                <div className="calc-result">
                  <div className="result-value">{calcResult.result}</div>
                  <div className="result-explanation">{calcResult.explanation}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Notes */}
        <div className="operations-card quick-notes">
          <h3>📝 Quick Notes</h3>
          <textarea
            className="notes-input"
            placeholder="Jot down quick thoughts, reminders, or observations..."
            value={quickNotes}
            onChange={(e) => setQuickNotes(e.target.value)}
            rows={6}
          />
          <div className="notes-info">
            Auto-saved locally • {quickNotes.length} characters
          </div>
        </div>

        {/* Performance Benchmarks */}
        <div className="operations-card benchmarks">
          <h3>📊 Performance Benchmarks</h3>
          <div className="benchmark-list">
            {quickReference.benchmarks.map((benchmark, index) => (
              <div key={index} className="benchmark-item">
                <div className="benchmark-metric">{benchmark.metric}</div>
                <div className="benchmark-value">{benchmark.benchmark}</div>
                <div className="benchmark-note">{benchmark.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        <div className="operations-card red-flags">
          <h3>🚨 Performance Red Flags</h3>
          <div className="red-flag-list">
            {quickReference.redFlags.map((flag, index) => (
              <div key={index} className="red-flag-item">
                <div className="flag-issue">{flag.issue}</div>
                <div className="flag-action">→ {flag.action}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="operations-card quick-links">
          <h3>🔗 Quick Access</h3>
          <div className="quick-link-grid">
            <Link to="/knowledge" className="quick-link">
              <span>📚</span>
              <div>
                <strong>Knowledge Hub</strong>
                <span>Review concepts</span>
              </div>
            </Link>
            <Link to="/decisions" className="quick-link">
              <span>🧭</span>
              <div>
                <strong>Decision Trees</strong>
                <span>Solve problems</span>
              </div>
            </Link>
            <Link to="/templates" className="quick-link">
              <span>📝</span>
              <div>
                <strong>Email Templates</strong>
                <span>Copy responses</span>
              </div>
            </Link>
            <a href="#" className="quick-link external">
              <span>🎯</span>
              <div>
                <strong>DV360</strong>
                <span>Campaign platform</span>
              </div>
            </a>
            <a href="#" className="quick-link external">
              <span>📊</span>
              <div>
                <strong>Analytics</strong>
                <span>Performance data</span>
              </div>
            </a>
            <a href="#" className="quick-link external">
              <span>👥</span>
              <div>
                <strong>Teams</strong>
                <span>Shared resources</span>
              </div>
            </a>
          </div>
        </div>

        {/* Today's Focus */}
        <div className="operations-card todays-focus">
          <h3>🎯 Today's Focus</h3>
          <div className="focus-suggestions">
            {checklist.size === 0 && (
              <div className="focus-item">
                <span>⭐</span>
                <span>Start with your daily checklist</span>
              </div>
            )}
            {!challengeCompleted && (
              <div className="focus-item">
                <span>🧠</span>
                <span>Complete your daily challenge</span>
              </div>
            )}
            {progress?.progress?.totalPoints < 100 && (
              <div className="focus-item">
                <span>🚀</span>
                <span>Explore the Knowledge Hub to earn points</span>
              </div>
            )}
            <div className="focus-item">
              <span>📧</span>
              <span>Check for new client briefs and respond promptly</span>
            </div>
            <div className="focus-item">
              <span>📈</span>
              <span>Review campaign performance and optimize if needed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Notification */}
      {progress?.progress?.currentStreak >= 3 && (
        <div className="achievement-notification">
          <div className="achievement-content">
            <span className="achievement-icon">🔥</span>
            <div>
              <strong>Hot Streak!</strong>
              <span>{progress.progress.currentStreak} days of daily challenges completed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyOperations