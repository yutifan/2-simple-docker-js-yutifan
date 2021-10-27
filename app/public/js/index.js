const Offer = { 
    data() { 
    return { 
    "person": undefined,
    "offers": [ 
    { 
    "id": 100, 
    "name": "Jung In Kim", 
    "salary": 180000, 
    "bonus": 10000, 
    "company":"Penn State", 
    "offerDate": "2019-09-08" 
    }, 
    { 
    "id": 200, 
    "name": "Jiro Yoshida", 
    "salary": 80000, 
    "bonus": 2000, 
    "company":"IU", 
    "offerDate": "2021-08-09" 
    } 
    ] 
    } 
    }, 
        computed:{ 
    prettyBirthday( ) { 
    return dayjs(this.person.dob.date) 
    .format ('YYYY年M月D日') 
    } 
    }, 
        methods: { 
    fetchUserData() { 
    console.log("A"); 
    fetch('https://randomuser.me/api/') 
    .then( response => response.json() ) 
    .then( (responseJson) => { 
    console.log(responseJson); 
    console.log("C"); 
    this.person = responseJson.results[0]; 
    }) 
    .catch( (err) => { 
    console.error(err); 
    }) 
    console.log("B"); 
    } 
    }, 
      created() { 
    this.fetchUserData (); 
    } //end created 
    } // end Offer config 
      Vue.createApp(Offer).mount('#userapp'); 
    console.log("Z");

    const SomeApp = {
      data() {
        return {
          students: [],
          selectedStudent: null,
          offers: [],
          offerForm: {},
          selectedOffer: null,
          books: [],
          bookForm: {}
        }
      },
      computed: {},
      methods: {
        prettyData(d) {
          return dayjs(d)
          .format('D MMM YYYY')
        },
        prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
        },
        selectStudent(s) {
          if (s == this.selectedStudent) {
            return;
          }
          this.selectedStudent = s;
          this.offers = [];
          this.fetchOfferData(this.selectedStudent);
        },
        fetchStudentData() {
          fetch('/api/student/')
          .then( response => response.json() )
          .then( (responseJson) => {
            console.log(responseJson);
            this.students = responseJson;
          })
          .catch( (err) => {
            console.error(err);
          })
        },
        fetchOfferData(s) {
          console.log("Fetching offer data for ", s);
          fetch('/api/offer/?student=' + s.id)
          .then( response => response.json() )
          .then( (responseJson) => {
            console.log(responseJson);
            this.offers = responseJson;
          })
          .catch( (err) => {
            console.error(err);
          })
          .catch( (error) => {
            console.error(error);
          });
        },
        postOffer(evt) {
          console.log ("Test:", this.selectedOffer);
          if (this.selectedOffer) {
            this.postEditOffer(evt);
          } else {
          this.postNewOffer(evt);
          }
        },
        postEditOffer(evt) {
          this.offerForm.id = this.selectedOffer.id;
          this.offerForm.studentId = this.selectedStudent.id;        
            
          console.log("Editing!", this.offerForm);
    
          fetch('api/offer/update.php', {
          method:'POST',
          body: JSON.stringify(this.offerForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.offers = json;
                
          // reset the form
          this.handleResetEdit();
          });
        },
        postNewOffer(evt) {
          this.offerForm.studentId = this.selectedStudent.id;        
            
          console.log("Creating!", this.offerForm);
    
          fetch('api/offer/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
            // TODO: test a result was returned!
              this.offers = json;
                
            // reset the form
              this.handleResetEdit();
          });
        },
        postDeleteOffer(o) {
          if ( !confirm("Are you sure you want to delete the offer form" + o.companyName + "?")){
              return;
          }
          console.log("Deleting:", o);
  
          fetch('api/offer/delete.php', {
              method:'POST',
              body: JSON.stringify(o),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              // reset the form
              this.handleResetEdit();
            });
        },
        handleEditOffer(offer) {
          this.selectedOffer = offer;
          this.offerForm = Object.assign({}, this.selectedOffer);
        },
        handleResetEdit() {
          this.selectedOffer = null;
          this.offerForm = {};
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
          .catch( (error) => {
            console.error(error);
          })
        },
        postNewBook(evt) {
          console.log("Posting:", this.bookForm);
    
          fetch('api/book/create.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => {
            this.fetchBookData();
          })
        },
      },
      created() {
          this.fetchStudentData();
          this.fetchBookData();
      }
    }
    
    Vue.createApp(SomeApp).mount('#offerApp');