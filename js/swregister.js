//registers serviceworker (no scope declaration needed)
if ('serviceWorker' in navigator) {
    console.log('Service worker registration in progress.');
    navigator.serviceWorker.register('/sw.js').then(function() {
        console.log('Registration worked!');
    }).catch(function(){
        console.log('Registration failed!');
    })
  } else {
    console.log('Service worker is not supported.');
  }