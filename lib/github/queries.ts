export const PULL_REQUEST_CONTRIBUTIONS_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      totalPullRequestContributions
      totalPullRequestReviewContributions
    }
  }
}`;

export const CONTRIBUTION_COUNT_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar { totalContributions }
    }
  }
}`;

export const CONTRIBUTION_GRAPH_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          firstDay
          contributionDays { date contributionCount color }
        }
      }
    }
  }
}`;

export const PINNED_REPOS_QUERY = `query($username: String!) {
  user(login: $username) {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          id name description url stargazerCount forkCount
          primaryLanguage { name color }
          languages(first: 3) { nodes { name } }
        }
      }
    }
  }
}`;
