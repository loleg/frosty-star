<template>
  <div class="max-w-screen-xl px-4 py-0 mx-auto text-center">

    <q-button
      v-if="videoDevices.length > 1 && !errorStream"
      class="photo-button"
      @click="switchCamera"
      :disabled="switchingCamera"
      icon="q-icon-reverse" />

    <video
      muted playsinline autoplay
      class="video"
      :class="facingMode === 'user' ? 'front' : ''"
      ref="video"
      v-if="!errorStream && showStream"
    />

    <div
        class="text-center button-container"
        v-if="!errorStream">

      <q-button
        class="photo-button"
        @click="TakePhoto">
        &#128247;
      </q-button>

      <p class="py-5">
        Something not working?
        <a href="#" @click="startUpload">
          Switch to upload mode</a>.
      </p>
    </div>

    <div class="upload-container py-6" v-if="errorStream">
      <q-upload
        v-if="showUpload"
        accept="image/*"
        textUploadFile="Take a photo of the product"
        @change="uploadPhoto($event)"
      />
      <q-button
        @click="startUpload"
        v-if="!showUpload">
        Take another
      </q-button>
    </div>

    <div class="canvas-container">
      <canvas style="display:none" ref="canva" />
    </div>

    <q-drawer
        v-model:visible="drawer"
        :width="300"
    >
      <image-scan :photo="lastPhoto" />
    </q-drawer>
  </div>
</template>

<script>
import ImageScan from "./ImageScan.vue"
import { ref } from 'vue';

export default {
  components: {
    ImageScan,
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
      showStream: true,
      showUpload: true,
      drawer: true,
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
        src: canva.toDataURL("image/png"),
        width: width, height: height
      };
      // this.photos.push(this.lastPhoto);
      this.drawer = true
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
      this.switchingCamera = false
    },
    // when camera is not available
    startUpload() {
      this.showUpload = true
      this.errorStream = true
    },
    uploadPhoto(event) {
      const data = URL.createObjectURL(event.target.files[0])
      let self = this
      let canva = this.$refs.canva
      let ctx = canva.getContext("2d")
      var reader = new FileReader()
      reader.onload = function(event){
          var img = new Image()
          img.onload = function() {
              ctx.save()
              canva.style.display = ""
              canva.height = 400
              canva.width = canva.height *
                            (canva.clientWidth / canva.clientHeight);
              ctx.drawImage(
                img,
                0, 0,
                canva.width, img.height * canva.width / img.width
              )
              ctx.restore()
          }
          img.src = event.target.result

          self.drawer = true
          self.showUpload = false;
          self.lastPhoto = {
            id: self.counter++,
            src: data,
            width: img.width, height: img.height
          }
      }
      if (event.target.files.length) {
        reader.readAsDataURL(event.target.files[0])
      }
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

canvas {
  display: inline-block;
  border: 4px double grey;
  background: #999;
}

.video {
  width: 100%;
  max-height: 480px;
  overflow: hidden;
  /* grid-column: left/right;
  grid-row: top / bottom; */
  user-select: none;
  max-width: unset;
}
/*
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
  min-height: 10vh;
  display: flex;
  justify-content: center;
} */

.photo-button {
  /* height: 8vh; width: 8vh; */
  font-size: 4vh;
  /* border-radius: 8vh; */
  /* margin-bottom: 2vh; */
  /* background: white; */
  /* box-shadow: 5px 5px 5px rgba(0,0,0,0); */
}
/*.photo-button:active, */
.photo-button:hover {
  background: lightgreen;
  opacity: 0.5;
}
.photo-button span {
  font-size: 0.5em;
}

</style>
