# UniWay

UniWay is a smart indoor navigation mobile application developed for Umm Al-Qura University. The application helps students and visitors identify their current classroom location using image-based sign recognition, search for destination classrooms, save frequently used rooms, and preview the navigation route.

The system combines a React Native mobile application, a FastAPI backend, a machine learning/OCR pipeline, Firestore database records, and a Unity-based AR navigation module.

---

## Project Overview

University buildings can be difficult to navigate, especially for new students and visitors. UniWay addresses this problem by allowing users to capture a classroom sign image and use the detected classroom information as the starting point for navigation.

The main workflow is:

1. Capture or select an image of a classroom sign.
2. Send the image to the backend prediction API.
3. Receive the detected classroom information.
4. Confirm the detected location.
5. Search for a destination classroom.
6. Open the AR navigation preview.
7. Save important classrooms to bookmarks.

---

## Main Features

* Classroom sign image capture using camera or gallery.
* Machine learning/OCR-based classroom recognition.
* Confirmation screen for detected classroom information.
* Classroom search connected to backend API.
* Device-based saved bookmarks.
* Unity AR navigation module integrated into the Android project.
* Safe AR preview screen for stable emulator demonstration.
* Android demo build support.

---

## Technology Stack

### Frontend / Mobile App

* React Native CLI
* TypeScript
* React Navigation
* React Native Image Picker
* AsyncStorage
* React Native SVG
* Android Studio Emulator

### Backend / AI API

* Python
* FastAPI
* Uvicorn
* YOLOv8 / custom signage detection model
* EasyOCR
* OpenCV
* Firestore
* Hugging Face Spaces

### AR / Unity

* Unity
* Unity NavMesh / AI Navigation
* ARCore
* AR Foundation
* IL2CPP
* ARM64 Android export
* Unity Android export folders: `unityLibrary` and `shared`

---

## Backend API

The hosted backend API is:

```text
https://rayouf0-uniway-backend-core.hf.space
```

### Main Endpoints

| Feature            | Method | Endpoint                            | Description                                           |
| ------------------ | ------ | ----------------------------------- | ----------------------------------------------------- |
| Signage Prediction | POST   | `/predict`                          | Uploads an image and returns detected classroom data. |
| Classroom Search   | GET    | `/classrooms/search?query=CLASS_ID` | Searches classroom records by room ID or name.        |
| Fetch Bookmarks    | GET    | `/bookmarks/my`                     | Retrieves bookmarks for the current device.           |
| Add Bookmark       | POST   | `/bookmarks/add`                    | Saves a classroom bookmark for the current device.    |

### Bookmark Header

Bookmark endpoints require a device identifier:

```text
x-device-id: YOUR_DEVICE_TOKEN
```

The mobile app generates and stores this device ID locally using AsyncStorage.

### Prediction Request

The `/predict` endpoint expects form-data:

```text
key: file
type: image
```

Example returned classroom data may include:

```json
{
  "status": "success",
  "data": {
    "processed_room_id": "D101",
    "className": "D101",
    "buildingId": "D",
    "floorNum": "1",
    "description": "Classroom location description"
  }
}
```

---

## Project Structure

```text
UniWay/
├── android/
│   ├── app/
│   ├── unityLibrary/
│   └── shared/
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── navigation/
│   ├── screens/
│   │   ├── ar/
│   │   ├── bookmarks/
│   │   ├── capture/
│   │   ├── confirm/
│   │   ├── home/
│   │   ├── info/
│   │   └── search/
│   └── services/
│       └── api/
├── App.tsx
├── index.js
├── package.json
└── README.md
```

---

## Important Branches

| Branch                   | Purpose                                                                   |
| ------------------------ | ------------------------------------------------------------------------- |
| `danah`                  | Main frontend development branch.                                         |
| `unity-ar-integration`   | Branch used for Unity AR Android integration.                             |
| `final-demo-integration` | Final demo branch containing safe AR preview and latest integration work. |

Recommended demo branch:

```text
final-demo-integration
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/donnadoe0x/uniway.git
cd uniway
```

### 2. Checkout the demo branch

```bash
git checkout final-demo-integration
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start Android emulator

Open Android Studio, then start a normal Android emulator from Device Manager.

For frontend testing, use an x86_64 emulator. Full real Unity AR runtime requires a compatible ARM64 Android ARCore device.

### 5. Bundle JavaScript for Android

This project can run without Metro by bundling the JavaScript into the Android app:

```bash
mkdir android/app/src/main/assets

npx react-native bundle --platform android --dev true --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

### 6. Build the Android app

```bash
cd android
./gradlew assembleDebug
```

On Windows PowerShell:

```powershell
cd android
.\gradlew assembleDebug
```

### 7. Install the app on emulator/device

```bash
./gradlew installDebug
```

On Windows PowerShell:

```powershell
.\gradlew installDebug
```

### 8. Open the app manually if needed

```bash
adb shell monkey -p com.uniway 1
```

---

## Running with Metro During Development

For normal React Native development, Metro can also be used.

Terminal 1:

```bash
npx react-native start --reset-cache
```

Terminal 2:

```bash
adb reverse tcp:8081 tcp:8081
npx react-native run-android
```

If Metro is not used, remember to rebundle JavaScript after every frontend code change.

---

## Demo Flow

Recommended flow for the final demo:

1. Open the UniWay app.
2. Go to the Capture screen.
3. Capture or select a classroom sign image.
4. View the detected classroom on the Confirmation screen.
5. Save the classroom to bookmarks if needed.
6. Search for a destination classroom.
7. Select the destination.
8. Open the AR Navigation preview.
9. Press Start Navigation.
10. Press Simulate Arrival.

---

## AR Implementation Notes

The Unity AR module was prepared using imported 3D building models. The models were adjusted inside Unity, walkable corridor areas were prepared using NavMesh, and destination points were added for navigation.

The Unity project was exported for Android and integrated into the React Native Android project using the generated `unityLibrary` and `shared` folders.

Because the available emulator uses x86 architecture while the Unity AR module requires ARM64 and ARCore support, full Unity AR runtime testing is limited on the emulator. For this reason, the final demo uses a safe React Native AR preview screen. The real Unity AR module remains integrated and can be tested on a compatible Android ARCore device.

---

## Current Limitations

* Full real Unity AR runtime testing requires a compatible Android ARCore ARM64 device.
* The emulator is used mainly for frontend, backend, and demo flow testing.
* Internet connection is required for image prediction, classroom search, and bookmark operations.
* Bookmark deletion is not fully supported unless a delete endpoint is added to the backend.
* iOS support is considered future work.

---

## Future Work

* Test Unity AR navigation on a real Android ARCore device.
* Improve real-world AR path alignment and tracking.
* Add more buildings, floors, and classroom records.
* Add support for stairs, elevators, and accessible routes.
* Improve OCR accuracy with more signage images.
* Add an admin dashboard for updating classroom and building data.
* Add offline caching for classroom records and bookmarks.
* Add iOS support using ARKit.

---

## Team Members

* Danah Abdulrahman Alsurayhi (leader)
* Ghala Abdul Rahim Al-Lahabi
* Ruyuf Khamis Aljubayri
* Maria Walid Alsharif

Supervised by Dr. Manal Khayyat.

---

## Repository Notes

This repository contains the mobile application and Android Unity integration files. Backend code is maintained separately in the backend repository and deployed through Hugging Face Spaces.

Do not commit private files such as Firebase service account keys, environment secrets, or local machine paths.
