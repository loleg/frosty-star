<template>
  <div class="wrapper">
    <video
      class="video"
      :class="facingMode === 'user' ? 'front' : ''"
      ref="video"
    />
    <canvas style="display: none" ref="canva" />

    <n-button circle
      v-if="videoDevices.length > 1"
      class="switch-button"
      @click="switchCamera"
      :disabled="switchingCamera"
    >
      <CameraSwitch24Regular />
    </n-button>

    <div class="photo-button-container">
      <n-button circle
        class="photo-button"
        title="Yes We Scan!"
        @click="TakePhoto"
      >
        <Camera24Filled />
      </n-button>
    </div>

    <image-scan class="results" :photos="photos" />
  </div>
</template>

<script>
import ImageScan from "./ImageScan.vue";

import { NButton } from 'naive-ui'
import { Camera24Filled } from '@vicons/fluent'
import { CameraSwitch24Regular } from '@vicons/fluent'

export default {
  components: {
    ImageScan,
    NButton,
    Camera24Filled, CameraSwitch24Regular
  },
  data() {
    return {
      photos: [],
      mediaStream: null,
      videoDevices: [],
      facingMode: "environment",
      counter: 0,
      switchingCamera: false,
    };
  },
  methods: {
    async StartRecording(facingMode) {
      this.facingMode = facingMode;
      let video = this.$refs.video;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode },
      });
      video.srcObject = this.mediaStream;
      return await video.play();
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

      this.photos.push({
        id: this.counter++,
        src: canva.toDataURL("image/png"),
      });
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
  grid-template-columns: [left] 90vw [bs] 5vw [es] 5vw [right];
  grid-template-rows: [top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];
  justify-items: center;
  overflow: hidden;
}

.video {
  height: 100%;
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
  width: 10vh;
  height: 10vh;
}

.gallery {
  grid-column: left / right;
  grid-row: bottom / end;
}
</style>
