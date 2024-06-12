Alejandro Taboada
Sergio Rodríguez
Paula Abad
Rita Barragán

## Project Description
This project entails developing a chatroom application using Node.js, Express, MongoDB, and Handlebars. Users can create or join chatrooms with unique IDs. The application stores chatroom data and messages in a MongoDB database. Before using it, they have to create a user introducing their username, their email and password. They always have to login before they access the home page. Inside the home page they have a filter where they can look for a room. Inside each room, users can delete and edit the message that they have posted. Also, they have two filters to look for messages: a search by message content and a search by user. Finally, we added that some users are admins, and they can delete and edit the messages of everyone, and they can also delete chats.
We also included a sign in with google, apart from the normal login version. 
According to security, the passwords are saved cifrated in the mongoDB, so that admins can not access to them.
For the chat sanitization, apart from allowing the admins to delete and edit all the messages, we have created a dictionary with some bad-words, that the code substitutes by "****".
Finally, for the validation, apart from the sign in with google version, we have introduced some validation steps in the sign up process. For example, it verifies that the email introduced is a real email, by checking if it follows an email format, and it checks that the username is not being already used, and checks that the password and the confirm password fields are the same. Finally, when we sign in with google, it checks that the email used is already associated to a user or it gives a warning and does no allow to login, and if the email is already being used it links it with the username associated to the email and allows the user to do activities as normal.

Key features include:

Creating chatrooms with specified names and unique routing IDs.
Posting and viewing messages in chatrooms.
Editing and deleting own messages.
Real-time message updates.
Validating nicknames and messages before posting.
Login and Sign up, keeping user's info.
Basic sanitization tools.

Known Bugs:

None currently identified.

Design Decisions:

Handlebars for server-side rendering to streamline template management.
MongoDB for its flexibility and scalability in storing chatroom data and messages.

## Instructions to run the webpage

To run the webpage the process is very simple.
You just need to download it, decompress the zip file, and go to the directory of the decompressed file in the console.
You also need to have installed the mongoDB Compass program in your computer, or in VScode, if you can't install it in your computer.
Once you are there, you have to execute two commands:
npm install   To install the necessary packages
npm run start   To run the code
Once you have introduced them just do ctrl + click on the "http://localhost:3000" link that appears in your console.

## Team contributions

We started coding from Alejandro and Sergio's lab7, because even Paula's and Rita's lab7 was good too, we thought that it would be easier to implement the new features in the first one.

For the development of the new features, Sergio implemented the sign in and login features and pages, the filters for both home page and chat pages. Also, he implemented that the admins could delete chats. he implemented the validation process fot the sign in page.Finally, he implemented the sanitization process alongside Alejandro.

Alejandro implemented the delete and edit features for the user's messages, and that the admins could delete and edit all the messages. Also, he implemented the sign in with google feature alongside Paula, and the validation process needed for it. Finally, he implemented the sanitization process alongside Sergio.

Paula implemented the sign in with google feature alongside Alejandro, and did the css and styling process for the login, sign in, and main page.

Finally, Rita did the css and styling process for the home page and for the chats.

We want to remark that we all as a group went to a final process of resolving all bugs and possible problems that we saw in our page.