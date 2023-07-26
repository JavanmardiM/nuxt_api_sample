<template>
  <h1>employee id is here : {{$route.params.employeeId}}</h1>
</template>

<script>
export default {
      validate(data){
    return /^\d+$/.test(data.params.employeeId)
  }
}
</script>