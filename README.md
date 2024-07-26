#        FullStack College Forum



#### Technologies used on server-side:
Django-Rest-Framework,Simple-JWT ,Celery, Django-Debug-Toolbar,Redis,Django-Filter,Django-dotenv and more . . .


#### Technologies used on client-side:
axios,date-fns, jwt-decode, prop-types, react-jwt, react-router-dom, react-toastify,html,css,bootstrap and more . . .



## API documentation

Welcome to the College Forum API documentation. This API supports the core functionalities needed for managing an interactive forum.

https://documenter.getpostman.com/view/30946823/2sA3kYiKZv




## Installation For Server Side


#### 1-  First of all clone this repo

        git clone git@github.com:AyushTmg/FullStack-CollegeForum.git


#### 2- Navigate to the server directory
        cd server 

#### 3-Setup a virtual enviroment 

        python -m venv venv


#### 4- Install all dependencies from the requirements.txt in a virtual enviroment


        pip install -r requirements.txt



#### 5-Add .env File and add these field or just configure example.env

        EMAIL="Add Your Email"
        EMAIL_PASSWORD="Add Your Email Password"
        SECRET_KEY = 'Your Project Secret Key'

#### 6- Migrate the changes to your database

        python manage.py makemigrations 
        python manage.py migrate

#### 7- Run Application with celery

        python manage.py runserver
        celery -A main worker -l info



### Note: I assume you have already cloned the repository while setting up the server-side.


## Installation For Client Side

#### 1- Navigate to the client directory
        cd client 

#### 2- Install dependencies
        npm install

#### 3- Run the development server
        npm run dev 






