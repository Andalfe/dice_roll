import subprocess
import os

# Define a list of virtual environment directories to exclude
VENV_DIRS = ["venv", ".venv", "env", ".env"]

# Function to run a git command and capture the output
def run_git_command(command):
    result = subprocess.run(command, capture_output=True, text=True)
    return result

# Stage all changes
run_git_command(["git", "add", "."])

# Remove this script and any virtual environment directories from the staging area
script_name = __file__
run_git_command(["git", "rm", "--cached", script_name])

# Remove virtual environment directories
for dir in VENV_DIRS:
    if os.path.isdir(dir):
        run_git_command(["git", "rm", "--cached", "-r", dir])

# Check for merge conflicts
status_result = run_git_command(["git", "status"])

if "Unmerged paths" in status_result.stdout:
    print("Merge conflicts detected. Accepting incoming changes.")

    # Accept incoming changes (the 'theirs' version of conflicts)
    run_git_command(["git", "checkout", "--theirs", "."])

    # Stage the resolved conflicts
    run_git_command(["git", "add", "."])

    # Remove the script and virtual environment directories again in case they were re-staged
    run_git_command(["git", "rm", "--cached", script_name])
    for dir in VENV_DIRS:
        if os.path.isdir(dir):
            run_git_command(["git", "rm", "--cached", "-r", dir])

    # Commit the resolved merge
    run_git_command(["git", "commit", "-m", "Resolved merge conflicts by accepting incoming changes"])
else:
    # Prompt for commit message
    commit_message = input("Enter commit message: ")

    # Remove the script and virtual environment directories one last time before committing
    run_git_command(["git", "rm", "--cached", script_name])
    for dir in VENV_DIRS:
        if os.path.isdir(dir):
            run_git_command(["git", "rm", "--cached", "-r", dir])

    # Commit changes
    run_git_command(["git", "commit", "-m", commit_message])

# Push changes
run_git_command(["git", "push"])
