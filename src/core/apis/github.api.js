const getUser = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`)
  const body = await res.json()
  return body
}

const getRepo = async (owner, repo) => {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
  const body = await res.json()
  return body
}

export default {
  users: {
    get: getUser
  },
  repositories: {
    get: getRepo
  }
}