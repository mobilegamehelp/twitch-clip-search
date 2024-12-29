const CLIENT_ID = 'your_twitch_client_id'; // Replace with Twitch Client ID
const ACCESS_TOKEN = 'your_access_token'; // Replace with Twitch Access Token

document.getElementById('search').addEventListener('click', async () => {
  const days = document.getElementById('timeRange').value;
  if (!days) return alert('Enter a time range.');

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Searching...';

  try {
    const endDate = new Date().toISOString();
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const clipsResponse = await fetch(`https://api.twitch.tv/helix/clips?started_at=${startDate}&ended_at=${endDate}`, {
      headers: {
        'Client-ID': CLIENT_ID,
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const clipsData = await clipsResponse.json();

    resultsDiv.innerHTML = '';
    clipsData.data.forEach(clip => {
      const clipDiv = document.createElement('div');
      clipDiv.className = 'clip';
      clipDiv.innerHTML = `
        <h3>${clip.title}</h3>
        <p><strong>Streamer:</strong> ${clip.broadcaster_name}</p>
        <a href="${clip.url}" target="_blank">Watch Clip</a>
      `;
      resultsDiv.appendChild(clipDiv);
    });
  } catch (error) {
    resultsDiv.innerHTML = 'An error occurred.';
    console.error(error);
  }
});
