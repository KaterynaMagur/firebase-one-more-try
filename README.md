# Test React-Firebase project

## Setup
```
npm install
```
Create __.env.local__ file in a root project directory with Firebase credentials
```
REACT_APP_FIREBASE_API_KEY=<your_api_key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
REACT_APP_FIREBASE_PROJECT_ID=<your_project_id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_messageing_sender_id>
REACT_APP_FIREBASE_APP_ID=<your_app_id>
```

Set rules inside Firestore settings:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {               // ---------> Catch userId as /users document and allow CRUD
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /products/{document=**} {     // ---------> allow everything for subcollection products
      	allow read, write: if true;
      }
    }
  }
}
```