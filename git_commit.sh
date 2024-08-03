#!/bin/bash

# Stage all changes
git add .

# Prompt for commit message
echo "Enter commit message: "
read commit_message

# Commit changes
git commit -m "$commit_message"

# Push changes
git push
