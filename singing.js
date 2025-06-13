const root = document.getElementById('root');

const mockSongs = [
  {
    username: "@roshan_the_dev",
    title: "Fire Melody",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    likes: 0,
    comments: [],
    profilePic: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  {
    username: "@harsh_the_topper",
    title: "Mind Tune",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    likes: 0,
    comments: [],
    profilePic: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  },
];

let feed = JSON.parse(localStorage.getItem('songFeed')) || [...mockSongs];
let sortByLikes = false;

function getRandomPokemonPic() {
  const randomId = Math.floor(Math.random() * 151) + 1;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`;
}

function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const newSong = {
    username: "@you",
    title: file.name,
    url: URL.createObjectURL(file),
    likes: 0,
    comments: [],
    profilePic: getRandomPokemonPic()
  };
  feed.unshift(newSong);
  saveFeed();
  renderFeed();
}

function createHeader() {
  const header = document.createElement('header');

  const title = document.createElement('h1');
  title.textContent = '🎤 Singing Challenge';

  const controls = document.createElement('div');
  controls.style.display = 'flex';

  const uploadLabel = document.createElement('label');
  uploadLabel.className = 'upload-btn';
  uploadLabel.innerHTML = '📤 Upload<input type="file" accept="audio/*" hidden />';
  const input = uploadLabel.querySelector('input');
  input.addEventListener('change', handleUpload);

  const listenButton = document.createElement('button');
  listenButton.className = 'listen-btn';
  listenButton.innerHTML = '🎧 Listen';
  listenButton.addEventListener('click', () => window.scrollTo({ top: 9999, behavior: 'smooth' }));

  const sortButton = document.createElement('button');
  sortButton.className = 'sort-btn';
  sortButton.textContent = '🔽 Sort by Likes';
  sortButton.addEventListener('click', () => {
    sortByLikes = !sortByLikes;
    renderFeed();
  });

  controls.appendChild(uploadLabel);
  controls.appendChild(listenButton);
  controls.appendChild(sortButton);

  header.appendChild(title);
  header.appendChild(controls);

  return header;
}

function createCard(song, index) {
  const card = document.createElement('div');
  card.className = 'card';

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';

  const avatar = document.createElement('img');
  avatar.src = song.profilePic || 'https://i.pravatar.cc/150?u=' + song.username;
  avatar.className = 'profile-pic';

  const username = document.createElement('div');
  username.className = 'audio-username';
  username.textContent = song.username;

  header.appendChild(avatar);
  header.appendChild(username);

  const title = document.createElement('div');
  title.className = 'audio-title';
  title.textContent = song.title;

  const audio = document.createElement('audio');
  audio.controls = true;
  audio.src = song.url;
  audio.style.width = '100%';

  const likeBtn = document.createElement('button');
  likeBtn.className = 'like-button';
  likeBtn.innerHTML = `❤️ ${song.likes}`;
  likeBtn.addEventListener('click', () => {
    song.likes++;
    saveFeed();
    renderFeed();
  });

  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = '✏️';
  editBtn.addEventListener('click', () => {
    const newTitle = prompt('Edit song title:', song.title);
    if (newTitle) {
      song.title = newTitle;
      saveFeed();
      renderFeed();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '🗑️';
  deleteBtn.addEventListener('click', () => {
    if (confirm('Delete this song?')) {
      feed.splice(index, 1);
      saveFeed();
      renderFeed();
    }
  });

  const commentSection = document.createElement('div');
  commentSection.className = 'comment-section';

  const commentInput = document.createElement('input');
  commentInput.placeholder = 'Add a comment...';

  const commentButton = document.createElement('button');
  commentButton.textContent = 'Post';
  commentButton.addEventListener('click', () => {
    if (commentInput.value.trim()) {
      song.comments.push(commentInput.value);
      commentInput.value = '';
      saveFeed();
      renderFeed();
    }
  });

  const commentList = document.createElement('div');
  commentList.className = 'comment-list';
  song.comments.forEach(c => {
    const p = document.createElement('div');
    p.textContent = `💬 ${c}`;
    commentList.appendChild(p);
  });

  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);
  commentSection.appendChild(commentList);

  card.appendChild(header);
  card.appendChild(title);
  card.appendChild(audio);
  card.appendChild(likeBtn);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);
  card.appendChild(commentSection);

  return card;
}

function saveFeed() {
  localStorage.setItem('songFeed', JSON.stringify(feed));
}

function renderFeed() {
  const container = document.createElement('div');
  container.style.maxWidth = '640px';
  container.style.margin = '0 auto';
  container.style.padding = '1rem';

  container.appendChild(createHeader());

  const sortedFeed = [...feed];
  if (sortByLikes) {
    sortedFeed.sort((a, b) => b.likes - a.likes);
  }

  sortedFeed.forEach((song, i) => {
    container.appendChild(createCard(song, i));
  });

  root.innerHTML = '';
  root.appendChild(container);
}

renderFeed();
