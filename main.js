// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = 'F8_PLAYER';

const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
  // (1/2) Uncomment the line below to use localStorage
  // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: '【唯一 DJ remix (DJ阿智)】',
      singer: 'NDChieu',
      path: 'songs/【唯一 DJ remix (DJ阿智)】- 邓紫棋   你知道 我真的爱你 没人能比拟 眼神没肯定 总是在关键时刻清楚洞悉 - DragonChimes Music.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Breakfast (Công Thành Remix)',
      singer: 'NDChieu',
      path: 'songs/Breakfast (Công Thành Remix) - GDucky  Hot TikTok 2024 - Audio Lyrics Video - Exclusive Music.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'DA DA DA x FAIRY TAIL',
      singer: 'NDChieu',
      path: 'songs/DA DA DA x FAIRY TAIL - SILVER SMOKE REMIX - Silver Smoke Remix.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Danza Kuduro [Slowed Remix]',
      singer: 'NDChieu',
      path: 'songs/Danza Kuduro [Slowed Remix] - itsAirLow.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'ĐƯỜNG CHÚNG TA ĐI - TÂY DU KÝ',
      singer: 'NDChieu',
      path: 'songs/ĐƯỜNG CHÚNG TA ĐI - TÂY DU KÝ REMIX (SILVER SMOKE REMIX) - NHẠC GÕ YÊU QUÁI - Silver Smoke Remix.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'LOST CONTROL & IMPOSSIBLE',
      singer: 'NDChieu',
      path: 'songs/LOST CONTROL & IMPOSSIBLE ( GUANG RMX ) - GUANG.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Mi Mi Mi ft. Bboom Bboom',
      singer: 'NDChieu',
      path: 'songs/Mi Mi Mi ft. Bboom Bboom (JAPAN Remix)  Nhạc Cổ Remix Xu Hướng Tiktok 2023 - KOY Music Group.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Người Đáng Thương Là Anh - guHancci ft',
      singer: 'NDChieu',
      path: 'songs/Người Đáng Thương Là Anh - guHancci ft. Hoa Vinh Remix  Hot TikTok 2025 - Audio Lyrics Video - Exclusive Music.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Rihanna - Umbrella',
      singer: 'NDChieu',
      path: 'songs/ (Lunlight Remix) - Lunlight.mp3',
      image: 'img/1ndc.jpg',
    },
    {
      name: 'Safari - Serena  Gritty Remix',
      singer: 'NDChieu',
      path: 'songs/Safari - Serena  Gritty Remix (Lyrics + Vietsub) ♫ - Top Tik Tok.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Set Fire To The Rain',
      singer: 'NDChieu',
      path: 'songs/Set Fire To The Rain - Adele {8D AUDIO}.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Stereo Love  Extended Mix',
      singer: 'NDChieu',
      path: 'songs/Stereo Love  Extended Mix (TikTok Version) LMH - StarLitSoul.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'The Chainsmokers ft. Halsey - Closer',
      singer: 'NDChieu',
      path: 'songs/The Chainsmokers ft. Halsey - Closer (Aash Mehta Flip) - Trap Realm.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Vexento - We Are One - Vexento',
      singer: 'NDChieu',
      path: 'songs/Vexento - We Are One - Vexento.mp3',
      image: 'img/ndc.jpg',
    },
    {
      name: 'Violin',
      singer: 'NDChieu',
      path: 'songs/Violin.m4a',
      image: 'img/ndc.jpg',
    },
    {
      name: '王宇宙Leto_乔浚丞 - 若月亮没来',
      singer: 'NDChieu',
      path: 'songs/王宇宙Leto_乔浚丞 - 若月亮没来 (DjR祥 FunkyHouse Rmx) Nếu Ánh Trăng Không Đến - Vương Vũ Trụ Leto_Kiều Tuấn Thừa - Bit Music.mp3',
      image: 'img/ndc.jpg',
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    // (2/2) Uncomment the line below to use localStorage
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? 'active' : ''
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join('');
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Xử lý CD quay / dừng
    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: 'rotate(360deg)' }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Xử lý phóng to / thu nhỏ CD
    // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Xử lý khi click play
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // Khi song được play
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add('playing');
      cdThumbAnimate.play();
    };

    // Khi song bị pause
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove('playing');
      cdThumbAnimate.pause();
    };

    // Khi tiến độ bài hát thay đổi
    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Xử lý khi tua song
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // Khi next song
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Khi prev song
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Xử lý bật / tắt random song
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig('isRandom', _this.isRandom);
      randomBtn.classList.toggle('active', _this.isRandom);
    };

    // Xử lý lặp lại một song
    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig('isRepeat', _this.isRepeat);
      repeatBtn.classList.toggle('active', _this.isRepeat);
    };

    // Xử lý next song khi audio ended
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest('.song:not(.active)');

      if (songNode || e.target.closest('.option')) {
        // Xử lý khi click vào song
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Xử lý khi click vào song option
        // Handle when clicking on the song option
        if (e.target.closest('.option')) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    // Assign configuration from config to application
    this.loadConfig();

    // Định nghĩa các thuộc tính cho object
    // Defines properties for the object
    this.defineProperties();

    // Lắng nghe / xử lý các sự kiện (DOM events)
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Hiển thị trạng thái ban đầu của button repeat & random
    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle('active', this.isRandom);
    repeatBtn.classList.toggle('active', this.isRepeat);
  },
};

app.start();
