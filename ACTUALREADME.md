In order to start dev server:
navigate into the server directory, and execute the command
    npm run dev

If testing sending a survey, make sure the server is running
then open a new tab in the terminal and execute the command
    npx ngrok http 5000
Take the url provided, and plug it into SendGrid under Mail Setting - Event Notification
then test on the client side.