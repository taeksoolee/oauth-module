var naverLogin = null;
var tokens = {
  kakao: null,
  naver: null,
  google: null,
  facebook: null,
};

const initAuthConfig = (config) => {
  if(!config) {
    console.error('auth config is undefined or null');
  }

  const {kakaoConfig, firebaseConfig, naverConfig} = config;

  if(typeof Kakao !== 'undefined' && kakaoConfig) {
    Kakao.init(kakaoConfig.apiKey);
    if(Kakao.isInitialized()) {
      console.log('success kakao init');
    } else {
      console.error('failed kakao init');
    }
  }

  if(typeof firebase !== 'undefined' && firebaseConfig) {
    firebase.initializeApp(firebaseConfig);
    console.log('firebase initializeApp');
  }

  if(typeof naver_id_login !== 'undefined' && naver_id_login) {
    naverLogin = new naver_id_login(naverConfig.clientId, naverConfig.domain + '/naver/callback');
    naverLogin.setDomain(naverConfig.domain);

    console.log('create naver_id_login');
  }
}

const initKakaoAuth = async (loginBtn, successCallback, failedCallback) => {
      Kakao.Auth.createLoginButton({
        container: loginBtn,
        success() {
          Kakao.API.request({
            url: '/v2/user/me',
            success: function(response) {
              successCallback && successCallback(response);
            },
            fail: function(error) {
              failedCallback && failedCallback(error);
            }
          });
        }
      });
}

const initNaverAuth = (createFunc) => {
  if(!document.getElementById('naver_id_login')) {
    console.error('naver_id_login button is not rendered');
    return;
  }
  
  const state = naverLogin.getUniqState();
  naverLogin.setState(state);
  if(createFunc) {
    createFunc(naverLogin);
  } else {
    console.warn('naver_id_login button create function undefined');
  }
  
  naverLogin.init_naver_id_login();
}

const getNaverInfo = (callback) => {
  console.log(naverLogin.oauthParams.access_token);
  naverLogin.get_naver_userprofile("naverSignInCallback()");

  window.naverSignInCallback = () => {
    if(!callback) {
      console.error('getNaverInfo callback is null');
      return;
    }

    callback(naverLogin);
  }
}

const initFirebaseAuth = (type, loginBtn, successCallback, failedCallback) => {
  let provider = null;

  switch(type) {
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    case 'facebook':
      provider = new firebase.auth.FacebookAuthProvider();
      break;
    case 'apple':
      provider = new firebase.auth.OAuthProvider('apple.com');
      break;
  }    
  
  loginBtn.addEventListener('click', () => {
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      successCallback && successCallback(result);
    }).catch((error) => {
      console.error('oauth error ::: ', error);
      failedCallback && failedCallback(error);
    });
  });
}