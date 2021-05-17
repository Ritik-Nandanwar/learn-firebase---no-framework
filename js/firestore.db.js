const userInfoDiv = document.querySelector(".userInfo");
const editProfileForm = document.querySelector("#editProfileForm");
function createUserCollection(user) {
  firebase.firestore().collection("users").doc(user.uid).set({
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    phone: "",
    speciality: "",
    portfolioUrl: "",
  });
}

async function displayUserInfo(userId) {
  if (userId) {
    userInfoSnapshot = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();
    var actualInfo = userInfoSnapshot.data();
    if (actualInfo) {
      userInfoDiv.innerHTML = `
        <h3> ${actualInfo.name} </h3>
        <h3> ${actualInfo.email} </h3>
        <h3> ${actualInfo.phone} </h3>
        <h3> ${actualInfo.speciality} </h3>
        <h3> ${actualInfo.portfolioUrl} </h3>
        <h3> ${actualInfo.speciality} </h3>
        `;
    }
    console.log(actualInfo);
  } else {
    userInfoDiv.innerHTML = `<h2> Please Login ! </h2>`;
  }
}

async function displayUserInfoInRealTime(userId) {
  if (userId) {
    userDocRef = await firebase.firestore().collection("users").doc(userId);

    userDocRef.onSnapshot((doc) => {
      if (doc.exists) {
        var actualInfo = doc.data();
        if (actualInfo) {
          userInfoDiv.innerHTML = `
          <h3> ${actualInfo.name} </h3>
          <h3> ${actualInfo.email} </h3>
          <h3> ${actualInfo.phone} </h3>
          <h3> ${actualInfo.speciality} </h3>
          <h3> ${actualInfo.portfolioUrl} </h3>
          <button class="btn blue modal-trigger" href="#modal3">Update</button>
          `;
          editProfileForm["profileEmail"].value = actualInfo.email;
          editProfileForm["profileName"].value = actualInfo.name;
          editProfileForm["profilePhone"].value = actualInfo.phone;
          editProfileForm["profileSpeciality"].value = actualInfo.speciality;
          editProfileForm["profilePortfolioUrl"].value =
            actualInfo.portfolioUrl;

          console.log(actualInfo);
        }
      } else {
        userInfoDiv.innerHTML = `<h2> Please Login ! </h2>`;
      }
    });
  }
}

function updateUserProfile(event) {
  event.preventDefault();
  const userDocRef = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  userDocRef.update({
    email: editProfileForm["profileEmail"].value,
    name: editProfileForm["profileName"].value,
    phone: editProfileForm["profilePhone"].value,
    speciality: editProfileForm["profileSpeciality"].value,
    portfolioUrl: editProfileForm["profilePortfolioUrl"].value,
  });
  M.Modal.getInstance(myModal[2]).close();
}
