<template>
    <div class="cell">
        <img class="cell__image" :src="$props.image" alt="galaxy image">
        <p class="cell__text">{{$props.text}}</p>
    </div>
</template>

<script>
  export default {
    name: 'CellName',
    props: {
      image: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      }
    }
  };
</script>
