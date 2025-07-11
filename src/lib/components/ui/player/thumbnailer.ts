interface RenderItem {
  index: number
  run: () => void
  promise: Promise<string | undefined>
}

export default class Thumbnailer {
  video = document.createElement('video')
  canvas = new OffscreenCanvas(0, 0)
  ctx = this.canvas.getContext('2d')!
  thumbnails: string[] = []
  size = 700
  interval = 12
  currentTask: RenderItem | undefined
  nextTask: RenderItem | undefined
  src

  constructor (src?: string) {
    this.video.preload = 'metadata'
    this.video.playbackRate = 0
    this.video.muted = true
    this.video.crossOrigin = 'anonymous'
    if (src) {
      this.video.src = this.src = src
      this.video.load()
    }
  }

  timeUpdateCtrl = new AbortController()

  setVideo (currentVideo: HTMLVideoElement) {
    this.timeUpdateCtrl.abort()
    this.timeUpdateCtrl = new AbortController()
    currentVideo.addEventListener('timeupdate', () => {
      const index = Math.floor(currentVideo.currentTime / this.interval)
      const thumbnail = this.thumbnails[index]
      if (!thumbnail) this._paintThumbnail(currentVideo, index)
    }, { signal: this.timeUpdateCtrl.signal })
  }

  _nextTask () {
    this.currentTask = undefined
    if (this.nextTask) {
      this.currentTask = this.nextTask
      this.nextTask = undefined
      this.currentTask.run()
    }
  }

  _createTask (index: number): RenderItem {
    const { promise, resolve } = Promise.withResolvers<string | undefined>()

    const run = () => {
      const vfc = this.video.requestVideoFrameCallback(async (_now, meta) => {
        clearTimeout(timeout)
        resolve(await this._paintThumbnail(this.video, index, meta.width, meta.height))
        this._nextTask()
      })
      const timeout = setTimeout(() => {
        this.video.cancelVideoFrameCallback(vfc)
        // this cancels the current load request, in case something bad is happening like long loads or mass seeking
        this.video.load()
        resolve(undefined)
        this._nextTask()
      }, 3000)
      this.video.currentTime = index * this.interval
    }

    return { index, run, promise }
  }

  // get a task or create one to create a thumbnail
  // don't touch currently running task, overwrite next task
  _createThumbnail (index: number) {
    if (!this.currentTask) {
      this.currentTask = this._createTask(index)
      this.currentTask.run()
      return this.currentTask.promise
    }

    if (index === this.currentTask.index) return this.currentTask.promise

    if (!this.nextTask) {
      this.nextTask = this._createTask(index)
      return this.nextTask.promise
    }

    if (index === this.nextTask.index) return this.nextTask.promise

    this.nextTask = this._createTask(index)
    return this.nextTask.promise
  }

  // generate and store the thumbnail
  async _paintThumbnail (video: HTMLVideoElement, index: number, width = video.videoWidth, height = video.videoHeight) {
    if (this.thumbnails[index]) return this.thumbnails[index]
    if (!width || !height) return undefined
    this.canvas.width = this.size
    this.canvas.height = height / width * this.size
    this.ctx.drawImage(video, 0, 0, this.canvas.width, this.canvas.height)
    this.thumbnails[index] = URL.createObjectURL(await this.canvas.convertToBlob({ type: 'image/jpeg' }))
    return this.thumbnails[index]
  }

  async getThumbnail (index: number): Promise<string | undefined> {
    const thumbnail = this.thumbnails[index]
    if (thumbnail) return thumbnail

    return await this._createThumbnail(index)
  }

  updateSource (src?: string) {
    if (src === this.src || !src) return
    for (const thumbnail of this.thumbnails) URL.revokeObjectURL(thumbnail)
    this.thumbnails = []
    this.currentTask = undefined
    this.nextTask = undefined
    this.video.src = this.src = src
    this.video.load()
  }

  destroy () {
    this.video.remove()
    this.timeUpdateCtrl.abort()
    this.thumbnails = []
  }
}
