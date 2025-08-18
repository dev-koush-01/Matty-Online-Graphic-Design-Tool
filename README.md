# Matty – Online Graphic Design Tool 🎨

Matty is a **full-stack web application** built on the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that allows users to create posters, banners, social media graphics, and other visual content directly from their browser.

Unlike traditional design software, Matty is lightweight, user-friendly, and accessible to students, designers, businesses, and social media managers.

---

## 🚀 Features

* **Drag-and-Drop Canvas Editor** (powered by Excalidraw/fabric.js)
* **Text Styling & Customization** (fonts, colors, rotations, etc.)
* **Undo/Redo Actions** for better control
* **User Authentication** with JWT / OAuth (secure login & sessions)
* **Image Uploads** with AWS S3 / Cloudinary storage
* **Design Management Dashboard** (Save, Load, Update, Delete designs)
* **Export to PNG/PDF** with high resolution
* **Secure APIs** with CORS policies and input validation

---

## 🏗️ System Architecture

* **Frontend (React.js + Redux/Context API)**

  * Interactive drag-and-drop canvas
  * TailwindCSS / MUI for responsive UI
  * Formik + Yup for form validation

* **Backend (Node.js + Express.js)**

  * RESTful APIs for authentication, design management, and media uploads
  * JWT-based authentication for secure sessions
  * Scalable server-side logic

* **Database (MongoDB Atlas)**

  * User Model (username, email, password hash, metadata)
  * Design Model (title, JSON canvas data, thumbnails, timestamps)

* **Cloud Storage (AWS S3 / Cloudinary)**

  * Handles image uploads & retrieval
  * Optimized delivery for media files

* **Deployment**

  * Frontend → Vercel / Netlify
  * Backend → Render / Railway
  * Database → MongoDB Atlas
  * Media Storage → AWS S3

---

## 📂 Project Structure

```
/client
│── /src
│   ├── /assets              # Static files (icons, images)
│   ├── /components          # Components (Login, Dashboard, Navbar, etc.)
│   ├── ExcalidrowEditor.jsx # Main canvas editor
│   ├── Layout.jsx           # Layout component
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point

/server
│── /config         # DB & cloud configs
│── /controllers    # Business logic (Auth, Designs, Uploads)
│── /jwt            # JWT handling
│── /models         # Mongoose models (User, Design)
│── /routes         # API endpoints
│── /middleware     # Auth & error handling
│── index.js        # Backend entry point
│── package.json    # Dependencies
```

---

## 🛠️ Tech Stack

**Frontend:** React.js, Redux, TailwindCSS, Excalidraw
**Backend:** Node.js, Express.js, Mongoose
**Database:** MongoDB Atlas
**Authentication:** JWT
**Storage:** AWS S3
**Version Control:** GitHub
**Deployment:** Vercel (frontend), Render (backend)

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/matty-design-tool.git
   cd matty-design-tool
   ```

2. **Setup Client**

   ```bash
   cd client
   npm install
   npm start
   ```

3. **Setup Server**

   ```bash
   cd server
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Create a `.env` file in `/server` with:

   ```env
   MONGO_URI=your_mongodb_atlas_url
   JWT_SECRET=your_secret_key
   AWS_ACCESS_KEY=your_key
   AWS_SECRET_KEY=your_secret
   AWS_BUCKET_NAME=your_bucket
   ```

---

## 📌 Limitations

* No offline mode (requires internet)
* Export limited to PNG/PDF only
* No mobile app version yet
* Performance may degrade on low-end devices with heavy designs

---

## 🔮 Future Enhancements

* Real-time collaboration (Socket.io)
* Mobile applications (Android & iOS)
* Advanced export formats (SVG, JPEG, GIF)
* Auto-save & version history
* Role-based access & shared workspaces
* Search & tagging system for designs

---

## 👨‍💻 Team Members

* Koushik Chandra
* Disha
* Khushi Tayal
* Ekansh Narayan Mishra
* Shashank Pandey

---

## 📚 References

* [Node.js Docs](https://nodejs.org)
* [Express.js Docs](https://expressjs.com)
* [MongoDB Docs](https://www.mongodb.com/docs)
* [React.js Docs](https://react.dev)
* [MDN Web Docs](https://developer.mozilla.org)

---

✨ *Matty – A lightweight, scalable, and user-friendly graphic design tool for modern creators.*

---
