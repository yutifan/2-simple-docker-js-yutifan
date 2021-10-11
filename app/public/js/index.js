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