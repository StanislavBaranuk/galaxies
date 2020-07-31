<template>
    <div class="cell">
        <p class="cell__text">{{$props.text}}</p>
    </div>
</template>

<script>
  export default {
    name: 'CellText',
    props: {
      text: {
        type: String,
        default: ''
      }
    }
  };
</script>
