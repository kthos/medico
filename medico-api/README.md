pm2 start medico-api/bin/www --name medico-api
<br/>
pm2 serve medico-view/build --name medico-view
<br/>
pm2 serve medico-web/build 82 --name medico-web