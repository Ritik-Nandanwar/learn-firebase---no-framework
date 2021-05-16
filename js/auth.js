const myModal = document.querySelectorAll(".modal");
signUp = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#signupEmail");
  const password = document.querySelector("#signupPassword");
  console.log(email.value, password.value);
  try {
    result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value);
      await result.user.updateProfile({
          displayName: "User"
      })
      await result.user.sendEmailVerification()
    M.toast({ html: `Welcome ${result.user.email} !`, classes: "green" });

    // console.log(result);
  } catch (error) {
    M.toast({ html: error.message, classes: "red" });
    // M.toast({html: "result.message"})
  }
  email.value = "";
  password.value = "";
  M.Modal.getInstance(myModal[1]).close();
};
login = async (event) => {
  event.preventDefault();
  const email = document.querySelector("#loginEmail");
  const password = document.querySelector("#loginPassword");
  console.log(email.value, password.value);
  try {
    result = await firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value);
    M.toast({ html: `Welcome ${result.user.email} !`, classes: "green" });

    // console.log(result);
  } catch (error) {
    M.toast({ html: error.message, classes: "red" });
    // M.toast({html: "result.message"})
  }
  password.value = "";
  email.value = "";
  M.Modal.getInstance(myModal[0]).close();
};
const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(M.toast({ html: "Logged out" }));
};

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(user);
  } else {
    console.log("Not logged in");
  }
});

function loginInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
}
