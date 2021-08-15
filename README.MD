Amit Azoulay's Project:

**How To Run:**

In the terminal type "npm run start" from the project's root file ,it will activate a local host node server listening on port 3000


**Requests And Responses:**

1.http://localhost:3000/api/surprise?name=**user_input**&birth_year=**user_input** :

This request will have several of different responses according to the input in the query params by the user.
The response, as requested will appear in the following format:
{
"type": "chuck-norris-joke",
"result": "A Chuck Norris divided against himself can still stand.",
"HistoricalEvent:"Did you know? On this day: King Macbeth is killed at the Battle of Lumphanan by the forces of Máel Coluim mac Donnchada."
}

**Bonus Assignment**: To each response I have added a "Did you know fact" about an historical event that occurred on this date(current).

2. http://localhost:3000/api/stats :

This request returns the data about the request, number of total successful requests, and number of successful requests of each type

**Tests:**

I used Mocha to test the assignment.

I have added tests that according to the requests and responses will return the right status 




