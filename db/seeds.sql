USE cheffs_db;

INSERT INTO Chefs (name, email, password, createdAt, updatedAt)
VALUES 
	("Caren Test", "caren@gmail.com", "password", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	("Jeff Test", "jeff@gmail.com", "password", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Wendy Test", "wendy@gmail.com", "password", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Recipes (name, description, ingredients, steps, imgURL, createdAt, updatedAt, ChefId) 
VALUES
	("Ultimate Tofu Breakfest Burrito Bowls", 
		"Tofu scrambles up just like eggs, and with some clever spices, even non-vegans will barely notice the difference. Try setting out toppings to let family or guests assemble their own burrito bowls.",
        "1 (14 ounce) package extra-firm tofu, drained &| ½ teaspoon salt &| black pepper to taste &| 1 ½ teaspoons onion powder", 
        "Preheat a large, heavy skillet over medium-high heat. Add 2 tablespoons oil. Break tofu apart over skillet into bite-size pieces, sprinkle with salt and pepper, then cook, stirring frequently with a thin metal spatula, until liquid cooks out and tofu browns, about 10 minutes. (If you notice liquid collecting in pan, increase heat to evaporate water.) Be sure to get under the tofu when you stir, scraping the bottom of the pan where the good, crispy stuff is and keeping it from sticking. &| Add onion and garlic powders, turmeric, juice, and remaining tablespoon oil and toss to coat. Cook 5 minutes more.",
        "https://images.media-allrecipes.com/userphotos/4306820.jpg", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1),
    ("Carbonara", "Humble ingredients—eggs, noodles, cheese, and pork—combine to create glossy, glorious pasta carbonara.",
		"3 tbsp. kosher salt&| parmesan&| 3 large egg yolks&| 2 large eggs&| 1 lb spaghetti",
		"Heat 6 qt. water in a large pot over high. When water starts to steam, add 3 Tbsp. salt and cover pot with a lid (this will bring water to a boil faster).&|
        While you are waiting on the water, do a little prep. Remove 4 oz. guanciale from packaging and cut into about 1x¼\" strips. Finely grate 2 oz. cheese and set aside one-quarter of cheese for later.&|
        Whisk 4 egg yolks and 2 whole eggs in a medium bowl until no streaks remain, then stir in remaining grated cheese. Add several cranks of pepper and set aside.",
        "https://assets.bonappetit.com/photos/5a6f48f94f860a026c60fd71/3:2/w_2056,c_limit/pasta-carbonara.jpg", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2),
	("Fish Tacos", "A quick and easy recipe for those tacos that have become a favorite in Southern California: Fish Tacos.",
		"1 lb. boneless & skinless tilapia fillets &| olive oil &| salt &| pepper &| 3/4 cup sour cream &| 3/4 up fresh salsa &| 12 corn/flour tortillas &| 1 1/2 cups shredded cabbage",
        "Heat broiler, place fish on rimmed baking sheet, and drizzle with olive oil and season with salt and pepper. &|
        Broil until fish is lightly browned on top, 5-10 minutes, until flesh is opaque throughout. &|
        Meanwhile, in a small bowl, mix sour cream with 2 tablespoons of fresh salsa. &|
        Divide fish evenly among tortillas and otp with shredded cabbage, sour cream, and fresh salsa.",
        "https://www.recipegirl.com/wp-content/uploads/2010/06/Fast_Fish_Tacos12.jpg", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3);

INSERT INTO Categories (category, createdAt, updatedAt)
VALUES
	("Vegan", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Vegetarian", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	("Pescatarian", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ("Paleo", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    
INSERT INTO RecipeCategories (CategoryId, RecipeId, createdAt, updatedAt)
VALUES 
	(1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);