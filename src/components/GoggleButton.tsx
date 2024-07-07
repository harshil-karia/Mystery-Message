// import React, { useEffect } from 'react';
// import Head from 'next/head';

// const GoogleSignInButton: React.FC = () => {
//   useEffect(() => {
//     const renderButton = () => {
//       if (window.gapi) {
//         window.gapi.signin2.render('my-signin2', {
//           scope: 'profile email',
//           width: 240,
//           height: 50,
//           longtitle: true,
//           theme: 'dark',
//           onsuccess: onSuccess,
//           onfailure: onFailure,
//         });
//       }
//     };

//     const onSuccess = (googleUser: any) => {
//       console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//     };

//     const onFailure = (error: any) => {
//       console.log(error);
//     };

//     // Load the Google Platform Library
//     const loadGooglePlatform = () => {
//       const script = document.createElement('script');
//       script.src = 'https://apis.google.com/js/platform.js?onload=initGoogleSignIn';
//       script.async = true;
//       script.defer = true;
//       document.body.appendChild(script);
//     };

//     // Initialize the Google Platform Library
//     window.initGoogleSignIn = () => {
//       if (window.gapi) {
//         renderButton();
//       }
//     };

//     loadGooglePlatform();
//   }, []);

//   return (
//     <div>
//       <Head>
//         <meta name="google-signin-client_id" content={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`} />
//       </Head>
//       <div id="my-signin2"></div>
//     </div>
//   );
// };

// export default GoogleSignInButton;
