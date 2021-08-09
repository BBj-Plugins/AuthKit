
const msalConfig = {
    auth: {
        clientId: 'ffa8d048-b947-4e4c-a04f-99e058285a44',
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:8888/loggedin"
    }
};


var loginRequest = {
    scopes: ["user.read"] 
};

const msalInstance = new msal.PublicClientApplication(msalConfig);


function doMicrosoftWidgetLogin(){
	msalInstance.loginPopup(loginRequest)
		.then(response => {
            var custom=new CustomEvent('custom_event',{bubbles:true,cancelable:true});
            custom.myElement='jsfunction'; custom.token = response.accessToken;
            var element=document.getElementById('myPMS');
            window.basisDispatchCustomEvent(element,custom);
      }).catch(error => {
        console.log(error);
      });
}

console.log("loaded MS login libs");