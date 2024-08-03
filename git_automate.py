import subprocess

def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        print(f"Error: {stderr.decode('utf-8')}")
    else:
        print(stdout.decode('utf-8'))

def main():
    # Stage all changes
    run_command("git add .")

    # Prompt for commit message
    commit_message = input("Enter commit message: ")

    # Commit changes
    run_command(f'git commit -m "{commit_message}"')

    # Push changes
    run_command("git push")

if __name__ == "__main__":
    main()

