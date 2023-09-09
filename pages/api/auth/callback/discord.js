export default async (req, res) => {
  const { code } = req.query
  if (!code) throw new Error('Code is required.')

  const data = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: process.env.REDIRECT_URI,
    code,
    scope: 'identify'
  }

  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  if (response.ok) {
    const { access_token } = await response.json()
    res.redirect(`/success?access_token=${access_token}`)
  } else {
    res.redirect('/error')
  }
}