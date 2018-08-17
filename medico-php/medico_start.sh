#!/bin/bash
pm2 start /var/www/nodeapp/medico-api/bin/www --name medico-api
pm2 serve /var/www/nodeapp/medico-view/build --name medico-view
pm2 serve /var/www/nodeapp/medico-web/build 82 --name medico-web