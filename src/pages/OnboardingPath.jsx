import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const OnboardingPath = ({ progress, updateProgress }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())

  // Onboarding steps
  const onboardingSteps = [
    {
      id: 'welcome',
      title: 'Welcome to Programmatic 101! 🚀',
      description: 'Your complete journey from 0 to programmatic independence in 3 months',
      content: (
        <div className="welcome-content">
          <div className="welcome-hero">
            <h1>Ready to master programmatic advertising?</h1>
            <p>This interactive learning platform will guide you through everything you need to know as a Junior Programmatic Specialist. From understanding basic concepts to handling real client briefs.</p>
            
            <div className="welcome-stats">
              <div className="stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">Key Concepts</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">20+</span>
                <span className="stat-label">Decision Trees</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">10+</span>
                <span className="stat-label">Achievements</span>
              </div>
            </div>
          </div>
        </div>
      ),
      action: 'Start Learning'
    },
    {
      id: 'ecosystem',
      title: 'Understanding Your Role 👥',
      description: 'Learn how you fit into the programmatic ecosystem',
      content: (
        <div className="step-content">
          <h2>Your Team & Workflow</h2>
          <div className="ecosystem-diagram">
            <div className="role-card your-role">
              <span className="role-icon">🎯</span>
              <h3>You: Junior Programmatic Specialist</h3>
              <p>Bridge between strategy and execution</p>
            </div>
            
            <div className="workflow-steps">
              <div className="workflow-step">
                <span className="step-number">1</span>
                <div className="step-info">
                  <h4>Brief Analysis</h4>
                  <p>Receive briefs from Client Service team</p>
                </div>
              </div>
              <div className="workflow-step">
                <span className="step-number">2</span>
                <div className="step-info">
                  <h4>Response & Recommendations</h4>
                  <p>Ask clarifying questions, propose solutions</p>
                </div>
              </div>
              <div className="workflow-step">
                <span className="step-number">3</span>
                <div className="step-info">
                  <h4>Setup & Optimization</h4>
                  <p>Configure campaigns in DV360</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      action: 'Understand My Role'
    },
    {
      id: 'knowledge-preview',
      title: 'Essential Knowledge Areas 📚',
      description: 'Preview what you\'ll master in the coming weeks',
      content: (
        <div className="step-content">
          <h2>Top 10 Must-Master Concepts</h2>
          <div className="knowledge-grid">
            {[
              { icon: '📊', title: 'Key Metrics', desc: 'CPM, CTR, viewability' },
              { icon: '🔤', title: 'Industry Acronyms', desc: 'DSP, SSP, DMP, RTB' },
              { icon: '🛒', title: 'Marketplace', desc: 'Open vs Private' },
              { icon: '👀', title: 'Viewability', desc: 'MRC standards' },
              { icon: '🎯', title: 'Attribution', desc: 'View vs Click-through' },
              { icon: '👥', title: 'Audiences', desc: 'Management & overlap' },
              { icon: '💰', title: 'Bid Strategies', desc: 'Target CPM vs Max Lifts' },
              { icon: '📈', title: 'Incrementality', desc: 'Vs baseline performance' },
              { icon: '🔄', title: 'Frequency Capping', desc: 'Strategic implementation' },
              { icon: '🛡️', title: 'Brand Safety', desc: 'Protection protocols' }
            ].map((item, index) => (
              <div key={index} className="knowledge-card">
                <span className="knowledge-icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
      action: 'Explore Knowledge Hub'
    },
    {
      id: 'tools-preview',
      title: 'Your Learning Tools 🛠️',
      description: 'Discover the interactive features that will help you learn',
      content: (
        <div className="step-content">
          <h2>How You'll Learn</h2>
          <div className="tools-showcase">
            <div className="tool-feature">
              <div className="tool-icon">💡</div>
              <div className="tool-info">
                <h3>Interactive Decision Trees</h3>
                <p>Step-by-step guidance for real scenarios like budget allocation and format selection</p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="tool-icon">🃏</div>
              <div className="tool-info">
                <h3>Knowledge Flip Cards</h3>
                <p>Learn definitions, examples, and real-world applications</p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="tool-icon">📝</div>
              <div className="tool-info">
                <h3>Template Library</h3>
                <p>Ready-to-use email responses and communication frameworks</p>
              </div>
            </div>
            <div className="tool-feature">
              <div className="tool-icon">🏆</div>
              <div className="tool-info">
                <h3>Achievement System</h3>
                <p>Earn badges as you master each concept and complete challenges</p>
              </div>
            </div>
          </div>
        </div>
      ),
      action: 'See All Tools'
    },
    {
      id: 'first-achievement',
      title: 'Earn Your First Achievement! 🏆',
      description: 'Complete the onboarding to unlock the "Journey Starter" badge',
      content: (
        <div className="step-content">
          <div className="achievement-showcase">
            <div className="achievement-badge large">
              <span className="badge-icon">🚀</span>
              <div className="badge-info">
                <h3>Journey Starter</h3>
                <p>Completed the onboarding path</p>
                <div className="badge-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '100%' }}></div>
                  </div>
                  <span>Ready to unlock!</span>
                </div>
              </div>
            </div>
            
            <div className="next-achievements">
              <h4>Next Achievements to Unlock:</h4>
              <div className="achievement-list">
                <div className="achievement-item locked">
                  <span>🔍</span>
                  <span>Brief Detective</span>
                </div>
                <div className="achievement-item locked">
                  <span>🎯</span>
                  <span>Format Strategist</span>
                </div>
                <div className="achievement-item locked">
                  <span>💰</span>
                  <span>Budget Whisperer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      action: 'Claim Achievement'
    }
  ]

  // Check if user has completed onboarding before
  useEffect(() => {
    if (progress?.progress?.completedSections?.includes('onboarding-complete')) {
      setCurrentStep(onboardingSteps.length - 1)
      setCompletedSteps(new Set(onboardingSteps.map((_, index) => index)))
    }
  }, [progress])

  const completeStep = (stepIndex) => {
    const newCompleted = new Set(completedSteps)
    newCompleted.add(stepIndex)
    setCompletedSteps(newCompleted)

    // Award achievement on final step
    if (stepIndex === onboardingSteps.length - 1) {
      awardJourneyStarterAchievement()
    }
  }

  const awardJourneyStarterAchievement = () => {
    if (!progress) return

    const newProgress = { ...progress }
    
    // Add achievement if not already earned
    if (!newProgress.progress.achievementsBadges.includes('journey-starter')) {
      newProgress.progress.achievementsBadges.push('journey-starter')
      newProgress.progress.totalPoints += 100
      newProgress.progress.completedSections.push('onboarding-complete')
    }

    updateProgress(newProgress)
  }

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      completeStep(currentStep)
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = onboardingSteps[currentStep]

  return (
    <div className="page onboarding-page">
      {/* Progress indicator */}
      <div className="onboarding-progress">
        <div className="progress-header">
          <h2>Onboarding Progress</h2>
          <span className="step-counter">
            Step {currentStep + 1} of {onboardingSteps.length}
          </span>
        </div>
        <div className="progress-steps">
          {onboardingSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`progress-step ${
                index === currentStep ? 'active' : 
                completedSteps.has(index) ? 'completed' : 'upcoming'
              }`}
            >
              <div className="step-circle">
                {completedSteps.has(index) ? '✓' : index + 1}
              </div>
              <span className="step-title">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current step content */}
      <div className="step-container">
        <div className="step-header">
          <h1 className="step-title">{currentStepData.title}</h1>
          <p className="step-description">{currentStepData.description}</p>
        </div>

        <div className="step-body">
          {currentStepData.content}
        </div>

        <div className="step-actions">
          {currentStep > 0 && (
            <button 
              className="btn btn-secondary"
              onClick={prevStep}
            >
              ← Previous
            </button>
          )}

          <div className="main-action">
            {currentStep === onboardingSteps.length - 1 ? (
              <div className="completion-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    completeStep(currentStep)
                    awardJourneyStarterAchievement()
                  }}
                  disabled={completedSteps.has(currentStep)}
                >
                  {completedSteps.has(currentStep) ? '✓ Achievement Unlocked!' : 'Complete Onboarding'}
                </button>
                
                {completedSteps.has(currentStep) && (
                  <div className="next-step-suggestions">
                    <p>Great! Now choose your next step:</p>
                    <div className="suggestion-links">
                      <Link to="/knowledge" className="suggestion-link">
                        <span>📚</span>
                        Start Learning Core Concepts
                      </Link>
                      <Link to="/decisions" className="suggestion-link">
                        <span>🧭</span>
                        Practice Decision Making
                      </Link>
                      <Link to="/templates" className="suggestion-link">
                        <span>📝</span>
                        Browse Email Templates
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="btn btn-primary"
                onClick={nextStep}
              >
                {currentStepData.action} →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPath