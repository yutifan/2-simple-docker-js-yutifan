
const Books = {
  data() {
    return {
        books: [],
        bookForm: {},
        selectedBook: null  
      }
  },
  computed: {},
  methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },
      selectBook(b) {
          if (b == this.selectedBook) {
              return;
          }
          this.selectedBook = b;
          this.books = [];
          this.fetchBookData(this.selectedBook);
      },
      fetchBookData() {
          fetch('/api/book/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      postBook(evt){
          if (this.selectedBook){
              this.postEditBook(evt);
          } else{
              this.postNewBook(evt);
          }
      },
      postNewBook(evt) {     
        console.log("Posting:", this.bookForm);
        alert("Posting!");
  
        fetch('api/book/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form  （clean the form)
            this.bookForm = {};
          });
      },      
      postEditBook(evt){
          this.bookForm.id = this.selectedBook.id; 
          // this.Form.book_Id = this.selectedBook.id;

          console.log("Editing:", this.bookForm);

          fetch('api/book/update.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form  （clean the form)
            this.handleResetEdit();
          });
      },
      postDeleteBook(b) {  
        if ( !confirm("Are you sure you want to delete the book from " + b.title + "?") ) {
            return;
        }  
        
        console.log("Delete!", b);

          fetch('api/book/delete.php', {
              method:'POST',
              body: JSON.stringify(b),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form  （clean the form)
              this.bookForm = {};
            });
        
        },
    handleEditBook(book){
      this.selectedBook = book;
      this.bookForm = Object.assign({}, this.selectedBook);
    },
    handleResetEdit(){
      this.selectedBook = null;
      this.bookForm = {};
    }

},

  created() {
    return this.fetchBookData();
  }
}

Vue.createApp(Books).mount('#bookApp');