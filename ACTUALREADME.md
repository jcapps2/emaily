In order to start dev server:
navigate into the server directory, and execute the command
    npm run dev

If testing sending a survey, make sure the server is running
then open a new tab in the terminal and execute the command
    npx ngrok http 5000
Take the url provided, and plug it into SendGrid under Mail Setting - Event Notification
then test on the client side.


Update codebase:
    git status
    git add .
    git commit -m "insert message"

Pushing to Heroku:
    git push heroku master
    heroku open


Some notes:
    In prod, click data isn't being recorded because SendGrid is sending to the ngrok url.
    So if I want the yes/no data on surveys, I would need to update that url, maybe make a 
    second account (one for dev, one for prod).

    Also, it seems that when yes/no is clicked in an email sent from prod, it brings the user
    to emaily for some reason. Just find and change the url to the '/:choice' to redirect
    the user to a 'Thank you' page.