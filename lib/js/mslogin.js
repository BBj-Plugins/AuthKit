
const msalConfig = {
    auth: {
        clientId: '$$CLIENTID',
        authority: '$$AUTHORITY',
        redirectUri: '$$REDIRECTURI'
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

function doMicrosoftWidgetLogout() {
	msalInstance.logoutPopup();
}