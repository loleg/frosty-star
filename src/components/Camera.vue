<template>
  <div>
    <video
      class="video"
      :class="facingMode === 'user' ? 'front' : ''"
      ref="video"
      v-if="!errorStream"
    />
    <canvas v-if="errorStream" ref="canva" />

    <n-button circle
      v-if="videoDevices.length > 1 && !errorStream"
      class="switch-button"
      @click="switchCamera"
      :disabled="switchingCamera"
    >
      <Icon icon="flat-color-icons:switch-camera" />
    </n-button>

    <div class="photo-button-container">
      <n-button circle
        class="photo-button"
        title="Yes We Scan!"
        @click="TakePhoto"
        v-if="!errorStream"
      >
        <span v-if="!lastPhoto">
          Barcode
        </span>
      </n-button>

      <div class="upload-container">
        <p v-if="errorStream">
          The video stream could not be started. Try taking a photo and uploading it here:
        </p>
        <input type="file" accept="image/*" @change="uploadPhoto($event)">
      </div>
    </div>

    <image-scan class="results" :photo="lastPhoto" />
  </div>
</template>

<script>
import ImageScan from "./ImageScan.vue"

import { NButton } from 'naive-ui'
import { Icon } from '@iconify/vue';

export default {
  components: {
    ImageScan,
    NButton,
    Icon
  },
  data() {
    return {
      // photos: [],
      lastPhoto: {},
      mediaStream: null,
      videoDevices: [],
      facingMode: "environment",
      counter: 0,
      switchingCamera: false,
      errorStream: false,
    };
  },
  methods: {
    async StartRecording(facingMode) {
      this.facingMode = facingMode
      const constraints = (window.constraints = {
        audio: false, video: { facingMode: facingMode }
      })
      let video = this.$refs.video
      this.mediaStream = await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          video.srcObject = stream
        })
        .catch(error => {
          this.errorStream = true
          console.warn(error)
        })
      return await video.play()
    },
    async TakePhoto() {
      let video = this.$refs.video;
      let canva = this.$refs.canva;
      let width = video.videoWidth;
      let height = video.videoHeight;
      canva.width = width;
      canva.height = height;
      let ctx = canva.getContext("2d");
      ctx.save();

      if (this.facingMode === "user") {
        ctx.scale(-1, 1);
        ctx.drawImage(video, width * -1, 0, width, height);
      } else {
        ctx.drawImage(video, 0, 0);
      }

      ctx.restore();

      this.lastPhoto = {
        id: this.counter++,
        src: canva.toDataURL("image/jpg"),
      };
      // this.photos.push(this.lastPhoto);
    },
    async switchCamera() {
      this.switchingCamera = true;
      const tracks = this.mediaStream.getVideoTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      await this.StartRecording(
        this.facingMode === "environment" ? "user" : "environment"
      );
      this.switchingCamera = false;
    },
    // when camera is not available
    uploadPhoto(event) {
      const data = URL.createObjectURL(event.target.files[0])
      this.lastPhoto = {
        id: this.counter++,
        src: data,
      }
      let canva = this.$refs.canva
      let ctx = canva.getContext("2d")
      var reader = new FileReader()
      reader.onload = function(event){
          var img = new Image()
          img.onload = function() {
              ctx.save();
              canva.width = 500
              canva.height = 400
              ctx.drawImage(img, 0, 0)
              ctx.restore();
          }
          img.src = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0])
    },
  },
  async mounted() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    this.videoDevices = devices.filter((d) => d.kind === "videoinput");
    await this.StartRecording(
      this.videoDevices.length === 1 ? "user" : "environment"
    );
  },
};
</script>

<style scoped>
.video.front {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.wrapper {
/*  background-color: black;
  width: 100vw;
  height: 100vh;*/
  display: grid;
  grid-template-columns: [left] 5vw [bs] 90vw [es] 5vw [right];
  grid-template-rows: [top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];
  justify-items: center;
  overflow: hidden;
}

.video {
  width: 100%;
  max-height: 500px;
  overflow: hidden;
  grid-column: left/right;
  grid-row: top / bottom;
  user-select: none;
  max-width: unset;
}

.switch-button {
  grid-column: bs / es;
  grid-row: bs / es;
  z-index: 5;
  border-radius: 100%;
  width: 6vh;
  height: 6vh;
  font-size: 2vh;
}

.photo-button-container {
  grid-column: left / right;
  grid-row: middle / bottom;
  z-index: 5;
  width: 100vw;
  height: 10vh;
  display: flex;
  justify-content: center;
}

.photo-button {
  height: 8vh; width: 8vh;
  font-size: 8vh;
  padding: 2vh;
  border-radius: 8vh;
  margin-bottom: 2vh;
  background: white;
  box-shadow: 5px 5px 5px rgba(0,0,0,0);
}
/*.photo-button:active, */
.photo-button:hover {
  background: lightgreen;
  opacity: 0.5;
}
.photo-button span {
  font-size: 0.5em;
}

.gallery {
  grid-column: left / right;
  grid-row: bottom / end;
}
</style>
