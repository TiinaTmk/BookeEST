    const vue = Vue.createApp({
      data() {
        return {
          roomInModal: {name: null},
          rooms: []
        }
      },
      async created() {
        this.rooms = await (await fetch ('http://localhost:8080/rooms')).json();
      },
      methods: {
        getRoom: async function (id) {
          this.roomInModal = await(await fetch(`http://localhost:8080/rooms/${id}`)).json();
          let roomInModal = new bootstrap.Modal(document.getElementById('roomInfoModal'), {})
          roomInModal.show();
    }
  }
    }).mount('#app')