#!/bin/bash

# Function to run a command and handle errors
run_command() {
    local command="$1"
    echo "Running: $command"
    eval "$command"
    if [ $? -ne 0 ]; then
        echo "Error occurred while executing: $command"
        exit 1
    fi
}

# Check for unstaged changes
if git status --porcelain | grep -q '^[AM]\s'; then
    echo "You have unstaged changes. You need to either commit or stash them."
    
    # Ask the user whether to commit or stash changes
    echo "Do you want to commit these changes? (y/n): "
    read commit_choice

    if [ "$commit_choice" = "y" ]; then
        echo "Enter commit message: "
        read commit_message
        run_command "git add ."
        run_command "git commit -m \"$commit_message\""
    else
        # Stash changes
        run_command "git stash"
        echo "Changes have been stashed."
    fi
fi

# Pull the latest changes from the remote
echo "Pulling latest changes from remote..."
run_command "git pull --rebase"

# Stage all changes
echo "Staging changes..."
run_command "git add ."

# Prompt for commit message
echo "Enter commit message: "
read commit_message

# Commit changes
echo "Committing changes..."
run_command "git commit -m \"$commit_message\""

# Push changes
echo "Pushing changes..."
run_command "git push"
