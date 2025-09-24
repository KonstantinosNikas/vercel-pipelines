import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

interface UserProfile {
  name: string
  email: string
  theme: 'light' | 'dark' | 'neon'
}

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Test User',
    email: 'test@example.com',
    theme: 'neon'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState('')
  const [progress, setProgress] = useState(0)
  const [selectedTab, setSelectedTab] = useState('dashboard')
  const [notifications, setNotifications] = useState<string[]>([])

  // Simulate progress loading
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
      addNotification('Todo added successfully!')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const simulateApiCall = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setApiResponse(`API Response: ${new Date().toLocaleTimeString()} - Success!`)
    setIsLoading(false)
    addNotification('API call completed!')
  }

  const addNotification = (message: string) => {
    setNotifications(prev => [message, ...prev.slice(0, 4)])
    setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1))
    }, 5000)
  }

  const getThemeClass = () => {
    return `app-${userProfile.theme}`
  }

  return (
    <div className={`app-container ${getThemeClass()}`}>
      {/* Header */}
      <header className="app-header">
        <div className="logo-section">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
          <h1 className="app-title">Cool Frontend Testing Suite</h1>
        </div>
        
        {/* Theme Switcher */}
        <div className="theme-switcher">
          {['light', 'dark', 'neon'].map(theme => (
            <button
              key={theme}
              className={`theme-btn ${userProfile.theme === theme ? 'active' : ''}`}
              onClick={() => setUserProfile({...userProfile, theme: theme as any})}
            >
              {theme}
            </button>
          ))}
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-navigation">
        {['dashboard', 'components', 'data', 'profile'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${selectedTab === tab ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification}
            </div>
          ))}
        </div>
      )}

      <main className="app-main">
        {selectedTab === 'dashboard' && (
          <div className="dashboard">
            <div className="dashboard-grid">
              {/* Counter Card */}
              <div className="card">
                <h3>Interactive Counter</h3>
                <div className="counter-display">{count}</div>
                <div className="button-group">
                  <button onClick={() => setCount(count + 1)}>+1</button>
                  <button onClick={() => setCount(count + 10)}>+10</button>
                  <button onClick={() => setCount(0)}>Reset</button>
                  <button onClick={() => setCount(count - 1)}>-1</button>
                </div>
              </div>

              {/* Progress Card */}
              <div className="card">
                <h3>Animated Progress</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${progress}%`}}></div>
                </div>
                <p>{progress}% Complete</p>
              </div>

              {/* API Test Card */}
              <div className="card">
                <h3>API Testing</h3>
                <button 
                  onClick={simulateApiCall} 
                  disabled={isLoading}
                  className={`api-btn ${isLoading ? 'loading' : ''}`}
                >
                  {isLoading ? 'Loading...' : 'Test API Call'}
                </button>
                {apiResponse && <p className="api-response">{apiResponse}</p>}
              </div>

              {/* Stats Card */}
              <div className="card stats-card">
                <h3>App Statistics</h3>
                <div className="stats">
                  <div className="stat">
                    <div className="stat-number">{count}</div>
                    <div className="stat-label">Counter Value</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">{todos.length}</div>
                    <div className="stat-label">Total Todos</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">{todos.filter(t => t.completed).length}</div>
                    <div className="stat-label">Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'components' && (
          <div className="components-demo">
            <h2>UI Components Testing</h2>
            
            <div className="component-section">
              <h3>Form Elements</h3>
              <div className="form-demo">
                <input type="text" placeholder="Text Input" />
                <input type="email" placeholder="Email Input" />
                <select>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
                <textarea placeholder="Textarea"></textarea>
              </div>
            </div>

            <div className="component-section">
              <h3>Button Variations</h3>
              <div className="button-showcase">
                <button className="btn-primary">Primary</button>
                <button className="btn-secondary">Secondary</button>
                <button className="btn-success">Success</button>
                <button className="btn-danger">Danger</button>
                <button className="btn-outline">Outline</button>
                <button className="btn-gradient">Gradient</button>
              </div>
            </div>

            <div className="component-section">
              <h3>Cards & Panels</h3>
              <div className="cards-demo">
                <div className="demo-card">
                  <h4>Feature Card</h4>
                  <p>This is a sample card with content.</p>
                </div>
                <div className="demo-card">
                  <h4>Another Card</h4>
                  <p>Cards are great for organizing content.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'data' && (
          <div className="data-management">
            <h2>Data Management</h2>
            
            <div className="todo-section">
              <h3>Todo List</h3>
              <div className="todo-input">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo..."
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                />
                <button onClick={addTodo}>Add Todo</button>
              </div>
              
              <div className="todo-list">
                {todos.map(todo => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span>{todo.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="data-visualization">
              <h3>Data Visualization</h3>
              <div className="chart-placeholder">
                <div className="bars">
                  {[65, 85, 45, 92, 38, 76, 58].map((height, index) => (
                    <div 
                      key={index} 
                      className="bar" 
                      style={{height: `${height}%`}}
                    ></div>
                  ))}
                </div>
                <p>Sample Chart Visualization</p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'profile' && (
          <div className="profile-section">
            <h2>User Profile</h2>
            
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {userProfile.name.charAt(0)}
                </div>
              </div>
              
              <div className="profile-form">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label>Theme:</label>
                  <select 
                    value={userProfile.theme}
                    onChange={(e) => setUserProfile({...userProfile, theme: e.target.value as any})}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="neon">Neon</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>🚀 Built with React + TypeScript + Vite | Testing Suite v1.0</p>
      </footer>
    </div>
  )
}

export default App
