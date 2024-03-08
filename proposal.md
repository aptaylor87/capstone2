1. What tech stack will you use for your final project? 

> The tech stack will be React and Node. I may use Material-UI for the styling.

2. Is the front-end UI or the back-end going to be the focus of your project?

> This will be an evenly balanced project with equal focus on the front and back end.

3. Will this be a website? A mobile app? Something else? 

> This will be a website but it will be a fairly simple application and will ideally be fully responsive so that it looks good on a mobile device. 

4. What goal will your project be designed to achieve? 

> The goal of this project is to make an application that allows users an interesting way to search for specific issues of Marvel comics. They’ll be able to run cross-references on two different characters to find comics that feature both. A user will also be able to save a reading list and keep track of comics they’ve already read. 

5. What kind of users will visit your app? 

> Fans of comic books will visit the application. They can be experts who are looking to fill out their catalog or new readers who are trying to figure out where to start. 

6. What data do you plan on using? How are you planning on collecting your data? You may have not picked your actual API yet, which is fine, just outline what kind of data you would like it to contain. You are welcome to create your own API and populate it with data. 

> I plan on making heavy use of the Marvel Comics API. It is a rich resource for information about heroes as well as issues of Marvel’s series of comics. The API also offers reference to a good library of great images of heroes and comic covers. 

Users will also be defining data as they will add comics to their reading list and track which ones they’ve read. 

7. In brief, outline your approach to creating your project (knowing that you may not know everything in advance and that these details might change later). Answer questions like the ones below, but feel free to add more information: 

a. What does your database schema look like? 

> The database will have a table for searchable heroes, a table for comics that users have saved to their reading lists, and there will be a table for users. 

b. What kinds of issues might you run into with your API? This is especially important if you are creating your own API, web scraping produces notoriously messy data. 

> The API has a limit of 3000 calls a day. It really shouldn’t be a problem in this context but it also means I’ll need to find ways to save on calls if possible. It also has a fairly rigorous authentication process as well. 

c. Is there any sensitive information you need to secure? 

> Users' passwords are the only sensitive information to secure.

d. What functionality will your app include? What will the user flow look like? 

> The app will have signup and login forms for users to manage their accounts. The main feature of the application will be the search page, which will allow users to select two different characters and run a search for comics featuring both. In the results, there will be buttons for users to add certain issues to their reading list. If a user is logged in, they’ll be able to view their reading list and mark titles as ‘read’. 

e. What features make your site more than a CRUD app? What are your stretch goals?

>The cross-referenced search, along with options to save and maintain reading lists make this more than a crud app. Along with that, I hope to make good use of the images provided by marvel for the heroes and comics. Some stretch goals are to add filterable, sortable results to the search using filtering methods available via the marvel API. 
