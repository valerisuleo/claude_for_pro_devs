---
name: bulletproof
description: Commit changes and then run all unit tests to verify the commit didn't break anything. Use when the user wants to commit safely or asks to bulletproof a commit.
---

Commit the changes and immediately run all unit tests afterward to make sure nothing is broken.

## Step 1: Commit

Follow the standard commit flow:
- Check `git status` and `git diff` to understand what's being committed
- Stage the relevant files
- Write a clear, descriptive commit message
- Create the commit

## Step 2: Run All Unit Tests

After the commit succeeds, run the full unit test suite.

```bash
npm test
```

## Step 3: Report Results

- If all tests pass: confirm to the user that the commit is solid and tests are green.
- If any tests fail: clearly report which tests failed. The commit has already been made — advise the user to fix the failures and commit a follow-up fix.

## Guidelines

- Never skip the test run after committing
- Do not amend the commit if tests fail — create a new fix commit instead
- Adapt the test command if the project uses a different runner (e.g., `yarn test`, `pnpm test`, `vitest`)
