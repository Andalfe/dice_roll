#!/bin/bash

# Define a list of virtual environment directories to exclude
VENV_DIRS=("venv" ".venv" "env" ".env")

# Stage all changes
git add .

# Remove this script and any virtual environment directories from the staging area
git rm --cached "$0"

for dir in "${VENV_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        git rm --cached -r "$dir"
    fi
done

# Check for merge conflicts
if git status | grep -q "Unmerged paths"; then
    echo "Merge conflicts detected. Accepting incoming changes."

    # Accept incoming changes (the 'theirs' version of conflicts)
    git checkout --theirs .

    # Stage the resolved conflicts
    git add .

    # Remove this script and virtual environment directories again in case they were re-staged
    git rm --cached "$0"
    for dir in "${VENV_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            git rm --cached -r "$dir"
        fi
    done

    # Commit the resolved merge
    git commit -m "Resolved merge conflicts by accepting incoming changes"
else
    # Prompt for commit message
    echo "Enter commit message: "
    read commit_message

    # Remove this script and virtual environment directories one last time before committing
    git rm --cached "$0"
    for dir in "${VENV_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            git rm --cached -r "$dir"
        fi
    done

    # Commit changes
    git commit -m "$commit_message"
fi

# Push changes
git push
