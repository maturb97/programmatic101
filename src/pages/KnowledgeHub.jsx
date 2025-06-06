import React, { useState, useEffect } from 'react'

const KnowledgeHub = ({ progress, updateProgress }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [flippedCards, setFlippedCards] = useState(new Set())
  const [viewMode, setViewMode] = useState('grid') // grid | list
  const [completedCards, setCompletedCards] = useState(new Set())

  // Knowledge base data
  const knowledgeCategories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 0 },
    { id: 'metrics', name: 'Key Metrics', icon: '📊', count: 8 },
    { id: 'platforms', name: 'Platforms & Tools', icon: '🛠️', count: 6 },
    { id: 'strategy', name: 'Strategy & Planning', icon: '🎯', count: 7 },
    { id: 'optimization', name: 'Optimization', icon: '⚡', count: 5 },
    { id: 'communication', name: 'Client Communication', icon: '💬', count: 4 }
  ]

  const knowledgeCards = [
    // Key Metrics
    {
      id: 'cpm',
      category: 'metrics',
      title: 'CPM (Cost Per Mille)',
      difficulty: 'basic',
      front: {
        icon: '💰',
        subtitle: 'Essential pricing metric',
        description: 'The foundation of programmatic pricing',
        keyPoints: ['Per 1000 impressions', 'Budget planning', 'Performance comparison']
      },
      back: {
        definition: 'Cost Per Mille (CPM) is the amount an advertiser pays for 1,000 ad impressions.',
        formula: 'CPM = (Total Cost / Total Impressions) × 1,000',
        example: 'Campaign cost: 10,000 PLN, Impressions: 2,500,000 → CPM = (10,000 / 2,500,000) × 1,000 = 4 PLN',
        realWorld: 'Display CPM typically ranges 8-15 PLN, Video 15-30 PLN in Polish market',
        tips: [
          'Lower CPM ≠ better performance',
          'Consider viewability with CPM',
          'Benchmark against industry standards'
        ],
        relatedTerms: ['CTR', 'CPC', 'Viewability']
      }
    },
    {
      id: 'ctr',
      category: 'metrics',
      title: 'CTR (Click-Through Rate)',
      difficulty: 'basic',
      front: {
        icon: '👆',
        subtitle: 'Engagement measurement',
        description: 'Measures ad interaction effectiveness',
        keyPoints: ['Engagement indicator', 'Creative performance', 'Audience relevance']
      },
      back: {
        definition: 'Click-Through Rate (CTR) measures the percentage of people who click on an ad after seeing it.',
        formula: 'CTR = (Total Clicks / Total Impressions) × 100',
        example: 'Ad served 500,000 times, clicked 1,500 times → CTR = (1,500 / 500,000) × 100 = 0.3%',
        realWorld: 'Display CTR benchmark: 0.05-0.15%, Video: 0.15-0.30%',
        tips: [
          'Higher CTR often means better targeting',
          'Test different creative formats',
          'Monitor CTR trends over time'
        ],
        relatedTerms: ['CPM', 'CPC', 'Engagement Rate']
      }
    },
    {
      id: 'viewability',
      category: 'metrics',
      title: 'Viewability Standards',
      difficulty: 'intermediate',
      front: {
        icon: '👀',
        subtitle: 'MRC measurement standards',
        description: 'Ensures ads are actually seen',
        keyPoints: ['50% pixel visibility', 'Time requirements', 'Quality measurement']
      },
      back: {
        definition: 'Viewability measures whether an ad had the opportunity to be seen by a user.',
        formula: 'Display: 50% of pixels visible for 1+ second, Video: 50% of pixels visible for 2+ seconds',
        example: 'Campaign with 70% viewability means 70% of impressions met MRC standards',
        realWorld: 'Industry average: 60-75% viewability. Premium placements achieve 80%+',
        tips: [
          'Above-the-fold placements perform better',
          'Mobile viewability often lower',
          'Monitor by placement and format'
        ],
        relatedTerms: ['MRC Standards', 'Above-the-fold', 'CPM']
      }
    },
    // Platforms & Tools
    {
      id: 'dv360',
      category: 'platforms',
      title: 'Google DV360',
      difficulty: 'intermediate',
      front: {
        icon: '🎯',
        subtitle: 'Primary DSP platform',
        description: 'Your main campaign management tool',
        keyPoints: ['Campaign setup', 'Optimization', 'Reporting']
      },
      back: {
        definition: 'Display & Video 360 (DV360) is Google\'s demand-side platform for programmatic advertising.',
        formula: 'DSP = Demand-Side Platform for automated media buying',
        example: 'Create line items, set targeting, manage budgets, optimize performance',
        realWorld: 'Primary platform for all campaign setup and management at our agency',
        tips: [
          'Master line item structure',
          'Understand bidding strategies',
          'Use proper naming conventions'
        ],
        relatedTerms: ['DSP', 'Line Items', 'Campaign Manager']
      }
    },
    {
      id: 'dsp-ssp',
      category: 'platforms',
      title: 'DSP vs SSP',
      difficulty: 'basic',
      front: {
        icon: '🔄',
        subtitle: 'Programmatic ecosystem',
        description: 'Buy-side vs sell-side platforms',
        keyPoints: ['Advertiser tools', 'Publisher tools', 'Marketplace connection']
      },
      back: {
        definition: 'DSP (Demand-Side Platform) for advertisers, SSP (Supply-Side Platform) for publishers.',
        formula: 'Advertisers use DSP → RTB Auction ← Publishers use SSP',
        example: 'We use DV360 (DSP) to buy inventory from publishers using SSPs like Google Ad Manager',
        realWorld: 'DSPs and SSPs connect in real-time auctions happening billions of times daily',
        tips: [
          'DSP = where you buy ads',
          'SSP = where publishers sell inventory',
          'They communicate via RTB protocols'
        ],
        relatedTerms: ['RTB', 'Programmatic', 'Ad Exchange']
      }
    },
    // Strategy & Planning
    {
      id: 'attribution',
      category: 'strategy',
      title: 'Attribution Models',
      difficulty: 'intermediate',
      front: {
        icon: '🎯',
        subtitle: 'Conversion tracking',
        description: 'How to measure campaign impact',
        keyPoints: ['View-through', 'Click-through', 'Credit assignment']
      },
      back: {
        definition: 'Attribution models determine how conversion credit is assigned to different touchpoints.',
        formula: 'Last-click, First-click, Linear, Time-decay, Position-based models',
        example: 'User sees display ad, clicks search ad, converts → which channel gets credit?',
        realWorld: 'Most awareness campaigns use view-through attribution with 1-30 day windows',
        tips: [
          'Choose model based on campaign goals',
          'View-through for awareness campaigns',
          'Click-through for performance campaigns'
        ],
        relatedTerms: ['Conversion', 'Touchpoint', 'Customer Journey']
      }
    },
    {
      id: 'frequency-capping',
      category: 'strategy',
      title: 'Frequency Capping',
      difficulty: 'basic',
      front: {
        icon: '🔄',
        subtitle: 'Impression management',
        description: 'Control ad exposure per user',
        keyPoints: ['User experience', 'Budget efficiency', 'Ad fatigue prevention']
      },
      back: {
        definition: 'Frequency capping limits how many times the same user sees your ad within a time period.',
        formula: 'Standard: 3-5 impressions per user per month for awareness campaigns',
        example: 'Set 4 impressions per user per month to avoid ad fatigue while maintaining reach',
        realWorld: 'Too high frequency = waste budget, too low = insufficient impact',
        tips: [
          'Awareness: 3-5 per month',
          'Performance: 10-15 per month',
          'Monitor frequency vs performance correlation'
        ],
        relatedTerms: ['Reach', 'Impressions', 'Ad Fatigue']
      }
    },
    // Optimization
    {
      id: 'bid-strategies',
      category: 'optimization',
      title: 'Bid Strategies',
      difficulty: 'intermediate',
      front: {
        icon: '💡',
        subtitle: 'Automated optimization',
        description: 'How DV360 optimizes your bids',
        keyPoints: ['Target CPM', 'Maximize Conversions', 'Performance goals']
      },
      back: {
        definition: 'Bid strategies automate bidding based on your campaign goals and constraints.',
        formula: 'Target CPM = Fixed cost, Maximize Conversions = Performance-based',
        example: 'Awareness campaign: Target CPM 12 PLN, Performance campaign: Maximize Conversions',
        realWorld: 'Start with Target CPM for awareness, switch to automated for performance',
        tips: [
          'Target CPM for brand awareness',
          'Maximize Conversions for performance',
          'Allow 2 weeks for optimization'
        ],
        relatedTerms: ['CPM', 'CPA', 'Automated Bidding']
      }
    },
    // Communication
    {
      id: 'client-communication',
      category: 'communication',
      title: 'Client Communication Best Practices',
      difficulty: 'basic',
      front: {
        icon: '💬',
        subtitle: 'Professional interaction',
        description: 'How to communicate with clients effectively',
        keyPoints: ['Clear explanations', 'Friendly tone', 'Structured responses']
      },
      back: {
        definition: 'Effective client communication builds trust and ensures successful campaign execution.',
        formula: 'Structure: Placements → Channels → Formats → Reasoning → Next Steps',
        example: 'Email: Brief acknowledgment → Questions → Recommendations → Timeline',
        realWorld: 'Always use friendly, unofficial tone while maintaining professionalism',
        tips: [
          'Never assume technical knowledge',
          'Include links to specifications',
          'Be concise but thorough'
        ],
        relatedTerms: ['Client Service', 'Brief Analysis', 'Recommendations']
      }
    }
  ]

  // Update category counts
  knowledgeCategories.forEach(category => {
    if (category.id === 'all') {
      category.count = knowledgeCards.length
    } else {
      category.count = knowledgeCards.filter(card => card.category === category.id).length
    }
  })

  // Load completed cards from progress
  useEffect(() => {
    if (progress?.progress?.completedSections) {
      const completed = new Set(
        progress.progress.completedSections
          .filter(section => section.startsWith('knowledge-'))
          .map(section => section.replace('knowledge-', ''))
      )
      setCompletedCards(completed)
    }
  }, [progress])

  // Filter cards
  const filteredCards = knowledgeCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.front.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Flip card
  const flipCard = (cardId) => {
    const newFlipped = new Set(flippedCards)
    if (newFlipped.has(cardId)) {
      newFlipped.delete(cardId)
    } else {
      newFlipped.add(cardId)
    }
    setFlippedCards(newFlipped)
  }

  // Mark card as completed
  const markCardCompleted = (cardId) => {
    if (!progress) return

    const newCompleted = new Set(completedCards)
    newCompleted.add(cardId)
    setCompletedCards(newCompleted)

    // Update progress
    const newProgress = { ...progress }
    const sectionId = `knowledge-${cardId}`
    
    if (!newProgress.progress.completedSections.includes(sectionId)) {
      newProgress.progress.completedSections.push(sectionId)
      newProgress.progress.totalPoints += 50
      
      // Check for achievements
      checkKnowledgeAchievements(newProgress, newCompleted.size)
    }

    updateProgress(newProgress)
  }

  // Check for knowledge-based achievements
  const checkKnowledgeAchievements = (newProgress, completedCount) => {
    const badges = newProgress.progress.achievementsBadges

    // "Knowledge Seeker" - Complete 5 cards
    if (completedCount >= 5 && !badges.includes('knowledge-seeker')) {
      badges.push('knowledge-seeker')
      newProgress.progress.totalPoints += 200
    }

    // "Concept Master" - Complete 10 cards
    if (completedCount >= 10 && !badges.includes('concept-master')) {
      badges.push('concept-master')
      newProgress.progress.totalPoints += 500
    }
  }

  // Add to bookmarks
  const toggleBookmark = (cardId) => {
    if (!progress) return

    const newProgress = { ...progress }
    const bookmarks = newProgress.preferences.bookmarks || []
    
    if (bookmarks.includes(cardId)) {
      newProgress.preferences.bookmarks = bookmarks.filter(id => id !== cardId)
    } else {
      newProgress.preferences.bookmarks = [...bookmarks, cardId]
    }

    updateProgress(newProgress)
  }

  const isBookmarked = (cardId) => {
    return progress?.preferences?.bookmarks?.includes(cardId) || false
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'basic': return '#4facfe'
      case 'intermediate': return '#f093fb'
      case 'advanced': return '#f5576c'
      default: return '#667eea'
    }
  }

  return (
    <div className="page knowledge-hub-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Knowledge Hub 📚</h1>
        <p className="page-subtitle">
          Master the essential concepts through interactive learning cards. 
          Flip, learn, and track your progress toward programmatic expertise.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="knowledge-controls">
        <div className="search-section">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search knowledge cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button 
              className="search-clear"
              onClick={() => setSearchQuery('')}
              style={{ display: searchQuery ? 'block' : 'none' }}
            >
              ✕
            </button>
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞ Grid
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ☰ List
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {knowledgeCategories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="progress-summary">
        <div className="progress-stat">
          <span className="stat-number">{completedCards.size}</span>
          <span className="stat-label">Cards Completed</span>
        </div>
        <div className="progress-stat">
          <span className="stat-number">{Math.round((completedCards.size / knowledgeCards.length) * 100)}%</span>
          <span className="stat-label">Knowledge Mastery</span>
        </div>
        <div className="progress-stat">
          <span className="stat-number">{progress?.preferences?.bookmarks?.length || 0}</span>
          <span className="stat-label">Bookmarked</span>
        </div>
      </div>

      {/* Knowledge Cards */}
      <div className={`knowledge-cards ${viewMode}`}>
        {filteredCards.map(card => (
          <div
            key={card.id}
            className={`knowledge-card ${flippedCards.has(card.id) ? 'flipped' : ''} ${completedCards.has(card.id) ? 'completed' : ''}`}
          >
            {/* Front of card */}
            <div className="card-face card-front" onClick={() => flipCard(card.id)}>
              <div className="card-header">
                <div className="card-meta">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(card.difficulty) }}
                  >
                    {card.difficulty}
                  </span>
                  <button
                    className={`bookmark-btn ${isBookmarked(card.id) ? 'bookmarked' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(card.id)
                    }}
                  >
                    {isBookmarked(card.id) ? '★' : '☆'}
                  </button>
                </div>
                {completedCards.has(card.id) && (
                  <div className="completed-badge">✓</div>
                )}
              </div>

              <div className="card-content">
                <div className="card-icon">{card.front.icon}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-subtitle">{card.front.subtitle}</p>
                <p className="card-description">{card.front.description}</p>
                
                <div className="key-points">
                  {card.front.keyPoints.map((point, index) => (
                    <div key={index} className="key-point">
                      <span className="point-bullet">•</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-footer">
                <span className="flip-hint">Click to learn more →</span>
              </div>
            </div>

            {/* Back of card */}
            <div className="card-face card-back">
              <div className="card-header">
                <button 
                  className="flip-back-btn"
                  onClick={() => flipCard(card.id)}
                >
                  ← Back
                </button>
                {!completedCards.has(card.id) && (
                  <button
                    className="complete-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      markCardCompleted(card.id)
                    }}
                  >
                    Mark Complete ✓
                  </button>
                )}
              </div>

              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                
                <div className="definition-section">
                  <h4>Definition</h4>
                  <p>{card.back.definition}</p>
                </div>

                {card.back.formula && (
                  <div className="formula-section">
                    <h4>Formula/Standard</h4>
                    <code className="formula">{card.back.formula}</code>
                  </div>
                )}

                <div className="example-section">
                  <h4>Example</h4>
                  <p>{card.back.example}</p>
                </div>

                <div className="real-world-section">
                  <h4>Real-World Application</h4>
                  <p>{card.back.realWorld}</p>
                </div>

                <div className="tips-section">
                  <h4>Pro Tips</h4>
                  <ul>
                    {card.back.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="related-terms">
                  <h4>Related Terms</h4>
                  <div className="term-tags">
                    {card.back.relatedTerms.map((term, index) => (
                      <span key={index} className="term-tag">{term}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredCards.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No cards found</h3>
          <p>Try adjusting your search terms or category filter.</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Achievement Progress */}
      {completedCards.size > 0 && (
        <div className="achievement-progress">
          <h3>Knowledge Achievements</h3>
          <div className="achievement-milestones">
            <div className={`milestone ${completedCards.size >= 5 ? 'completed' : ''}`}>
              <span className="milestone-icon">🔍</span>
              <div className="milestone-info">
                <span className="milestone-title">Knowledge Seeker</span>
                <span className="milestone-desc">Complete 5 cards ({Math.min(completedCards.size, 5)}/5)</span>
              </div>
            </div>
            <div className={`milestone ${completedCards.size >= 10 ? 'completed' : ''}`}>
              <span className="milestone-icon">🎓</span>
              <div className="milestone-info">
                <span className="milestone-title">Concept Master</span>
                <span className="milestone-desc">Complete 10 cards ({Math.min(completedCards.size, 10)}/10)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default KnowledgeHub