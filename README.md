# Cheff
Cheff (yes, "Cheff" with two "f's") is an application for people to share their recipes with others all around the world. Users can get inspiration from others by seeing hundreds of recipes, and filter through our categories to only see the types of recipes they want to see.

At the home page, a few recipes from each predefined category (Vegan, Vegetarian, Pescatarian, and Paleo) are displayed. In the nav bar, there is a dropdown to explore recipes, which will lead to a page that displays all recipes for a given category. There is also a login button, which will lead the user to the Login page.

At the Login page, users are invited to sign up with Cheff if they have not already. If users click the link, they will be sent to another page with a Sign-Up form where they can enter their name, email, password, and (optional) picture URL. Submitting this Sign-Up form will lead them back to the login page to log in to their new account. If they submit valid login credentials to the form, the user will be redirected to their profile page.

A user's profile page will include their name, profile picture, and date their account was created, as well as any recipes they have created.  On a user's profile page, a button to "Add a New Recipe" is available for users to be sent to the Add a New Recipe page.

The recipe creation page has a form for users to submit the name, description, categories, ingredients, steps, and image of a recipe. Only users that are currently logged in may access this page, as all recipes have to have a Chef account associated to them. Once the user submits the recipe, they will be redirected to the Recipe's display page.

Each recipe display page displays all information available on a submitted recipe (i.e. all information submitted at the "Add a New Recipe" page), as well as a link to view the profile of the Chef who created the recipe.

# New Technologies Used
- Edamam API, used to grab more recipes to add into the database
- Passport, used to create and authenticate user accounts

# Future Enhancements
- "Like" buttons on recipes for users to "like" other users' recipes. Recipes with more likes would be highlighted on the site. Users would also be able to visit a page where all the recipes that they have "liked" are displayed.
- Ability to modify/delete recipes (only for the users that created the specific recipe)
- Show similar recipes on a recipe's display page
- Send/share recipes via social network/email
- Addition of more categories
- More information displayed on Profile and Recipe pages