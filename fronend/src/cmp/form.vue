<template>
<section>

  <ValidationProvider name="email" rules="required">
    <div slot-scope="{ errors }">
      <input v-model="email" />

      <p>{{ errors[0] }}</p>
    </div>
  </ValidationProvider>

</section>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
  data() {
    return {
      email: "",
      text:''
    };
  },
};
</script>

<style scoped>
p {
  color: red;
}
</style>