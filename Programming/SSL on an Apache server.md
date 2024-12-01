```bash
sudo apt-get install certbot python-certbot-apache apache2
sudo certbot --apache
```
At this point, you'll have to answer some basic questions for configuration. After that, Certbot will get an SSL certificate from Let's Encrypt and renew that cert every 3 months.

