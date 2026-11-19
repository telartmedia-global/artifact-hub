const form = document.querySelector('#repo-form');
const input = document.querySelector('#repo-input');
const submit = document.querySelector('#repo-submit');
const results = document.querySelector('#results');

function showMessage(title, message) {
  const state = document.createElement('div');
  state.className = 'empty-state';
  const icon = document.createElement('div');
  icon.className = 'empty-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '⌘';
  const text = document.createElement('div');
  const heading = document.createElement('strong');
  heading.textContent = title;
  const description = document.createElement('p');
  description.textContent = message;
  text.append(heading, description);
  state.append(icon, text);
  results.replaceChildren(state);
}

function githubLink(url, label, className = '') {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' || parsed.hostname !== 'github.com' || parsed.username || parsed.password || parsed.port) return null;
    const link = document.createElement('a');
    link.href = parsed.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    if (className) link.className = className;
    return link;
  } catch {
    return null;
  }
}

function displayReleases(repo, releases) {
  if (!releases.length) {
    showMessage('Belum ada release', `Repository ${repo} tidak memiliki release publik.`);
    return;
  }

  const heading = document.createElement('div');
  heading.className = 'results-heading';
  const count = document.createElement('span');
  count.textContent = `${releases.length} RELEASE · ${repo}`;
  const repoLink = githubLink(`https://github.com/${repo}/releases`, 'Lihat semua ↗');
  heading.append(count);
  if (repoLink) heading.append(repoLink);
  const list = document.createElement('div');
  list.className = 'release-list';

  releases.forEach((release) => {
    const card = document.createElement('article');
    card.className = 'release';
    const title = document.createElement('div');
    title.className = 'release-title';
    const link = githubLink(release.html_url, release.name || release.tag_name || 'Release');
    const tag = document.createElement('span');
    tag.className = 'release-tag';
    tag.textContent = release.tag_name || 'release';
    if (link) title.append(link);
    else {
      const name = document.createElement('strong');
      name.textContent = release.name || release.tag_name || 'Release';
      title.append(name);
    }
    title.append(tag);
    const meta = document.createElement('p');
    meta.className = 'release-meta';
    const date = new Date(release.published_at);
    const published = release.published_at && !Number.isNaN(date.getTime())
      ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
      : 'Tanggal tidak tersedia';
    const assets = Array.isArray(release.assets) ? release.assets : [];
    meta.textContent = `${published} · ${assets.length} berkas${release.prerelease ? ' · Prarilis' : ''}`;
    card.append(title, meta);
    if (assets.length) {
      const assetList = document.createElement('div');
      assetList.className = 'asset-list';
      assets.slice(0, 5).forEach((asset) => {
        const assetLink = githubLink(asset.browser_download_url, `↓ ${asset.name || 'Unduh berkas'}`);
        if (assetLink) assetList.append(assetLink);
      });
      if (assets.length > 5 && link) {
        const more = githubLink(release.html_url, `+${assets.length - 5} lainnya ↗`);
        if (more) assetList.append(more);
      }
      if (assetList.childElementCount) card.append(assetList);
    }
    list.append(card);
  });
  results.replaceChildren(heading, list);
}

async function loadRepository(value) {
  const repo = value.trim();
  const parts = repo.split('/');
  if (parts.length !== 2 || !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,38}$/.test(parts[0]) || !/^[a-zA-Z0-9_.-]{1,100}$/.test(parts[1]) || parts[1] === '.' || parts[1] === '..') {
    showMessage('Format repository belum tepat', 'Gunakan format owner/repository, misalnya cli/cli.');
    input.setAttribute('aria-invalid', 'true');
    return;
  }
  input.removeAttribute('aria-invalid');
  input.value = repo;
  submit.disabled = true;
  results.setAttribute('aria-busy', 'true');
  showMessage('Memuat release', `Mengambil data ${repo} dari GitHub...`);
  try {
    const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(parts[0])}/${encodeURIComponent(parts[1])}/releases?per_page=10`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (response.status === 404) throw new Error('Repository tidak ditemukan atau bukan repository publik.');
    if (response.status === 403 || response.status === 429) throw new Error('Batas permintaan GitHub tercapai. Coba lagi nanti.');
    if (!response.ok) throw new Error('GitHub tidak dapat memuat release saat ini. Coba lagi nanti.');
    const releases = await response.json();
    if (!Array.isArray(releases)) throw new Error('Data release dari GitHub tidak dapat dibaca.');
    displayReleases(repo, releases);
    const url = new URL(window.location.href);
    url.searchParams.set('repo', repo);
    history.replaceState(null, '', url);
  } catch (error) {
    showMessage('Tidak dapat memuat release', error instanceof TypeError ? 'Periksa koneksi internet Anda, lalu coba lagi.' : error.message);
  } finally {
    submit.disabled = false;
    results.setAttribute('aria-busy', 'false');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loadRepository(input.value);
});

const initialRepo = new URLSearchParams(window.location.search).get('repo');
if (initialRepo) loadRepository(initialRepo);
