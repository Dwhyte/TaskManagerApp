# Live Demo 
http://secret-brook-20079.herokuapp.com/
-
  - A little slow opening up the site. App is currently hosted on a free hobbyist Heroku account, which sleeps the server after a period of no inactivity. 
  - Create an account to see taskManager
  - Create some projects and tasks :-)

# TaskManager

Create a very simple Laravel web application for task management: -Create task (info to save: task name, priority, timestamps) -Edit task -Delete task -Reorder tasks with drag and drop in the browser. Priority should automatically be updated based on this. #1 priority goes at top, #2 next down and so on. -Tasks should be saved to a mysql table.


# Set Up

  - run composer update
  - run npm install
  - create a new database in .env file (name is whatever you like)
  - run migrations
  - run php artisan db:seed (this will create the specific roles types for your DB)
  - run php artisan OneOff:AssignAdminRoleToUser - (This will ask you to assign a specific user (email address) to have      admin rights. Basically if you want to grant yourself admin so you can see the admin page)
  - project can start with php artisan serve or valet. Should interact with the API calls both ways.
  - Create a new account and you should be able to create a new project and new tasks.

# Screenshots
<img src="https://res.cloudinary.com/duzsc1kx7/image/upload/v1592135979/Screenshots/TaskManagerScreenshot4.png"
     alt="screenshot of taskmanager" />
     
<img src="https://res.cloudinary.com/duzsc1kx7/image/upload/v1591272520/Screenshots/TaskManagerScreenshot3.png"
     alt="screenshot of taskmanager" />
     
# Admin View Screenshots  
<img src="https://res.cloudinary.com/duzsc1kx7/image/upload/v1592136111/Screenshots/TaskManagerScreenshot5.png"
    alt="screenshot of Taskmanager Admin View" />
     
