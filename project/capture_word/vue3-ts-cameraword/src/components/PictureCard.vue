<script setup lang="ts">
import { ref } from 'vue';
import defaultCameraImg from '../assets/camera.png';
import voiceIcon from '../assets/voice.png';


const imgPreview = ref(defaultCameraImg);

const props = defineProps ({
  word: {
    type: String,
    default: ''
  },
  audio: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['updataImage']);

const updateImageData = async (e: Event): Promise<any> => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  return new Promise((resolve, reject) => {
    // 多模态需要的 base64
    const reader = new FileReader();
    reader.readAsDataURL(file);  // 将读取到的二进制文件（File 对象）转化为一个 Base64 编码的字符串。
    reader.onload = () => {
      const data = reader.result as string;
      imgPreview.value = data;
      emit('updataImage', data);
      resolve(data);
    }
    reader.onerror = (error) => {
      reject(error);
    }
  })
}


const playAudio = () => {
  const audio = new Audio(props.audio);
  audio.play();
}

</script>

<template>
  <div class="card">
    <input type="file" id="selectImage" class="input"
      accept="image/*" @change="updateImageData"
    >
    <label for="selectImage" class="upload">
      <img :src="imgPreview" alt="camera" class="img">
    </label>
    <div class="word">
      {{ props.word }}
    </div>
    <div class="playAudio" v-if="audio" @click="playAudio">
      <img :src="voiceIcon" alt="play" width="20px">
    </div>
  </div>
</template>


<!-- 当 <style> 标签带有 scoped attribute 的时候，
 它的 CSS 只会影响当前组件的元素，和 Shadow DOM 中的样式封装类似。 -->
<style scoped>
#selectImage {
display: none;
}
.card {
  border-radius: 8px;
  padding: 20px;
  margin-top: 40px;
  height: 280px;
  box-shadow: rgb(63,38,21) 0 3px 0px 0;
  background-color: rgb(105,78,62);
  box-sizing: border-box;
}
.upload {
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.word {
  margin-top: 20px;
  font-size: 16px;
  color: rgb(255,255,255);
}
.playAudio {
  margin-top: 16px;
}

.playAudio img {
  cursor: pointer;
}
</style>