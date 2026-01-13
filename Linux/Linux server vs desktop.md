Both Linux servers and desktops run on the same kernel, shells, etc... Desktops provide graphical desktop user interface for ease of use. Servers can offer this but are generally used through the terminal (or more access) and primarily operate without user interaction.

Services are server programs that provide shared resources to one or more clients, typically available all the time.

## Launching Services

Background processes that run constantly and listen for requests
Spawned processes that are started by a "parent" program or process listening for requests

## Daemons

These are the constantly running background processes. Their program names typically end with the letter ***d*** to indicate they're a daemon process. 

Examples:
- mysqld is the mySQL daemon
- sshd is the ssh daemon
- crond is the job scheduler for cron job
- inetd is the internet daemon, which is a super-server: it listens for different requests and launches the service relevant to the request.

## Network protocols and ports to route requests to Daemons

|Port|Protocol|Description|
|:---:|:---|---|
|20, 21|FTP|File Transfer Protocol|
|22|SSH|Secure Shell protocol for sending encrypted data to a server|
|23|Telnet|Unsecure protocol to interacting with a server shell|
|25|SMTP|Simple Mail Transport Protocol|
|53|DNS|Domain Na ming System to match IP addresses to computer names|
|67|DHCP|Dynamic Host Configuration Protocol|Provides valid IP addresses on a network|
|80|HTTP|Hypertext Transfer Protocol|Allows clients to request web pages from servers|
|109, 110|POP|Post Office Protocol|
|137, 138|SMB|Server Message Block protocol for Microsoft servers to share files and printers|
|143, 220|IMAP|Internet Message Access Protocol provides advanced mailbox services for clients|
|389|LDAP|Lightweight Directory Access Protocol provides access to directory services to authenticate users, workstations and other network devices|
|443|HTTPS|A secure, encrypted connection to web servers|
|2049|NFS|Network File System provides file sharing between Unix and Linux systems|

All ports for Linux services are defined in ***/etc/services*** 

![First 30 service ports listed in Arch](../Images/Linux_services.png)

## Basic Linux services

Most popular Linux services:
- Web services
- Database services
- Email services

## Web servers

Main two are:
- Apache Server
  * Modular: every feature is a plug-in Modular
  * Main configuration file is httpd.conf, typically found at ***/etc/httpd***
  * Additional config files typically found at ***/etc/httpd/conf.d***
  * Default page to serve is ***DocumentRoot*** found at ***/var/www/html***

- nginX  Server
  * More modern than Apache, released in 2004
  * Adds native web proxy, mail proxy, web page cache, and load-balancing
  * Smaller memory footprint than Apache
  * Can handle 10,000 simultaneous client connections 
  * Main configuration file is ***nginx.conf*** typically found at ***/etc/nginx/***
  * Additional config files typically found at ***/etc/nginx/conf.d***
  * ***DocumentRoot*** is the default folder for web pages & apps, found at ***/var/www/nginx-default***

- lighthttpd Package
  * Lightweight alternative that uses little memory and computer
  * Has an included database

## Database servers
  
  Main options:
  - PostgreSQL
    * Started as a university project and went open source in 1996.
    * Follows standard ACID (atomicity, consistency, isolation and durability) industry guidelines
  - mySQL
    * Started as a simple, fast database
    * Commonly used in the LAMP platform: Linux, Apache, MySQL, PHP)
    * Owned by Oracle; open source replica is MariaDB
  - MongoDB
    * A NoSQL system
    * Stores data as documents with JSON elements

## Mail servers

Most Linux distros come with some type of email server package, which are made up of small programs:
  - MTA, or Mail Transfer Agent
  - MDA, or Mail Delivery System
  - MUA, or Mail User Agent (these typically run on the client side)
    * Evolution
    * K-Mail

### Mail Transfer Agent 
  - Handles both incoming and outgoing messages on the server
  - Determines the destination host of the recipient addresses
  - If host is a remote mail server, MTA connects with that mail server to communicate
  - Main MTA packages:
    * sendmail
      - Very complex to configure
      - Default config file is at ***/etc/mail/sendmail.cf*** 
      - Recommended not to use that file but instead make changes at ***/etc/mail/sendmail.mc*** 
    * Postfix
      - A more modular application
      - Two small config files
      - Most config files found the ***/etc/postfix*** folder. ***main.cf*** defines basic parameters, ***master.cf* file defines how the daemons run
    * Exim
      - Monolithic like sendmail
      - Config files found at ***/etc/exim.cf***

### Mail Delivery Agent
  - Receives messages for local users from the MTA and determines how to deliver them
  - Two common MDA packages:
    * Binmail
      - Most used
      - Location is the name: ***/bin/mail***
      - By default can read messages stored in ***/var/spool/mail/***
      - Can be pointed to an alternative mailbox
    * Procmail
      - Many distros install it by default
      - Takes advantage of user-configured recipies allowing user to direct how server processes incoming mail
      - User can create a personal ***.procmailrc*** file in the ***$HOME*** directory to direct messages based on regular expressions to control where messages are sent, i.e.: separate mailbox files, forwarded to another mailbox or to ***/dev/null*** to automatically trash messages.

### Mail User Agent
  
  Most remote mail Linux clients use IMAP4 to communicate with a mail server.
  Dovecot is a popular IMAP4 server package.
    - Main configuration files are found at ***/etc/dovecot/dovecot.conf***
    - Additional config is found in the ***/etc/dovecot/conf.d*** folder

