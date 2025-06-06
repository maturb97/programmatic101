import React, { useState, useEffect } from 'react'

const TemplateLibrary = ({ progress, updateProgress }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [favoriteTemplates, setFavoriteTemplates] = useState(new Set())
  const [customizationData, setCustomizationData] = useState({})
  const [recentlyUsed, setRecentlyUsed] = useState([])

  // Template categories
  const templateCategories = [
    { id: 'all', name: 'All Templates', icon: '📝', count: 0 },
    { id: 'brief-response', name: 'Brief Responses', icon: '📋', count: 0 },
    { id: 'recommendations', name: 'Recommendations', icon: '💡', count: 0 },
    { id: 'clarifications', name: 'Clarifications', icon: '❓', count: 0 },
    { id: 'updates', name: 'Updates & Reports', icon: '📊', count: 0 },
    { id: 'frameworks', name: 'Analysis Frameworks', icon: '🔍', count: 0 }
  ]

  // Email templates database
  const emailTemplates = [
    {
      id: 'brief-initial-response',
      category: 'brief-response',
      title: 'Initial Brief Response',
      description: 'First response to acknowledge brief and ask clarifying questions',
      difficulty: 'basic',
      usage: 'high',
      tags: ['brief', 'acknowledgment', 'questions'],
      subject: 'Re: [CAMPAIGN_NAME] - Initial thoughts and clarifications',
      template: `Hi [CLIENT_NAME],

Thanks for sharing the brief for [CAMPAIGN_NAME]! I've had a chance to review it and I'm excited to work on this campaign.

**Initial Thoughts:**
Based on the [CAMPAIGN_OBJECTIVE] goal and [BUDGET] budget, I can see great potential for a [CHANNELS] approach that focuses on [KEY_STRATEGY].

**Quick Clarifications:**
To ensure we create the most effective strategy, I have a few quick questions:

• **Budget allocation**: How would you like to split the budget between [CHANNEL_1] and [CHANNEL_2]?
• **Success metrics**: What does success look like for this campaign? (brand awareness, website traffic, conversions?)
• **Creative assets**: What formats do you have available? (display banners, video spots, etc.)
• **Timeline**: When do you need the campaign to go live?
• **Targeting**: Do you have any specific audience data or preferences?

**Next Steps:**
Once I have these details, I can provide detailed channel recommendations and a preliminary media plan within [TIMELINE].

Looking forward to your response!

Best,
[YOUR_NAME]

---
💡 **Helpful resources:**
• [Link to format specifications]
• [Link to targeting options guide]`,
      placeholders: [
        { key: 'CLIENT_NAME', label: 'Client Name', type: 'text' },
        { key: 'CAMPAIGN_NAME', label: 'Campaign Name', type: 'text' },
        { key: 'CAMPAIGN_OBJECTIVE', label: 'Campaign Objective', type: 'select', options: ['awareness', 'consideration', 'performance'] },
        { key: 'BUDGET', label: 'Budget', type: 'text' },
        { key: 'CHANNELS', label: 'Recommended Channels', type: 'text' },
        { key: 'KEY_STRATEGY', label: 'Key Strategy', type: 'text' },
        { key: 'CHANNEL_1', label: 'Primary Channel', type: 'text' },
        { key: 'CHANNEL_2', label: 'Secondary Channel', type: 'text' },
        { key: 'TIMELINE', label: 'Response Timeline', type: 'text' },
        { key: 'YOUR_NAME', label: 'Your Name', type: 'text' }
      ]
    },
    {
      id: 'budget-recommendations',
      category: 'recommendations',
      title: 'Budget & Channel Recommendations',
      description: 'Detailed recommendations for budget allocation and channel strategy',
      difficulty: 'intermediate',
      usage: 'high',
      tags: ['budget', 'channels', 'strategy'],
      subject: '[CAMPAIGN_NAME] - Budget Allocation & Channel Strategy',
      template: `Hi [CLIENT_NAME],

Here are my detailed recommendations for [CAMPAIGN_NAME]:

**🎯 Recommended Strategy**
**Primary Goal:** [PRIMARY_GOAL]
**Total Budget:** [TOTAL_BUDGET] PLN/month
**Campaign Duration:** [DURATION]

**📊 Budget Allocation:**

**[CHANNEL_1]: [PERCENTAGE_1]% ([BUDGET_1] PLN)**
• **Why:** [REASONING_1]
• **Formats:** [FORMATS_1]
• **Expected Results:** [RESULTS_1]

**[CHANNEL_2]: [PERCENTAGE_2]% ([BUDGET_2] PLN)**
• **Why:** [REASONING_2]
• **Formats:** [FORMATS_2]
• **Expected Results:** [RESULTS_2]

[ADDITIONAL_CHANNEL_BLOCK]

**🎨 Creative Requirements:**
• [FORMAT_1]: [SPECIFICATIONS_1]
• [FORMAT_2]: [SPECIFICATIONS_2]
• [FORMAT_3]: [SPECIFICATIONS_3]

**📈 Success Metrics:**
• Primary KPI: [PRIMARY_KPI]
• Secondary KPIs: [SECONDARY_KPIS]
• Reporting frequency: [REPORTING_FREQUENCY]

**⚡ Next Steps:**
1. **Approval**: Please confirm if this allocation works for your goals
2. **Creative timeline**: When can we expect the creative assets?
3. **Campaign setup**: I'll start building campaigns upon approval
4. **Go-live**: Target launch date of [LAUNCH_DATE]

**💡 Pro tip:** [OPTIMIZATION_TIP]

Any questions or adjustments needed? Happy to jump on a quick call to discuss!

Best,
[YOUR_NAME]`,
      placeholders: [
        { key: 'CLIENT_NAME', label: 'Client Name', type: 'text' },
        { key: 'CAMPAIGN_NAME', label: 'Campaign Name', type: 'text' },
        { key: 'PRIMARY_GOAL', label: 'Primary Goal', type: 'select', options: ['Brand Awareness', 'Lead Generation', 'Sales', 'App Downloads'] },
        { key: 'TOTAL_BUDGET', label: 'Total Budget', type: 'text' },
        { key: 'DURATION', label: 'Campaign Duration', type: 'text' },
        { key: 'CHANNEL_1', label: 'Primary Channel', type: 'text' },
        { key: 'PERCENTAGE_1', label: 'Primary Channel %', type: 'number' },
        { key: 'BUDGET_1', label: 'Primary Channel Budget', type: 'text' },
        { key: 'REASONING_1', label: 'Primary Channel Reasoning', type: 'textarea' },
        { key: 'LAUNCH_DATE', label: 'Launch Date', type: 'date' },
        { key: 'YOUR_NAME', label: 'Your Name', type: 'text' }
      ]
    },
    {
      id: 'missing-info-clarification',
      category: 'clarifications',
      title: 'Missing Information Clarification',
      description: 'Professional way to ask for missing brief information',
      difficulty: 'basic',
      usage: 'high',
      tags: ['clarification', 'missing info', 'brief gaps'],
      subject: '[CAMPAIGN_NAME] - Quick clarifications needed',
      template: `Hi [CLIENT_NAME],

Thanks for the [CAMPAIGN_NAME] brief! I'm excited to get started on this.

I have everything I need to begin strategy development, but a few quick clarifications would help me provide the most accurate recommendations:

**Missing Details:**
[MISSING_INFO_LIST]

**Why this matters:**
[IMPORTANCE_EXPLANATION]

**My recommendation:**
While we're gathering these details, I can start working on preliminary concepts based on typical [INDUSTRY/CATEGORY] campaigns. This way we won't lose any time!

**Proposed next steps:**
• I'll send initial recommendations by [DATE_1] based on assumptions
• Once we have the missing info, I'll refine the strategy by [DATE_2]
• Target campaign launch: [LAUNCH_DATE]

Would a quick 15-minute call help sort these out faster? I'm available [AVAILABILITY].

Best,
[YOUR_NAME]

P.S. I've attached our standard brief template for future campaigns - it covers all the details that help us create the best strategies! 📋`,
      placeholders: [
        { key: 'CLIENT_NAME', label: 'Client Name', type: 'text' },
        { key: 'CAMPAIGN_NAME', label: 'Campaign Name', type: 'text' },
        { key: 'MISSING_INFO_LIST', label: 'Missing Information List', type: 'textarea' },
        { key: 'IMPORTANCE_EXPLANATION', label: 'Why Information is Important', type: 'textarea' },
        { key: 'INDUSTRY', label: 'Industry/Category', type: 'text' },
        { key: 'DATE_1', label: 'Initial Recommendations Date', type: 'date' },
        { key: 'DATE_2', label: 'Final Strategy Date', type: 'date' },
        { key: 'LAUNCH_DATE', label: 'Target Launch Date', type: 'date' },
        { key: 'AVAILABILITY', label: 'Your Availability', type: 'text' },
        { key: 'YOUR_NAME', label: 'Your Name', type: 'text' }
      ]
    },
    {
      id: 'campaign-performance-update',
      category: 'updates',
      title: 'Campaign Performance Update',
      description: 'Weekly/monthly performance summary with insights',
      difficulty: 'intermediate',
      usage: 'medium',
      tags: ['performance', 'reporting', 'optimization'],
      subject: '[CAMPAIGN_NAME] - [PERIOD] Performance Update',
      template: `Hi [CLIENT_NAME],

Here's your [PERIOD] performance update for [CAMPAIGN_NAME]:

**📊 Key Metrics ([DATE_RANGE]):**

**Overall Performance:**
• **Impressions:** [IMPRESSIONS] ([IMPRESSIONS_CHANGE] vs last period)
• **Clicks:** [CLICKS] (CTR: [CTR]%)
• **CPM:** [CPM] PLN
• **Budget utilization:** [BUDGET_USED]/[BUDGET_TOTAL] PLN ([BUDGET_PERCENTAGE]%)

**Channel Breakdown:**
• **[CHANNEL_1]:** [CHANNEL_1_METRICS]
• **[CHANNEL_2]:** [CHANNEL_2_METRICS]
• **[CHANNEL_3]:** [CHANNEL_3_METRICS]

**🎯 What's Working Well:**
[POSITIVE_INSIGHTS]

**⚡ Optimizations Made:**
[OPTIMIZATIONS_LIST]

**📈 Next Week's Focus:**
[NEXT_WEEK_ACTIONS]

**💡 Recommendation:**
[MAIN_RECOMMENDATION]

The campaign is [OVERALL_STATUS]. [DETAILED_ANALYSIS].

Questions? I'm happy to discuss these numbers in more detail!

Best,
[YOUR_NAME]

---
📋 Full detailed report: [LINK_TO_DETAILED_REPORT]`,
      placeholders: [
        { key: 'CLIENT_NAME', label: 'Client Name', type: 'text' },
        { key: 'CAMPAIGN_NAME', label: 'Campaign Name', type: 'text' },
        { key: 'PERIOD', label: 'Reporting Period', type: 'select', options: ['Weekly', 'Monthly', 'Mid-Campaign'] },
        { key: 'DATE_RANGE', label: 'Date Range', type: 'text' },
        { key: 'IMPRESSIONS', label: 'Total Impressions', type: 'text' },
        { key: 'IMPRESSIONS_CHANGE', label: 'Impressions Change', type: 'text' },
        { key: 'CTR', label: 'CTR %', type: 'number' },
        { key: 'CPM', label: 'Average CPM', type: 'number' },
        { key: 'OVERALL_STATUS', label: 'Overall Status', type: 'select', options: ['performing well', 'meeting expectations', 'needs optimization', 'exceeding expectations'] },
        { key: 'YOUR_NAME', label: 'Your Name', type: 'text' }
      ]
    },
    {
      id: 'brief-analysis-framework',
      category: 'frameworks',
      title: 'Complete Brief Analysis Framework',
      description: 'Systematic framework for analyzing any client brief',
      difficulty: 'advanced',
      usage: 'medium',
      tags: ['framework', 'analysis', 'systematic'],
      subject: '[CAMPAIGN_NAME] - Complete Strategy Analysis',
      template: `**BRIEF ANALYSIS FRAMEWORK**
**Campaign:** [CAMPAIGN_NAME]
**Client:** [CLIENT_NAME]
**Date:** [ANALYSIS_DATE]

---

**1. CAMPAIGN OVERVIEW**
• **Objective:** [CAMPAIGN_OBJECTIVE]
• **Target Audience:** [TARGET_AUDIENCE]
• **Budget:** [TOTAL_BUDGET]
• **Timeline:** [CAMPAIGN_TIMELINE]
• **Geographic Focus:** [GEO_TARGETING]

**2. BRIEF COMPLETENESS ASSESSMENT**

✅ **Information Provided:**
[PROVIDED_INFO_LIST]

❓ **Missing/Unclear Information:**
[MISSING_INFO_LIST]

🔴 **Critical Gaps:**
[CRITICAL_GAPS]

**3. STRATEGIC RECOMMENDATIONS**

**Primary Channel Strategy:**
• **Recommendation:** [PRIMARY_CHANNELS]
• **Reasoning:** [CHANNEL_REASONING]
• **Budget Split:** [BUDGET_ALLOCATION]

**Creative Strategy:**
• **Required Formats:** [REQUIRED_FORMATS]
• **Creative Guidelines:** [CREATIVE_GUIDELINES]
• **Testing Strategy:** [TESTING_APPROACH]

**4. TARGETING APPROACH**
• **Primary Audience:** [PRIMARY_TARGETING]
• **Secondary Audience:** [SECONDARY_TARGETING]
• **Exclusions:** [EXCLUSION_STRATEGY]

**5. MEASUREMENT FRAMEWORK**
• **Primary KPI:** [PRIMARY_KPI]
• **Secondary KPIs:** [SECONDARY_KPIS]
• **Success Benchmarks:** [SUCCESS_BENCHMARKS]
• **Reporting Schedule:** [REPORTING_SCHEDULE]

**6. RISK ASSESSMENT**
• **Potential Challenges:** [RISK_FACTORS]
• **Mitigation Strategies:** [MITIGATION_PLANS]
• **Contingency Plans:** [CONTINGENCY_OPTIONS]

**7. NEXT STEPS & TIMELINE**
1. **[STEP_1]** - Due: [DATE_1]
2. **[STEP_2]** - Due: [DATE_2]
3. **[STEP_3]** - Due: [DATE_3]
4. **Campaign Launch** - Target: [LAUNCH_DATE]

**8. CLARIFICATION QUESTIONS**
[CLARIFICATION_QUESTIONS_LIST]

---
**Analysis completed by:** [YOUR_NAME]
**Review date:** [REVIEW_DATE]`,
      placeholders: [
        { key: 'CAMPAIGN_NAME', label: 'Campaign Name', type: 'text' },
        { key: 'CLIENT_NAME', label: 'Client Name', type: 'text' },
        { key: 'ANALYSIS_DATE', label: 'Analysis Date', type: 'date' },
        { key: 'CAMPAIGN_OBJECTIVE', label: 'Campaign Objective', type: 'text' },
        { key: 'TARGET_AUDIENCE', label: 'Target Audience', type: 'textarea' },
        { key: 'TOTAL_BUDGET', label: 'Total Budget', type: 'text' },
        { key: 'YOUR_NAME', label: 'Your Name', type: 'text' }
      ]
    },
    {
      id: 'remarketing-setup-questions',
      category: 'clarifications',
      title: 'Remarketing Campaign Clarifications',
      description: 'Essential questions for remarketing campaign setup',
      difficulty: 'intermediate',
      usage: 'medium',
      tags: ['remarketing', 'setup', 'technical'],
      subject: '[CAMPAIGN_NAME] - Remarketing Setup Requirements',
      template: `Hi [CLIENT_NAME],

Great to hear you want to add remarketing to [CAMPAIGN_NAME]! This is one of the most effective tactics for improving campaign performance.

**🎯 To set this up properly, I need to verify a few technical details:**

**Tracking Setup:**
• **Floodlight tags:** Are these currently implemented on your website?
• **Conversion tracking:** What actions should we track? (page visits, purchases, form fills, etc.)
• **Attribution window:** How long after seeing an ad should we count conversions?

**Audience Strategy:**
• **Website visitors:** Which pages should we include? (homepage, product pages, checkout abandoners?)
• **Audience size:** Do you have an estimate of monthly unique visitors?
• **Exclusions:** Should we exclude recent converters?

**Creative Approach:**
• **Messaging:** More aggressive offers for warm audiences?
• **Product focus:** Dynamic ads vs generic brand messaging?
• **Frequency:** How often should remarketing ads appear?

**Budget & Goals:**
• **Remarketing budget:** What portion of [TOTAL_BUDGET] should go to remarketing?
• **Expected performance:** Any existing remarketing benchmarks?

**🚀 Quick Wins:**
I recommend starting with [RECOMMENDATION] because [REASONING].

**Next Steps:**
Once I have these details, I can:
1. Set up proper audience definitions
2. Create remarketing line items in DV360
3. Implement conversion tracking (if not already done)
4. Launch within [TIMELINE]

Let me know if you'd prefer a quick call to walk through these setup requirements!

Best,
[YOUR_NAME]`,
      placeholders: [
        { key: 'CLIENT_NAME', label: 'Client Name', type: 'text' },
        { key: 'CAMPAIGN_NAME', label: 'Campaign Name', type: 'text' },
        { key: 'TOTAL_BUDGET', label: 'Total Budget', type: 'text' },
        { key: 'RECOMMENDATION', label: 'Quick Win Recommendation', type: 'text' },
        { key: 'REASONING', label: 'Recommendation Reasoning', type: 'text' },
        { key: 'TIMELINE', label: 'Setup Timeline', type: 'text' },
        { key: 'YOUR_NAME', label: 'Your Name', type: 'text' }
      ]
    }
  ]

  // Update category counts
  templateCategories.forEach(category => {
    if (category.id === 'all') {
      category.count = emailTemplates.length
    } else {
      category.count = emailTemplates.filter(template => template.category === category.id).length
    }
  })

  // Load favorites and recent from progress
  useEffect(() => {
    if (progress?.preferences?.favoriteTemplates) {
      setFavoriteTemplates(new Set(progress.preferences.favoriteTemplates))
    }
    if (progress?.preferences?.recentlyViewed) {
      setRecentlyUsed(progress.preferences.recentlyViewed.slice(0, 5))
    }
  }, [progress])

  // Filter templates
  const filteredTemplates = emailTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Toggle favorite
  const toggleFavorite = (templateId) => {
    if (!progress) return

    const newFavorites = new Set(favoriteTemplates)
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId)
    } else {
      newFavorites.add(templateId)
    }
    setFavoriteTemplates(newFavorites)

    const newProgress = { ...progress }
    newProgress.preferences.favoriteTemplates = Array.from(newFavorites)
    updateProgress(newProgress)
  }

  // Use template
  const useTemplate = (template) => {
    setSelectedTemplate(template)
    
    // Add to recently used
    const newRecent = [template.id, ...recentlyUsed.filter(id => id !== template.id)].slice(0, 5)
    setRecentlyUsed(newRecent)

    // Update progress
    if (progress) {
      const newProgress = { ...progress }
      newProgress.preferences.recentlyViewed = newRecent
      
      // Award points for using templates
      newProgress.progress.totalPoints += 25
      
      // Check for achievement
      const templatesUsed = newRecent.length
      if (templatesUsed >= 3 && !newProgress.progress.achievementsBadges.includes('template-master')) {
        newProgress.progress.achievementsBadges.push('template-master')
        newProgress.progress.totalPoints += 200
      }
      
      updateProgress(newProgress)
    }
  }

  // Customize template
  const customizeTemplate = (placeholder, value) => {
    setCustomizationData(prev => ({
      ...prev,
      [placeholder]: value
    }))
  }

  // Generate customized template
  const generateCustomizedTemplate = () => {
    if (!selectedTemplate) return ''
    
    let customized = selectedTemplate.template
    
    // Replace placeholders with custom values
    selectedTemplate.placeholders.forEach(placeholder => {
      const value = customizationData[placeholder.key] || `[${placeholder.key}]`
      const regex = new RegExp(`\\[${placeholder.key}\\]`, 'g')
      customized = customized.replace(regex, value)
    })
    
    return customized
  }

  // Copy to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Copied to clipboard!')
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'basic': return '#4facfe'
      case 'intermediate': return '#f093fb'
      case 'advanced': return '#f5576c'
      default: return '#667eea'
    }
  }

  const getUsageColor = (usage) => {
    switch (usage) {
      case 'high': return '#00f2fe'
      case 'medium': return '#f093fb'
      case 'low': return '#ffecd2'
      default: return '#e2e8f0'
    }
  }

  return (
    <div className="page template-library-page">
      {!selectedTemplate ? (
        <>
          {/* Page Header */}
          <div className="page-header">
            <h1 className="page-title">Template Library 📝</h1>
            <p className="page-subtitle">
              Ready-to-use email templates and frameworks for professional client communication. 
              Customize, copy, and streamline your workflow.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="library-stats">
            <div className="stat-card">
              <span className="stat-number">{emailTemplates.length}</span>
              <span className="stat-label">Total Templates</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{favoriteTemplates.size}</span>
              <span className="stat-label">Favorites</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{recentlyUsed.length}</span>
              <span className="stat-label">Recently Used</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="library-controls">
            <div className="search-section">
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search templates, tags, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="category-filter">
              {templateCategories.map(category => (
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

          {/* Recently Used Templates */}
          {recentlyUsed.length > 0 && (
            <div className="recent-templates">
              <h3>📋 Recently Used</h3>
              <div className="recent-list">
                {recentlyUsed.map(templateId => {
                  const template = emailTemplates.find(t => t.id === templateId)
                  return template ? (
                    <button
                      key={template.id}
                      className="recent-template"
                      onClick={() => useTemplate(template)}
                    >
                      <span className="recent-title">{template.title}</span>
                      <span className="recent-category">{template.category}</span>
                    </button>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* Template Grid */}
          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <div className="template-meta">
                    <span 
                      className="difficulty-badge"
                      style={{ backgroundColor: getDifficultyColor(template.difficulty) }}
                    >
                      {template.difficulty}
                    </span>
                    <span 
                      className="usage-badge"
                      style={{ backgroundColor: getUsageColor(template.usage) }}
                    >
                      {template.usage} usage
                    </span>
                  </div>
                  <button
                    className={`favorite-btn ${favoriteTemplates.has(template.id) ? 'favorited' : ''}`}
                    onClick={() => toggleFavorite(template.id)}
                  >
                    {favoriteTemplates.has(template.id) ? '★' : '☆'}
                  </button>
                </div>

                <div className="template-content">
                  <h3 className="template-title">{template.title}</h3>
                  <p className="template-description">{template.description}</p>
                  
                  <div className="template-tags">
                    {template.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="template-preview">
                    <strong>Subject:</strong> {template.subject}
                  </div>
                </div>

                <div className="template-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => useTemplate(template)}
                  >
                    Use Template
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => copyToClipboard(template.template)}
                  >
                    Quick Copy
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">📝</div>
              <h3>No templates found</h3>
              <p>Try adjusting your search or category filter.</p>
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

          {/* Microsoft Teams Integration */}
          <div className="teams-integration">
            <h3>🔗 Microsoft Teams Resources</h3>
            <p>Access additional templates and resources from our shared workspace:</p>
            <div className="teams-links">
              <a href="#" className="teams-link">
                <span>📋</span>
                <div>
                  <strong>Media Plan Templates</strong>
                  <span>Standard planning formats</span>
                </div>
              </a>
              <a href="#" className="teams-link">
                <span>📊</span>
                <div>
                  <strong>Reporting Templates</strong>
                  <span>Performance report formats</span>
                </div>
              </a>
              <a href="#" className="teams-link">
                <span>🎯</span>
                <div>
                  <strong>Strategy Documents</strong>
                  <span>Campaign planning guides</span>
                </div>
              </a>
            </div>
          </div>
        </>
      ) : (
        /* Template Customization View */
        <div className="template-customization">
          <div className="customization-header">
            <button 
              className="back-btn"
              onClick={() => setSelectedTemplate(null)}
            >
              ← Back to Templates
            </button>
            <div className="template-info">
              <h1>{selectedTemplate.title}</h1>
              <p>{selectedTemplate.description}</p>
            </div>
          </div>

          <div className="customization-content">
            <div className="customization-form">
              <h3>📝 Customize Your Template</h3>
              
              <div className="form-section">
                <label className="form-label">Subject Line:</label>
                <input
                  type="text"
                  className="form-input"
                  value={customizationData['SUBJECT'] || selectedTemplate.subject}
                  onChange={(e) => customizeTemplate('SUBJECT', e.target.value)}
                />
              </div>

              {selectedTemplate.placeholders.map(placeholder => (
                <div key={placeholder.key} className="form-section">
                  <label className="form-label">{placeholder.label}:</label>
                  {placeholder.type === 'textarea' ? (
                    <textarea
                      className="form-input"
                      value={customizationData[placeholder.key] || ''}
                      onChange={(e) => customizeTemplate(placeholder.key, e.target.value)}
                      rows={3}
                    />
                  ) : placeholder.type === 'select' ? (
                    <select
                      className="form-input"
                      value={customizationData[placeholder.key] || ''}
                      onChange={(e) => customizeTemplate(placeholder.key, e.target.value)}
                    >
                      <option value="">Select...</option>
                      {placeholder.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={placeholder.type || 'text'}
                      className="form-input"
                      value={customizationData[placeholder.key] || ''}
                      onChange={(e) => customizeTemplate(placeholder.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="template-preview-section">
              <h3>👀 Live Preview</h3>
              <div className="email-preview">
                <div className="email-subject">
                  <strong>Subject:</strong> {customizationData['SUBJECT'] || selectedTemplate.subject}
                </div>
                <div className="email-body">
                  <pre>{generateCustomizedTemplate()}</pre>
                </div>
              </div>

              <div className="preview-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => copyToClipboard(generateCustomizedTemplate())}
                >
                  📋 Copy Customized Template
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => copyToClipboard(customizationData['SUBJECT'] || selectedTemplate.subject)}
                >
                  📧 Copy Subject Line
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateLibrary