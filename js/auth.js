signUp =async (event) => {
    event.preventDefault();
    const email = document.querySelector("#signupEmail");
    const password = document.querySelector("#signupPassword");
    console.log(email.value, password.value);
    try {
        
    result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    M.toast({html : `Welcome ${result.user.email} !` , classes : 'green'});

        // console.log(result);
    } catch (error) {
        M.toast({html : error.message , classes : 'red'});
        // M.toast({html: "result.message"})

    }
    
  };