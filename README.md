# Welcome to FT-server

![FT](https://www.samanthaettus.com/wp-content/uploads/2014/08/ft-logo.png)

The FT server application has been created for world news headlines to be accessed through searching for specific keywords; for example Brexit; through the application, the search Brexit will bring news all about that topic.

App Name : FT API news
Customer : Financial Times
Development Team : 
Meisam E Zarghani (Backend , frontend developer : 24 Apr 2021 - till date)
Date : 30 Apr 2021
Web URL : http://Heruco.COM

# About this file
The purpose of this file is to provide an overview, setup instructions and background information of the project. If you have joined this project as part of the development team, please ensure this file is up to date.

Note : Any dependencies added / modified to this project which affect the running of the code in this git repository must be listed in this file. All developers must ensure that the instructions mentioned in this file are sufficient to enable a new developer to obtain a executable copy of the latest code in this repository, without involvement from any other human assistance.

I) language requirements :
   1) JavaScript
   2) NodeJS
   3) HTML
   4) CSS
II) Tools
   1) VScode
   2) Postman
   3) heroku
   4) GitHub

# Project Technical Specifications
* This project is a server based project which uses NodeJS for the backend side 
  and uses specific API from the Financial Times 
* Javascript, CSS and HTML for landing page on front end.
* The code is store on Github Repository and the application is running on Heroku. 
* The design for reference is from FT.com website.

# library used
   1) Express
   2) Nodemon
   3) body-parser
   4) node-fetch
   5) routes
   6) DOM

# Setup Instructions
As mentioned earlier , this is a NodeJS project,
The below mentioned steps may vary significantly across various operating systems, please follow them accordingly.
These instructions are aimed at a developer who has been added to the project team, after the project development has already been initiated,
Therefore the aim is to get the code from the git repository to run on the developer's system, to allow him / her to continue with further development.

# Clone the repository from GitLab :
git clone https://github.com/Erwin6997/FT-server
# Change current working directory to Project directory
cd FT-server
# Checking out the latest development branch
As of writing this guide the main branch used for development is : develop
To switch to this branch : git checkout develop

# Installing dependencies
This project requires NodeJS for running,
You can install it by referring to the official NodeJS page : [https://nodejs.org/en/]
The NodeJS version used at the time of writing this file is : v14.16.1
You can check the installed version using Node -v
The package.json file contains the list of all npm plugins and libraries used for this project.
Please ensure this file is updated incase any plugin is added / removed.
Please follow below steps for installation :
Install NodeJS and Dependencies
npm install
Next reload the package.json
npm init

# Start the server :
npm start dev
   (If you get an error about Access about this API, it means it has been disallowed which means your Token Key you need to get access to the FT API has expired)
