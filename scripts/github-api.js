// This file contains JavaScript code to interact with the GitHub API, allowing the website to fetch and display information about the user's public repositories. It will handle authentication for private repositories.

const GITHUB_API_URL = 'https://api.github.com';
const USERNAME = 'your-github-username'; // Replace with your GitHub username
const TOKEN = 'your-personal-access-token'; // Replace with your GitHub personal access token for private repos

async function fetchPublicRepositories() {
    const response = await fetch(`${GITHUB_API_URL}/users/${USERNAME}/repos`, {
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch public repositories');
    }
    return await response.json();
}

async function fetchPrivateRepositories() {
    const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch private repositories');
    }
    return await response.json();
}

async function displayRepositories() {
    try {
        const publicRepos = await fetchPublicRepositories();
        const privateRepos = await fetchPrivateRepositories();

        // Display public repositories
        const publicRepoList = document.getElementById('public-repo-list');
        publicRepos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'No description'}`;
            publicRepoList.appendChild(listItem);
        });

        // Display private repositories
        const privateRepoList = document.getElementById('private-repo-list');
        privateRepos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'No description'}`;
            privateRepoList.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
    }
}

// Call the function to display repositories when the page loads
document.addEventListener('DOMContentLoaded', displayRepositories);