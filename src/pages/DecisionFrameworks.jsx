import React, { useState, useEffect } from 'react'

const DecisionFrameworks = ({ progress, updateProgress }) => {
  const [activeFramework, setActiveFramework] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [completedFrameworks, setCompletedFrameworks] = useState(new Set())
  const [recommendations, setRecommendations] = useState(null)

  // Decision Framework definitions
  const decisionFrameworks = [
    {
      id: 'budget-allocation',
      title: 'Budget & Channel Allocation',
      icon: '💰',
      description: 'Determine optimal budget split and channel selection based on campaign goals and available budget',
      difficulty: 'intermediate',
      estimatedTime: '5-10 minutes',
      category: 'strategy',
      steps: [
        {
          id: 'campaign-goal',
          question: 'What is the primary campaign objective?',
          type: 'single-choice',
          options: [
            { id: 'awareness', label: 'Brand Awareness', description: 'Increase brand recognition and visibility' },
            { id: 'consideration', label: 'Consideration', description: 'Drive interest and engagement' },
            { id: 'performance', label: 'Performance/Conversions', description: 'Generate specific actions or sales' },
            { id: 'remarketing', label: 'Remarketing', description: 'Re-engage previous visitors' }
          ]
        },
        {
          id: 'total-budget',
          question: 'What is the total monthly budget?',
          type: 'single-choice',
          options: [
            { id: 'small', label: 'Under 20,000 PLN', description: 'Limited budget requiring focused approach' },
            { id: 'medium', label: '20,000 - 50,000 PLN', description: 'Moderate budget allowing multi-channel' },
            { id: 'large', label: '50,000 - 100,000 PLN', description: 'Substantial budget for comprehensive strategy' },
            { id: 'enterprise', label: 'Over 100,000 PLN', description: 'Enterprise budget enabling premium formats' }
          ]
        },
        {
          id: 'creative-assets',
          question: 'What creative assets are available?',
          type: 'multiple-choice',
          options: [
            { id: 'display-static', label: 'Static Display Banners', description: 'Standard banner formats' },
            { id: 'display-rich', label: 'Rich Media Display', description: 'Interactive banners with animations' },
            { id: 'video-6s', label: '6-second Video Spots', description: 'Bumper ads for YouTube' },
            { id: 'video-15s', label: '15-second Video Spots', description: 'Short form video content' },
            { id: 'video-30s', label: '30-second Video Spots', description: 'Standard video advertisements' },
            { id: 'audio', label: 'Audio Creative', description: 'Radio-style advertisements' }
          ]
        },
        {
          id: 'target-audience',
          question: 'How would you describe the target audience?',
          type: 'single-choice',
          options: [
            { id: 'broad', label: 'Broad Audience', description: 'Wide demographic targeting' },
            { id: 'specific', label: 'Specific Demographics', description: 'Targeted age/gender/interests' },
            { id: 'niche', label: 'Niche Audience', description: 'Highly specific professional/interest groups' },
            { id: 'custom', label: 'Custom Audiences', description: 'Based on client data or past behavior' }
          ]
        }
      ]
    },
    {
      id: 'brief-analysis',
      title: 'Brief Analysis & Gap Identification',
      icon: '🔍',
      description: 'Systematically analyze client briefs to identify missing information and ask the right questions',
      difficulty: 'basic',
      estimatedTime: '3-5 minutes',
      category: 'communication',
      steps: [
        {
          id: 'brief-completeness',
          question: 'Review the brief - what information is provided?',
          type: 'multiple-choice',
          options: [
            { id: 'budget-total', label: 'Total Campaign Budget', description: 'Overall budget amount specified' },
            { id: 'budget-channels', label: 'Budget per Channel', description: 'Distribution across channels defined' },
            { id: 'timeline', label: 'Campaign Timeline', description: 'Start/end dates and flight schedule' },
            { id: 'kpis', label: 'Success Metrics/KPIs', description: 'Clear performance indicators defined' },
            { id: 'audience', label: 'Target Audience', description: 'Demographics and targeting criteria' },
            { id: 'creative-specs', label: 'Creative Specifications', description: 'Available formats and assets' },
            { id: 'transparency', label: 'Client Transparency Preference', description: 'Open vs non-transparent buying' },
            { id: 'exclusions', label: 'Brand Safety Requirements', description: 'Blacklists and content restrictions' }
          ]
        },
        {
          id: 'critical-gaps',
          question: 'Based on missing information, what are the critical gaps?',
          type: 'auto-generated',
          logic: 'based-on-previous-answers'
        },
        {
          id: 'question-priority',
          question: 'Rank these follow-up questions by priority:',
          type: 'ranking',
          options: [
            { id: 'budget-split', label: 'How should budget be allocated across channels?' },
            { id: 'success-metrics', label: 'What does success look like for this campaign?' },
            { id: 'audience-data', label: 'Do you have first-party audience data available?' },
            { id: 'creative-timeline', label: 'When will creative assets be ready?' },
            { id: 'transparency-preference', label: 'What is your transparency preference?' },
            { id: 'reporting-frequency', label: 'How often would you like performance reports?' }
          ]
        }
      ]
    },
    {
      id: 'format-selection',
      title: 'Creative Format Selection',
      icon: '🎨',
      description: 'Choose optimal creative formats based on budget, goals, and available assets',
      difficulty: 'intermediate',
      estimatedTime: '5-8 minutes',
      category: 'creative',
      steps: [
        {
          id: 'campaign-type',
          question: 'What type of campaign are you planning?',
          type: 'single-choice',
          options: [
            { id: 'awareness', label: 'Brand Awareness', description: 'Focus on reach and impressions' },
            { id: 'engagement', label: 'Engagement', description: 'Drive interaction and consideration' },
            { id: 'performance', label: 'Performance', description: 'Optimize for conversions' },
            { id: 'video-first', label: 'Video-Centric', description: 'Video is the primary medium' }
          ]
        },
        {
          id: 'budget-range',
          question: 'What is the display/video budget range?',
          type: 'single-choice',
          options: [
            { id: 'basic', label: 'Under 25,000 PLN', description: 'Standard formats recommended' },
            { id: 'enhanced', label: '25,000 - 75,000 PLN', description: 'Rich media options available' },
            { id: 'premium', label: 'Over 75,000 PLN', description: 'Premium and innovative formats viable' }
          ]
        },
        {
          id: 'platform-preference',
          question: 'Are there specific platform requirements?',
          type: 'multiple-choice',
          options: [
            { id: 'youtube', label: 'YouTube', description: 'Google video network' },
            { id: 'display-network', label: 'Google Display Network', description: 'Standard display placements' },
            { id: 'premium-video', label: 'Premium Video (Teads)', description: 'High-quality video placements' },
            { id: 'dooh', label: 'Digital Out-of-Home', description: 'Physical digital advertising' },
            { id: 'audio', label: 'Audio/Spotify', description: 'Audio advertising platforms' }
          ]
        }
      ]
    },
    {
      id: 'client-communication',
      title: 'Client Communication Strategy',
      icon: '💬',
      description: 'Determine the best communication approach based on client type and situation complexity',
      difficulty: 'basic',
      estimatedTime: '3-5 minutes',
      category: 'communication',
      steps: [
        {
          id: 'client-experience',
          question: 'What is the client\'s programmatic experience level?',
          type: 'single-choice',
          options: [
            { id: 'beginner', label: 'New to Programmatic', description: 'Limited technical knowledge' },
            { id: 'intermediate', label: 'Some Experience', description: 'Basic understanding of concepts' },
            { id: 'advanced', label: 'Experienced', description: 'Strong technical knowledge' },
            { id: 'expert', label: 'Very Technical', description: 'Deep programmatic expertise' }
          ]
        },
        {
          id: 'communication-urgency',
          question: 'What is the urgency level of this communication?',
          type: 'single-choice',
          options: [
            { id: 'routine', label: 'Routine Update', description: 'Standard progress communication' },
            { id: 'clarification', label: 'Needs Clarification', description: 'Missing information required' },
            { id: 'issue', label: 'Issue Resolution', description: 'Problem needs addressing' },
            { id: 'urgent', label: 'Urgent Response', description: 'Time-sensitive matter' }
          ]
        },
        {
          id: 'complexity-level',
          question: 'How complex is the topic you need to explain?',
          type: 'single-choice',
          options: [
            { id: 'simple', label: 'Simple Update', description: 'Basic status or confirmation' },
            { id: 'moderate', label: 'Moderate Complexity', description: 'Some technical concepts involved' },
            { id: 'complex', label: 'Complex Technical', description: 'Detailed technical explanation needed' },
            { id: 'strategic', label: 'Strategic Decision', description: 'High-level strategic discussion' }
          ]
        }
      ]
    }
  ]

  // Load completed frameworks from progress
  useEffect(() => {
    if (progress?.progress?.completedSections) {
      const completed = new Set(
        progress.progress.completedSections
          .filter(section => section.startsWith('framework-'))
          .map(section => section.replace('framework-', ''))
      )
      setCompletedFrameworks(completed)
    }
  }, [progress])

  // Start framework
  const startFramework = (frameworkId) => {
    setActiveFramework(frameworkId)
    setCurrentStep(0)
    setAnswers({})
    setRecommendations(null)
  }

  // Handle answer selection
  const handleAnswer = (stepId, answer) => {
    const newAnswers = { ...answers, [stepId]: answer }
    setAnswers(newAnswers)
  }

  // Navigate steps
  const nextStep = () => {
    const framework = decisionFrameworks.find(f => f.id === activeFramework)
    if (currentStep < framework.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      generateRecommendations()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Generate recommendations based on answers
  const generateRecommendations = () => {
    const framework = decisionFrameworks.find(f => f.id === activeFramework)
    let recs = {}

    if (framework.id === 'budget-allocation') {
      recs = generateBudgetRecommendations()
    } else if (framework.id === 'brief-analysis') {
      recs = generateBriefAnalysisRecommendations()
    } else if (framework.id === 'format-selection') {
      recs = generateFormatRecommendations()
    } else if (framework.id === 'client-communication') {
      recs = generateCommunicationRecommendations()
    }

    setRecommendations(recs)
    markFrameworkCompleted()
  }

  // Budget allocation logic
  const generateBudgetRecommendations = () => {
    const goal = answers['campaign-goal']
    const budget = answers['total-budget']
    const creatives = answers['creative-assets'] || []
    const audience = answers['target-audience']

    let channels = []
    let reasoning = []

    // Channel selection based on goal and budget
    if (goal === 'awareness') {
      if (budget === 'large' || budget === 'enterprise') {
        channels.push('Display (40%)', 'Video (35%)', 'YouTube (25%)')
        reasoning.push('Awareness campaigns benefit from video reach')
      } else {
        channels.push('Display (60%)', 'Video (40%)')
        reasoning.push('Cost-effective awareness through display + video support')
      }
    } else if (goal === 'performance') {
      channels.push('Display (70%)', 'Remarketing (30%)')
      reasoning.push('Performance focus on display with remarketing support')
    }

    // Format recommendations
    let formats = []
    if (creatives.includes('video-30s') && (budget === 'large' || budget === 'enterprise')) {
      formats.push('YouTube Efficient Reach', 'Premium Video (Teads)')
    }
    if (creatives.includes('display-rich') && budget !== 'small') {
      formats.push('Rich Media Display')
    } else if (creatives.includes('display-static')) {
      formats.push('Standard Display Banners')
    }

    // Budget-specific recommendations
    let budgetAdvice = []
    if (budget === 'enterprise' && goal === 'awareness') {
      budgetAdvice.push('Consider DOOH for premium brand presence')
      budgetAdvice.push('Rich Media formats will maximize impact')
    }

    return {
      channels,
      formats,
      reasoning,
      budgetAdvice,
      nextSteps: [
        'Confirm creative asset availability and timeline',
        'Set up DV360 line items with recommended allocation',
        'Implement brand safety and frequency capping'
      ]
    }
  }

  // Brief analysis logic
  const generateBriefAnalysisRecommendations = () => {
    const provided = answers['brief-completeness'] || []
    const missing = [
      'budget-total', 'budget-channels', 'timeline', 'kpis', 
      'audience', 'creative-specs', 'transparency', 'exclusions'
    ].filter(item => !provided.includes(item))

    const criticalGaps = missing.map(gap => {
      const labels = {
        'budget-total': 'Total campaign budget',
        'budget-channels': 'Budget allocation per channel',
        'timeline': 'Campaign timeline and flight schedule',
        'kpis': 'Success metrics and KPIs',
        'audience': 'Target audience specifications',
        'creative-specs': 'Available creative assets',
        'transparency': 'Transparency preference',
        'exclusions': 'Brand safety requirements'
      }
      return labels[gap]
    })

    const priorityQuestions = criticalGaps.slice(0, 3).map(gap => `Clarify ${gap.toLowerCase()}`)

    return {
      missingInfo: criticalGaps,
      priorityQuestions,
      reasoning: [
        'Budget information is critical for channel selection',
        'Timeline affects campaign setup urgency',
        'KPIs determine optimization strategy'
      ],
      nextSteps: [
        'Draft follow-up email with priority questions',
        'Schedule clarification call if multiple gaps exist',
        'Provide preliminary recommendations with assumptions'
      ]
    }
  }

  // Format selection logic
  const generateFormatRecommendations = () => {
    const campaignType = answers['campaign-type']
    const budget = answers['budget-range']
    const platforms = answers['platform-preference'] || []

    let recommendedFormats = []
    let reasoning = []

    if (campaignType === 'awareness') {
      if (budget === 'premium') {
        recommendedFormats.push('Rich Media Display', 'Premium Video', 'YouTube Efficient Reach')
        reasoning.push('Premium budget enables high-impact formats')
      } else {
        recommendedFormats.push('Standard Display', 'YouTube Video')
        reasoning.push('Cost-effective awareness through proven formats')
      }
    }

    if (platforms.includes('youtube')) {
      recommendedFormats.push('YouTube TrueView', 'YouTube Bumper Ads')
    }

    return {
      recommendedFormats,
      reasoning,
      budgetOptimization: budget === 'premium' ? 
        'Leverage premium formats for maximum impact' :
        'Focus on cost-efficient standard formats',
      nextSteps: [
        'Confirm creative specifications with client',
        'Set up test campaigns with recommended formats',
        'Plan A/B testing strategy'
      ]
    }
  }

  // Communication strategy logic
  const generateCommunicationRecommendations = () => {
    const experience = answers['client-experience']
    const urgency = answers['communication-urgency']
    const complexity = answers['complexity-level']

    let tone = 'friendly and professional'
    let structure = []
    let tips = []

    if (experience === 'beginner') {
      tone = 'friendly, educational, avoid jargon'
      tips.push('Explain technical terms in simple language')
      tips.push('Include links to helpful resources')
    } else if (experience === 'expert') {
      tone = 'professional, technical details welcome'
      tips.push('Use industry terminology confidently')
      tips.push('Focus on strategic implications')
    }

    if (urgency === 'urgent') {
      structure.push('Lead with key issue/decision needed')
      structure.push('Provide clear action items')
      structure.push('Include timeline expectations')
    } else {
      structure.push('Brief context setting')
      structure.push('Main content/recommendations')
      structure.push('Next steps and timeline')
    }

    return {
      recommendedTone: tone,
      emailStructure: structure,
      communicationTips: tips,
      templateSuggestion: urgency === 'urgent' ? 'Urgent Response Template' : 'Standard Update Template',
      nextSteps: [
        'Draft email using recommended structure',
        'Review tone for client experience level',
        'Include appropriate technical detail level'
      ]
    }
  }

  // Mark framework as completed
  const markFrameworkCompleted = () => {
    if (!progress) return

    const newCompleted = new Set(completedFrameworks)
    newCompleted.add(activeFramework)
    setCompletedFrameworks(newCompleted)

    // Update progress
    const newProgress = { ...progress }
    const sectionId = `framework-${activeFramework}`
    
    if (!newProgress.progress.completedSections.includes(sectionId)) {
      newProgress.progress.completedSections.push(sectionId)
      newProgress.progress.totalPoints += 100
      
      // Check for achievements
      if (newCompleted.size >= 2 && !newProgress.progress.achievementsBadges.includes('decision-maker')) {
        newProgress.progress.achievementsBadges.push('decision-maker')
        newProgress.progress.totalPoints += 300
      }
    }

    updateProgress(newProgress)
  }

  // Reset framework
  const resetFramework = () => {
    setActiveFramework(null)
    setCurrentStep(0)
    setAnswers({})
    setRecommendations(null)
  }

  const currentFramework = decisionFrameworks.find(f => f.id === activeFramework)
  const currentStepData = currentFramework?.steps[currentStep]
  const canProceed = currentStepData && answers[currentStepData.id]

  return (
    <div className="page decision-frameworks-page">
      {!activeFramework ? (
        <>
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Decision Frameworks 🧭</h1>
            <p className="page-subtitle">
              Step-by-step guidance for common programmatic decisions. 
              Each framework helps you think through complex scenarios systematically.
            </p>
          </div>

          {/* Progress Overview */}
          <div className="frameworks-progress">
            <div className="progress-stat">
              <span className="stat-number">{completedFrameworks.size}</span>
              <span className="stat-label">Frameworks Completed</span>
            </div>
            <div className="progress-stat">
              <span className="stat-number">{Math.round((completedFrameworks.size / decisionFrameworks.length) * 100)}%</span>
              <span className="stat-label">Decision Mastery</span>
            </div>
          </div>

          {/* Framework Grid */}
          <div className="frameworks-grid">
            {decisionFrameworks.map(framework => (
              <div
                key={framework.id}
                className={`framework-card ${completedFrameworks.has(framework.id) ? 'completed' : ''}`}
              >
                <div className="framework-header">
                  <div className="framework-icon">{framework.icon}</div>
                  <div className="framework-meta">
                    <span className={`difficulty-badge ${framework.difficulty}`}>
                      {framework.difficulty}
                    </span>
                    <span className="time-estimate">{framework.estimatedTime}</span>
                  </div>
                  {completedFrameworks.has(framework.id) && (
                    <div className="completion-badge">✓</div>
                  )}
                </div>

                <div className="framework-content">
                  <h3 className="framework-title">{framework.title}</h3>
                  <p className="framework-description">{framework.description}</p>
                  
                  <div className="framework-details">
                    <div className="detail-item">
                      <span className="detail-label">Steps:</span>
                      <span className="detail-value">{framework.steps.length}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Category:</span>
                      <span className="detail-value">{framework.category}</span>
                    </div>
                  </div>
                </div>

                <div className="framework-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => startFramework(framework.id)}
                  >
                    {completedFrameworks.has(framework.id) ? 'Retake Framework' : 'Start Framework'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="framework-active">
          {/* Framework Header */}
          <div className="active-framework-header">
            <button className="back-btn" onClick={resetFramework}>
              ← Back to Frameworks
            </button>
            <div className="framework-info">
              <h1>{currentFramework.icon} {currentFramework.title}</h1>
              <div className="step-progress">
                Step {currentStep + 1} of {currentFramework.steps.length}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="step-progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentStep + 1) / currentFramework.steps.length) * 100}%` }}
            ></div>
          </div>

          {!recommendations ? (
            /* Current Step */
            <div className="current-step">
              <div className="step-content">
                <h2 className="step-question">{currentStepData.question}</h2>
                
                {currentStepData.type === 'single-choice' && (
                  <div className="options single-choice">
                    {currentStepData.options.map(option => (
                      <label
                        key={option.id}
                        className={`option-card ${answers[currentStepData.id] === option.id ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={currentStepData.id}
                          value={option.id}
                          checked={answers[currentStepData.id] === option.id}
                          onChange={() => handleAnswer(currentStepData.id, option.id)}
                        />
                        <div className="option-content">
                          <span className="option-label">{option.label}</span>
                          <span className="option-description">{option.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}

                {currentStepData.type === 'multiple-choice' && (
                  <div className="options multiple-choice">
                    {currentStepData.options.map(option => (
                      <label
                        key={option.id}
                        className={`option-card ${(answers[currentStepData.id] || []).includes(option.id) ? 'selected' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={(answers[currentStepData.id] || []).includes(option.id)}
                          onChange={(e) => {
                            const current = answers[currentStepData.id] || []
                            const newValue = e.target.checked
                              ? [...current, option.id]
                              : current.filter(id => id !== option.id)
                            handleAnswer(currentStepData.id, newValue)
                          }}
                        />
                        <div className="option-content">
                          <span className="option-label">{option.label}</span>
                          <span className="option-description">{option.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="step-navigation">
                {currentStep > 0 && (
                  <button className="btn btn-secondary" onClick={prevStep}>
                    ← Previous
                  </button>
                )}
                
                <div className="nav-main">
                  <button
                    className="btn btn-primary"
                    onClick={nextStep}
                    disabled={!canProceed}
                  >
                    {currentStep === currentFramework.steps.length - 1 ? 'Get Recommendations' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Recommendations */
            <div className="recommendations">
              <div className="recommendations-header">
                <h2>📋 Your Personalized Recommendations</h2>
                <p>Based on your answers, here's what we recommend:</p>
              </div>

              <div className="recommendations-content">
                {recommendations.channels && (
                  <div className="recommendation-section">
                    <h3>🎯 Recommended Channels</h3>
                    <ul>
                      {recommendations.channels.map((channel, index) => (
                        <li key={index}>{channel}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {recommendations.formats && (
                  <div className="recommendation-section">
                    <h3>🎨 Recommended Formats</h3>
                    <ul>
                      {recommendations.formats.map((format, index) => (
                        <li key={index}>{format}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {recommendations.reasoning && (
                  <div className="recommendation-section">
                    <h3>💡 Reasoning</h3>
                    <ul>
                      {recommendations.reasoning.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {recommendations.nextSteps && (
                  <div className="recommendation-section">
                    <h3>🚀 Next Steps</h3>
                    <ol>
                      {recommendations.nextSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              <div className="recommendations-actions">
                <button className="btn btn-secondary" onClick={resetFramework}>
                  Try Another Framework
                </button>
                <button className="btn btn-primary" onClick={() => {
                  // Could integrate with template library here
                  alert('Feature coming soon: Export recommendations to email template')
                }}>
                  Export to Template
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DecisionFrameworks