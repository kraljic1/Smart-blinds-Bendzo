# Code Quality Enforcement System

## 🎯 Overview

This document describes the automated enforcement system for maintaining code quality standards, specifically the **200-line file limit** rule.

## 🛡️ Enforcement Layers

### 1. **ESLint Rules** (Real-time)
- **File**: `eslint.config.js`
- **Trigger**: While coding in VS Code
- **Action**: Shows red squiggly lines and errors
- **Rules**:
  - `max-lines`: 200 lines (ERROR - blocks build)
  - `max-lines-per-function`: 50 lines (WARNING)
  - `complexity`: Max 10 (WARNING)
  - `max-depth`: Max 4 levels (WARNING)
  - `max-params`: Max 4 parameters (WARNING)

### 2. **VS Code Settings** (Visual Feedback)
- **File**: `.vscode/settings.json`
- **Features**:
  - Red ruler line at 200 characters
  - Auto-fix ESLint errors on save
  - Real-time linting feedback
  - File nesting for better organization

### 3. **Pre-commit Hook** (Commit Prevention)
- **File**: `.githooks/pre-commit`
- **Trigger**: Before each Git commit
- **Action**: **BLOCKS COMMITS** that violate rules
- **Checks**:
  - File length violations
  - ESLint errors
  - Code quality standards

### 4. **Manual Check Script** (On-demand)
- **File**: `scripts/check-file-length.js`
- **Usage**: `npm run check-file-length`
- **Features**:
  - Detailed violation reports
  - Exemption system for legacy files
  - Refactoring suggestions

## 🚀 Setup Instructions

### Initial Setup (One-time)
```bash
# 1. Install Git hooks
npm run setup-hooks

# 2. Check current violations
npm run check-file-length

# 3. Run quality check
npm run quality-check
```

### Daily Workflow
```bash
# Before starting work
npm run quality-check

# While coding - VS Code will show warnings automatically

# Before committing - hooks will run automatically
git add .
git commit -m "Your message"  # Will auto-check and block if violations
```

## 📋 Available Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run check-file-length` | Check all files for length violations | Before starting work, debugging |
| `npm run lint` | Run ESLint checks | Fix code quality issues |
| `npm run lint -- --fix` | Auto-fix ESLint issues | Quick fixes |
| `npm run pre-commit` | Manual pre-commit check | Test before committing |
| `npm run quality-check` | Full quality audit | Before releases, weekly checks |
| `npm run setup-hooks` | Install Git hooks | Initial setup, after clone |

## 🔧 Exemption System

### Legacy Files (Temporarily Exempt)
These files are allowed to exceed 200 lines but should be refactored:

- `src/data/phoneCodes.ts` (240 lines)
- `src/data/customizationOptions.ts` (228 lines)
- `src/data/collections/classicCollection.ts` (218 lines)
- `src/data/collections/essentialCollectionPart1.ts` (211 lines)
- `src/data/collections/essentialCollectionPart2.ts` (209 lines)

### Adding Exemptions
Edit `scripts/check-file-length.js`:
```javascript
exemptFiles: [
  'src/path/to/your/file.ts',  // Add your file here
  // ... existing exemptions
]
```

## 🚨 What Happens When Rules Are Violated

### During Development (VS Code)
- ❌ Red squiggly lines under violations
- 🔴 Red ruler line at 200 characters
- ⚠️ Problems panel shows errors
- 🛠️ Auto-fix suggestions when possible

### During Commit (Git Hook)
```
🔍 Running pre-commit checks...
📏 Checking file lengths (200-line limit)...
❌ COMMIT REJECTED: Files exceed 200-line limit
💡 Please refactor large files before committing
```

### During Build (ESLint)
```
✖ 1 problem (1 error, 0 warnings)
  1:1  error  File has too many lines (250). Maximum allowed is 200  max-lines
```

## 💡 Refactoring Strategies

### 1. **Component Splitting**
```typescript
// ❌ Large component (300+ lines)
const LargeComponent = () => {
  // ... lots of logic
};

// ✅ Split into smaller components
const ComponentHeader = () => { /* ... */ };
const ComponentBody = () => { /* ... */ };
const ComponentFooter = () => { /* ... */ };

const RefactoredComponent = () => (
  <>
    <ComponentHeader />
    <ComponentBody />
    <ComponentFooter />
  </>
);
```

### 2. **Custom Hooks Extraction**
```typescript
// ❌ Logic in component
const Component = () => {
  const [state, setState] = useState();
  // ... 50 lines of logic
};

// ✅ Extract to custom hook
const useComponentLogic = () => {
  const [state, setState] = useState();
  // ... logic here
  return { state, actions };
};

const Component = () => {
  const { state, actions } = useComponentLogic();
  // ... clean render logic
};
```

### 3. **Utility Functions**
```typescript
// ❌ Inline utility functions
const Component = () => {
  const validateForm = (data) => {
    // ... 30 lines of validation
  };
  
  const formatData = (data) => {
    // ... 20 lines of formatting
  };
};

// ✅ Extract to utils file
// utils/formUtils.ts
export const validateForm = (data) => { /* ... */ };
export const formatData = (data) => { /* ... */ };

// Component.tsx
import { validateForm, formatData } from '../utils/formUtils';
```

### 4. **Configuration Extraction**
```typescript
// ❌ Inline configuration
const Component = () => {
  const config = {
    // ... 50 lines of config
  };
};

// ✅ Extract to config file
// config/componentConfig.ts
export const COMPONENT_CONFIG = {
  // ... configuration
};
```

## 🔍 Monitoring and Maintenance

### Weekly Quality Check
```bash
npm run quality-check
```

### Monthly Review
1. Review exempt files list
2. Plan refactoring for largest violations
3. Update exemption list as files are fixed

### Before Releases
```bash
npm run quality-check
npm run security-scan
npm run build
```

## 🆘 Troubleshooting

### "Git hooks not working"
```bash
npm run setup-hooks
chmod +x .githooks/pre-commit
```

### "ESLint not showing errors"
1. Restart VS Code
2. Check `.vscode/settings.json` is applied
3. Install ESLint extension

### "False positives in line counting"
- The script excludes comments and blank lines
- Check `scripts/check-file-length.js` logic
- Add file to exemptions if needed

### "Need to commit urgently"
```bash
# Temporary bypass (NOT RECOMMENDED)
git commit --no-verify -m "Emergency commit"

# Then immediately fix violations
npm run check-file-length
```

## 📈 Benefits

✅ **Prevents** large, unmaintainable files  
✅ **Enforces** consistent code organization  
✅ **Improves** code readability and maintainability  
✅ **Reduces** merge conflicts  
✅ **Encourages** better architecture patterns  
✅ **Automates** code quality enforcement  

## 🎯 Success Metrics

- **Target**: 0 files over 200 lines (excluding exemptions)
- **Current**: Check with `npm run check-file-length`
- **Goal**: Maintain <5% exemption rate
- **Review**: Monthly exemption list cleanup