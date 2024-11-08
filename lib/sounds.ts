// Sound utility for game audio effects
class GameSounds {
  private static sounds: { [key: string]: HTMLAudioElement } = {};
  private static initialized = false;

  private static initialize() {
    if (this.initialized) return;

    this.sounds = {
      spin: new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3'),
      win: new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'),
      lose: new Audio('https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3'),
      click: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
      correct: new Audio('https://assets.mixkit.co/active_storage/sfx/1426/1426-preview.mp3'),
      levelUp: new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'),
    };

    // Preload sounds
    Object.values(this.sounds).forEach(sound => {
      sound.load();
      sound.volume = 0.5;
    });

    this.initialized = true;
  }

  static play(soundName: keyof typeof GameSounds['sounds']) {
    if (!this.initialized) {
      this.initialize();
    }

    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }

  static stopAll() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
}

export default GameSounds;