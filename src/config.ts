const isProduction = process.env.REACT_APP_ENV === 'release';

export default isProduction
  ? {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
    }
  : {
      apiKey: process.env.REACT_APP_DEV_API_KEY,
      authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
      projectId: process.env.REACT_APP_DEV_PROJECT_ID,
      storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_DEV_APP_ID,
    };
