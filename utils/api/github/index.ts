export const githubApi = {
    getGithubProfileStars: async () => {
        try {
            const response = await fetch('https://api.github.com/repos/ukik0/taxonomy', {
                headers: {
                    Accept: 'application/vnd.github+json',
                    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`
                },
                next: {
                    revalidate: 60
                }
            });

            if (!response.ok) return null;

            const data = await response.json();

            return data['stargazers_count'] || 100;
        } catch (e) {
            return null;
        }
    }
};
