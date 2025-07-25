  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
  import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDufExYjU8Y2a1FEWwtbX6tNuL3tO8Mo2s",
    authDomain: "login-form-9b836.firebaseapp.com",
    projectId: "login-form-9b836",
    storageBucket: "login-form-9b836.firebasestorage.app",
    messagingSenderId: "878421828817",
    appId: "1:878421828817:web:5941ad4c1605e9fc1551f0",
    measurementId: "G-JTWBWN1RFY"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    messageDiv.style.transition = "opacity 0.5s ease-in-out"; 
    setTimeout(function(){
        messageDiv.style.opacity=0;
    }, 5000);
  }

  const signUp = document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email= document.getElementById('rEmail').value;
    const password= document.getElementById('rPassword').value;
    const firstName= document.getElementById('fName').value;
    const lastName= document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
        const user= userCredential.user;
        const userData ={
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);
    
        })
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode == 'auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
  });

  const signIn = document.getElementById('submitSignIn');
  signIn,addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      showMessage('login is succcessful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId',user.uid);
      window.location.href='homepage.html';
    })
    .catch((error)=>{
      const errorCode=error.code
      if(errorCode==='auth/invalid-credential'){
        showMessage('Incorrect Email or Password', 'signInMessage');
      }
      else{
        showMessage('Account does not Exist', 'signInMessage');
      }
    })
  })
