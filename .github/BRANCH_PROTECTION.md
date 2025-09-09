# Branch Protection Rules

This document outlines the recommended branch protection rules for the Gamio project.

## Main Branch Protection

The `main` branch should have the following protection rules enabled:

### Required Status Checks
- ✅ **CI/CD Pipeline** - All jobs must pass
  - `test` job (runs on Node.js 18.x and 20.x)
  - `build` job
  - `security` job

### Required Reviews
- ✅ **Require a pull request before merging**
- ✅ **Require approvals** (1 or more)
- ✅ **Dismiss stale reviews when new commits are pushed**
- ✅ **Require review from code owners** (if CODEOWNERS file exists)

### Restrictions
- ✅ **Restrict pushes that create files larger than 100MB**
- ✅ **Require branches to be up to date before merging**
- ✅ **Require conversation resolution before merging**
- ✅ **Require signed commits** (recommended)
- ✅ **Require linear history** (recommended)

### Admin Override
- ❌ **Allow force pushes** (disabled)
- ❌ **Allow deletions** (disabled)

## Develop Branch Protection

The `develop` branch should have similar protection rules:

### Required Status Checks
- ✅ **CI/CD Pipeline** - All jobs must pass

### Required Reviews
- ✅ **Require a pull request before merging**
- ✅ **Require approvals** (1 or more)

### Restrictions
- ✅ **Require branches to be up to date before merging**
- ✅ **Require conversation resolution before merging**

## Feature Branch Guidelines

Feature branches should:
1. Be created from `develop` branch
2. Follow naming convention: `feature/description` or `fix/description`
3. Have descriptive commit messages
4. Pass all CI checks before creating PR
5. Be deleted after merging

## Pull Request Requirements

All pull requests must:
1. ✅ Pass all CI/CD checks
2. ✅ Have at least one approval
3. ✅ Have no merge conflicts
4. ✅ Include tests for new functionality
5. ✅ Update documentation if needed
6. ✅ Follow the project's coding standards

## Setting Up Branch Protection

To set up these rules in GitHub:

1. Go to **Settings** → **Branches**
2. Click **Add rule** or **Edit** existing rule
3. Configure the rules as specified above
4. Save the rule

## Code Owners

Consider creating a `CODEOWNERS` file to automatically request reviews from specific team members for different parts of the codebase.

Example `.github/CODEOWNERS`:
```
# Global owners
* @username1 @username2

# Frontend components
/components/ @frontend-team

# API routes
/app/api/ @backend-team

# Tests
/__tests__/ @qa-team
```
