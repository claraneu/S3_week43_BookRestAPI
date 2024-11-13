//add base URL (api)
const baseUrl = "https://anbo-restbookquerystring.azurewebsites.net/api/books"


Vue.createApp({
    data() {
      return {
        books: [],
        deleteId: 0,
        book: {
            id: null,
            title: "",
            price: null
        },
        addMessage:"",
        
      };
    },
    methods: 
    { 
      // GetAll 
        getAllBooks() {
            this.helperGetAndShow(baseUrl)
        },

        async helperGetAndShow(url)
        {
        try {
            const response = await axios.get(url);
            //response.data is only an array if we retrieve more than one object
            if (response.data.length > 1)
                this.books = response.data; // Assuming response.data is an array of book objects
            else
                books = this.books.push(response.data) //else add single object to books array so it shows properly

            this.addMessage = 'Books retrieved successfully!';
        } catch (ex) {
            this.addMessage = `Error retrieving books: ${ex.message}`;
            console.error(ex); // Log the error for debugging
        }
        },

        async addBook() {
            try 
            {   //get all books
                const response = await axios.post(baseUrl, this.book)
                this.getAllBooks()
                this.addMessage = "Response for POST Request: " + response.status + " " + response.statusText
                //clear input fields
                this.book = { id: 0, title: "", price: 0 };

            }
                //catch errors
            catch(ex)
            {
                alert(ex.message)
            }
            },

        async getById(id) {
            try
            {
                const newUrl = baseUrl + "/" + id
                //clear table before getting the single object
                this.books = []
                const response = this.helperGetAndShow(newUrl)
                

            }
            catch(ex)
            {
                alert(ex.message)
            }
            
        },

        async deleteById() {
            try
            {
                const newUrl = baseUrl + "/" + this.deleteId
                const response = await axios.delete(newUrl)
                this.addMessage = "Response for DELETE Request: " + response.status + " " + response.statusText
                this.getAllBooks() //call getAll to see updated list of books

                

            }
            catch(ex)
            {
                alert(ex.message)
            }
            
        }
    },

    /* Fetch books when the component is mounted
    mounted() {
        this.getAllBooks();
    }*/
    
  }).mount("#app");
  