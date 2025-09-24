# Vercel React Pipelines with GitHub Actions

This project demonstrates how to set up continuous integration and deployment (CI/CD) pipelines using GitHub Actions with Vercel for a React + TypeScript + Vite application.

## 🚀 Features

- **Modern React Stack**: Built with React 19, TypeScript, and Vite
- **Cool Frontend**: Multi-theme testing interface with interactive components
- **GitHub Actions Integration**: Automated testing and deployment pipelines
- **Vercel Deployment**: Production-ready hosting with preview environments
- **Environment Management**: Separate staging and production environments

## 📋 Prerequisites

Before setting up the pipeline, ensure you have:

- A GitHub repository
- A Vercel account
- Node.js 18+ installed locally
- Git configured on your machine

## ⚙️ Setup Instructions

### 1. Vercel Setup

1. **Connect your repository to Vercel:**
   ```bash
   # Login to Vercel CLI
   vercel login
   
   # Link your project
   vercel link
   
   # Pull environment configuration
   vercel pull --environment=production
   ```

2. **Get your Vercel Token:**
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create a new token
   - Copy the token for GitHub Actions setup

3. **Get your Project Details:**
   ```bash
   # View project information
   cat .vercel/project.json
   ```

### 2. GitHub Actions Setup

#### Required GitHub Secrets

Add these secrets to your GitHub repository (`Settings → Secrets and variables → Actions`):

| Secret Name | Description | How to get |
|-------------|-------------|------------|
| `VERCEL_TOKEN` | Vercel authentication token | Vercel Account Settings → Tokens |
| `VERCEL_ORG_ID` | Your Vercel organization ID | From `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your project ID | From `.vercel/project.json` |

#### GitHub Actions Workflows

Create `.github/workflows/` directory and add these workflow files:

**1. Preview Deployment (`.github/workflows/preview.yml`):**
```yaml
name: Preview Deployment

on:
  pull_request:
    branches: [ main ]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run lint
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Vercel Preview
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        scope: ${{ secrets.VERCEL_ORG_ID }}
```

**2. Production Deployment (`.github/workflows/production.yml`):**
```yaml
name: Production Deployment

on:
  push:
    branches: [ main ]

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run lint
      
    - name: Build project
      run: npm run build
      
    - name: Deploy to Vercel Production
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
        scope: ${{ secrets.VERCEL_ORG_ID }}
```

### 3. Environment Variables

**For Vercel Dashboard:**
- Go to your project settings in Vercel
- Add environment variables for different environments (Development, Preview, Production)

**For Local Development:**
```bash
# Create .env.local file
cp .env.example .env.local

# Edit with your environment variables
```

## 🔄 Workflow Explanation

### Preview Deployments
- **Triggered by**: Pull requests to main branch
- **Process**: 
  1. Checkout code
  2. Install dependencies
  3. Run linting and tests
  4. Build the application
  5. Deploy to Vercel preview environment
- **Result**: Unique preview URL for each PR

### Production Deployments
- **Triggered by**: Pushes to main branch
- **Process**:
  1. Checkout code
  2. Install dependencies
  3. Run linting and tests
  4. Build the application
  5. Deploy to Vercel production
- **Result**: Updates your production site

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint

# Deployment
vercel               # Deploy to preview
vercel --prod        # Deploy to production
vercel pull          # Pull environment variables and settings
```

## 📁 Project Structure

```
├── .github/
│   └── workflows/           # GitHub Actions workflows
│       ├── preview.yml      # Preview deployment
│       └── production.yml   # Production deployment
├── .vercel/                 # Vercel configuration
│   ├── project.json         # Project settings
│   └── .env.*.local         # Environment variables
├── src/
│   ├── App.tsx             # Main application component
│   ├── App.css             # Styling with themes
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── package.json           # Dependencies and scripts
└── vercel.json           # Vercel deployment configuration
```

## 🎨 Frontend Features

This project includes a comprehensive testing frontend with:

- **Multi-theme Support**: Light, Dark, and Neon themes
- **Interactive Components**: Counters, forms, buttons, todo lists
- **Data Visualization**: Animated charts and progress bars
- **Responsive Design**: Mobile-friendly layout
- **Modern CSS**: Glass-morphism effects and smooth animations

## 🚨 Troubleshooting

### Common Issues

1. **Deployment fails with "No credentials found":**
   - Ensure `VERCEL_TOKEN` is set in GitHub secrets
   - Token should have appropriate permissions

2. **Build fails:**
   - Check if all dependencies are in `package.json`
   - Verify TypeScript configuration is correct

3. **Environment variables not working:**
   - Ensure variables are set in Vercel dashboard
   - Use `vercel pull` to sync locally

### Debugging Commands

```bash
# Check Vercel login status
vercel whoami

# View project information
vercel ls

# Check environment variables
vercel env ls

# View deployment logs
vercel logs [deployment-url]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to your fork
5. Open a pull request (triggers preview deployment automatically)

## 📖 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev/)

---

**Built with ❤️ using React, TypeScript, Vite, GitHub Actions, and Vercel**
