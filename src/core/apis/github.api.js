const getUser = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`)
  const body = await res.json()
  return body
}

export default {
  getUser
}