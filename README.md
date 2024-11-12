# Repository for team project in CS261 course
### (Group 7 Section 100001)
Currently, this repository has 2 branches: *'main' (Default)*, *'profile'*  

**--> Current completed task:**
- Login system that calls the TU API to verify identity (Frontend code with TU API/Backend is in progress)
- Home page Structure
- Profile page Structure
  
**Navigation:**  
[Download Project](#download-project "Install the project on your local")  
[Install and Running server](#install-and-running-server "Install and running server by Docker")  


## This is the 'main' branch
Main branch is repository for keep up to date with the latest progress of the project. As of this writing, the project is still in development.  
This branch contains 2 main folders:
>
>* **Frontend/**
>>   * .html
>>
>>   * .css
>>
>>   * .js
>>
>>   * .json
>>
>>   * .png (images)
>>
>>   * .gitignore  
>>
>* **Server-Setup/**
>>   * .dockerfile (docker image for build & run on Docker)
>>


## Download Project 
You can install the latest version of this project by **cloning project** using the command:  
>`git clone https://github.com/CSnimiu/cs261-group7-100001`  

To download any sub-branch, please use the command:
>`git clone -b <branch> https://github.com/CSnimiu/cs261-group7-100001` 

or select the download option via **Code > Download Zip** and then extract the zip file to access the working folder.  
  
**If you already have this project branch on your device**, you can use the command to grab the updated version of the project using the command:  
>`git pull origin main`  


## Install and Running server
The last two lines of the **DockerContainer_NodeJS.dockerfile** file in *server-setup* folder contain the commands used to **build** and **run** the docker image to create a NodeJS server.  

>`docker build -f server-setup/DockerContainer_NodeJS.dockerfile -t node-js-image .`  
>`docker run -d --name node-js --network mynetwork -p 3000:3000 node-js-image`

***Note that:*** these commands only work properly if you build the docker file in the same location as the `frontend` and `server-setup` folders, so use the code with caution.  

.  
.  
.  
*The project will be updated continuously...*