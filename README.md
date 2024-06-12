# CSI2132_CourseProject
Hotel Management Web App

# Video Link: https://www.youtube.com/watch?v=jQp7h-C48Yw NOTE: Had audio issues, please turn up the volume!

## The Team:
- Justin Bushfield (300188318) - Web Design
- Yasmine Hallak - Database Master
- Jean Alexandre Alloh - Team Glue and Fixit Extraordinaire


# Basic overview:
DB setup (schema, relations, seed data) in **backend > db.sql**
DB queries (transform room booking to room renting, views, etc) in **root > db_methods.sql**
   These will eventually be translated into routes in **backend > index.js** under the Routes header

## Technologies
Using PERN stack (PostgreSQL, Express.js, React, Node.js)

## First-time Setup
1. **Install Node.js and npm**:
   - Download and install [Node.js](https://nodejs.org/) from the official website.
   - Follow the installation instructions provided for your operating system.
   - Verify the installation by opening a terminal/command prompt and running:
     ```
     node -v
     npm -v
     ```

2. **Clone the Project Repository**:
   - Clone the repository to your local machine using Git:
     ```
     git clone <repository-url>
     ```
   - Navigate into the project directory:
     ```
     cd <project-folder>
     ```

3. **Install Backend Dependencies**:
   - Open a terminal/command prompt and navigate to the project's backend directory.
   - Install backend dependencies using npm:
     ```
     cd backend
     npm install
     ```

4. **Install Frontend Dependencies**:
   - Navigate to the project's frontend directory.
   - Install frontend dependencies using npm:
     ```
     cd client
     npm install
     ```

5. **Start Development Servers**:
   - Start the backend server:
     ```
     cd backend
     npm start
     ```
   - Start the frontend server (in a separate terminal/command prompt):
     ```
     cd client
     npm start
     ```

6. **Access the Application**:
   - Open a web browser and navigate to `http://localhost:3000` to access the frontend of the application.
   - If the backend is running successfully, it should be accessible at `http://localhost:5000`.

