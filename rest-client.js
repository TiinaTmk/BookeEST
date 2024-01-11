const vue = Vue.createApp({
  data() {
      return {
          roomInModal: {name: null},
          rooms: []
      }
  },
  // async created() {
  //     this.rooms = await (await fetch('http://localhost:8080/rooms')).json();
  // },
  async created() {
    try {
        this.rooms = await (await fetch('http://localhost:8080/rooms')).json();
        console.log('Fetched rooms:', this.rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
},
//   methods: {
//       getRoom: async function (id) {
//           this.roomInModal = await (await fetch(`http://localhost:8080/rooms/${id}`)).json();
//           let roomInfoModal = new bootstrap.Modal(document.getElementById('roomInfoModal'), {})
//           roomInfoModal.show();
//       }
methods: {
    getRoom: async function (id) {
      console.log('Fetching room data...');
      this.roomInModal = await (await fetch(`http://localhost:8080/rooms/${id}`)).json();
      console.log('Room data:', this.roomInModal);
    },
    renderImage(imageData) {
        // Assuming imageData is base64-encoded image data
        return `<img src="data:image/png;base64,${imageData}" alt="Room Image" class="img-fluid">`;
      },

}      
}).mount('#app')	