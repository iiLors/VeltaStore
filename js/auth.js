const CLIENT_ID = '1371569094473679028';
const REDIRECT_URI = window.location.href.split('?')[0];
const REQUIRED_GUILD_ID = '1370841882644447322';
const SCOPES = 'identify guilds';

function loginWithDiscord() {
  const url = \`https://discord.com/api/oauth2/authorize?client_id=\${CLIENT_ID}` +
    \`&redirect_uri=\${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=\${encodeURIComponent(SCOPES)}\`;
  window.location.href = url;
}

async function fetchDiscordData(token) {
  try {
    const [userRes, guildsRes] = await Promise.all([
      fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: \`Bearer \${token}\` }
      }),
      fetch("https://discord.com/api/users/@me/guilds", {
        headers: { Authorization: \`Bearer \${token}\` }
      })
    ]);

    if (!userRes.ok || !guildsRes.ok) throw new Error('Failed to fetch user data');

    const user = await userRes.json();
    const guilds = await guildsRes.json();
    return { user, guilds };
  } catch (err) {
    console.error('Error fetching Discord data:', err);
    throw err;
  }
}

async function checkTokenValidity(token) {
  try {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    return response.ok;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
}