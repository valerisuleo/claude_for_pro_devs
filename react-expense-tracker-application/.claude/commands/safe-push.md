Run all tests first, and only push to GitHub if they pass.

## Steps

1. Run `npm test -- --watchAll=false` to execute the full test suite.
2. If any tests fail, stop immediately and report which tests failed. Do NOT push.
3. If all tests pass, run `git push` to push to the remote repository.
4. Report the outcome to the user.
