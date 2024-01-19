const vue = Vue.createApp({
    data() {
        return {
            roomInModal: { name: null },
            rooms: [],
            clientInModal: { name: null },
            clients: [],    
            bookingInModal: { roomName: null },  
            bookings: [],
            bookingForm: {
                checkIn: '',
                checkOut: '',
                name: '',
                birthDate: '',
                email: '',
                telephone: '',
                address: '',
                roomID: null,
              },
            //   availableRooms: [],
            //   availableRoomsData: [],
            //   clientData:[],
        };
    },

         
    async created() {
        try {
            this.rooms = await (await fetch('http://localhost:8080/rooms')).json();
            this.clients = await (await fetch('http://localhost:8080/clients')).json();
            this.bookings = await (await fetch('http://localhost:8080/bookings')).json();
    
            console.log('Fetched rooms:', this.rooms);
            console.log('Fetched clients:', this.clients);
            console.log('Fetched bookings:', this.bookings);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    

methods: {
    getRoom: async function (id) {
        try {
            console.log('Fetching room data...');
            this.roomInModal = await (await fetch(`http://localhost:8080/rooms/${id}`)).json();
            console.log('Room data:', this.roomInModal);
            
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    },

    openBookingModal: async function(roomId) {
        try {
            // Fetch room data by ID
            const response = await fetch(`http://localhost:8080/rooms/${roomId}`);
            const roomData = await response.json();

            // Update roomInModal
            this.roomInModal = roomData;
            // Update roomID in the bookingForm
             this.bookingForm.roomID = this.roomInModal.Id;

            // Update bookingInModal with room name
            this.bookingInModal.roomName = this.roomInModal.Name;
            // Open bookingModal
            const bookingModal = new bootstrap.Modal(document.getElementById('bookingModal'), {});
            bookingModal.show();
            
            console.log('Booking data:', this.bookingInModal);
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    },

    async submitBookingForm() {
        try {
            const formData = {
                    RoomID: this.roomInModal.Id,
                    clientData: {
                    Name: this.bookingForm.name,
                    BirthDate: this.bookingForm.birthDate,
                    Telephone: this.bookingForm.telephone,
                    Email: this.bookingForm.email,
                    Address: this.bookingForm.address,
                },
                // startTime: new Date(this.bookingForm.checkIn).toISOString(), // Format date string
                // endTime: new Date(this.bookingForm.checkOut).toISOString(), // Format date string
                StartTime: this.bookingForm.checkIn,
                EndTime: this.bookingForm.checkOut,
            }
            const response = await fetch('http://localhost:8080/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log('Server Response:', result);

            if (result.success) {
                console.log('Booking submitted successfully. Booking ID:', result.bookingId);
                alert(`Booking submitted successfully. Your Booking ID is: ${result.bookingId}`);

                console.log('Booking form data:', this.bookingForm);

            } else {
                console.error('Error submitting booking:', result.error);
            }

        } catch (error) {
            console.error('Error submitting booking:', error);
        }
        this.resetBookingForm();
    },

    resetBookingForm() {
        this.bookingForm = {
          roomID: null,
          checkIn: null,
          checkOut: null,
          name: '',
          birthDate: null,
          email: '',
          telephone: '',
          address: ''
        };
    },

    getClient: async function (id) {
        console.log('Fetching client data...');
        this.clientInModal = await (await fetch(`http://localhost:8080/clients/${id}`)).json();
        console.log('Client data:', this.clientInModal);
    },

    getBooking: async function (id) {
        console.log('Fetching booking data...');
        this.bookingInModal = await (await fetch(`http://localhost:8080/bookings/${id}`)).json();
        console.log('Booking data:', this.bookingInModal);
    },

//     getAvailableRooms: async function () {
//         try {
//             console.log('Fetching available rooms data...');
//             const response = await fetch(`http://localhost:8080/getavailablerooms/`);
//             const availableRoomsData = await response.json();
    
//             // Assuming that the server response is an array of available rooms
//             this.availableRooms = availableRoomsData;
    
//             // For debugging purposes, log the available rooms
//             console.log('Available rooms data:', this.availableRooms);
//         } catch (error) {
//             console.error('Error fetching available rooms data:', error);
//         }
//     },

//    bookAllAvailableRooms: async function() {
        
//             try {
//               const formData = {
//                 startTime: this.bookingForm.checkIn,
//                 endTime: this.bookingForm.checkOut,

//                 clientData: {
//                   Name: this.bookingForm.name,
//                   BirthDate: this.bookingForm.birthDate,
//                   Telephone: this.bookingForm.telephone,
//                   Email: this.bookingForm.email,
//                   Address: this.bookingForm.address,
//                 },
//               };

//               const response = await fetch('http://localhost:8080/bookAllAvailableRooms', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//               });
          
//           const result = await response.json();
         
//           // If the request is successful, update availableRooms and open the modal
//     if (result.success) {
//         this.availableRooms = result.availableRooms;   
//         // Open the modal to display available rooms
//         const bookAllModal = new bootstrap.Modal(document.getElementById('bookAllModal'), {});
//         bookAllModal.show();
//       } else {
//         console.error('Error fetching available rooms:', result.error);
//       }
//     } catch (error) {
//       console.error('Error fetching available rooms:', error);
//     }
//   }
},

}).mount('#app');