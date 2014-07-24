gitEEup
=======

### Introduction

Are you starting a new ExpressionEngine website for a client? If so, you're in the right place to get up and running locally.


### Prerequisites

- Is all ["Must-Have Software"](https://confluence.bluestatedigital.com/display/WPD/Getting+Started+in+WPD#GettingStartedinWPD-Must-HaveSoftware) installed?
- Do you have [build1 access](https://confluence.bluestatedigital.com/display/tech/Tech+Request+Templates#TechRequestTemplates-NewShellAccount/ElevatePrivilege)?
- Has the client been provisioned in [clientconfig](https://clientconfig.bluestatedigital.com/)?
- Does your machine have a fully-configured MAMP/LAMP stack?


###### Have you setup your new GitHub repository yet?

Now may be a good time. But before you [click here](https://github.com/organizations/bsdstrategy/repositories/new), here are some things to keep in mind:

- Prepend the repository name with `bsd-`.
- Use the client slug so that the repository is consistent with clientconfig.
- Keep in mind, we may work on multiple projects for the same client. If this is not a MSM site, and there is the possibility of other client projects (especially if this is a campaign or microsite), consider a suffix to differentiate repositories.
- And please, for the sake of your coworkers, **_do not_** use capitalization in the repository name.

-

### Downloading the Repository

There are two ways to download this repository for local development:

#### 1. [Download the .zip](https://github.com/bsdstrategy/bsd-giteeup/archive/master.zip) (highly recommended over cloning)

- Download or copy to a directory of your choice
	- *I recommend storing the repository within a directory named using the client slug. This way you have a central place for anything related to this client, regardless of whether or not it lives in this repository. And by using the slug, you'll avoiding the hassle of capitalization and spaces when using the command line.*
- Unzip and replace `giteeup-master` in the directory name with the new repository name.
- Run `git init ; git add --all ; git commit -m "Init repo"`
	- Optionally run `git remote add origin https://github.com/..` using instructions provided when creating the new repository.
- `cd` into the directory and run `npm install`
- Proceed to local configuration instructions

-

#### 2. Clone the repository

*Use caution:* do not push back to remote!

- `cd` into directory you wish to serve as parent to the repository
- Run `git clone git@github.com:bsdstrategy/bsd-giteeup.git`
- Run `mv bsd-giteeup bsd-clientslug`
- Run `cd bsd-clientslug`
- Run `sudo rm -r .git`
- Run `git init ; git add --all ; git commit -m "Init repo"`
	- Optionally run `git remote add origin https://github.com/..` using instructions provided when creating new repository.
- `cd` into the directory and run `npm install`

-


### Configuring Locally

The following steps assume you have an environment configured [detailed instructions here](https://confluence.bluestatedigital.com/display/WPD/Localhosting) that allows you to:
- Run Apache
- Add/manipulate MySQL databases
- Configure a VirtualHost

From this point, proceed as follows:

1. Download the production database from `build1`

2. Import the database dump into a new MySQL database

3. Import `data/mods.sql` following the production SQL database import

4. Copy &mdash; **_don't overwrite!_** &mdash; `config/config.local.sample` to `config/config.local.php`

5. Update the following variables, per your local config:

	```php
	$env_db['hostname'] = '127.0.0.1'; // or localhost
	$env_db['username'] = 'your-mysql-username';
	$env_db['password'] = 'your-mysql-password';
	$env_db['database'] = 'your-database-name';
	$env_config['blue_upload_client'] = 'clientslug';
	$env_config['blue_upload_cloudfront'] = 'n';
```

6. Open `package.json` and update the `sites.short_name` property:

	```javascript
	"sites": [{
		"name": "client name",
		"short_name": "clientslug.bsd.net",
		"active": true
	}],
```

7. Setup a VirtualHost, pointed to `htdocs`

Assuming everything went well, you should now be able to see a blank page at the VirtualHost URL with no errors. To log into the CMS, use `/admin.php` (not `/cms`, as it is only a redirect configured on the remote server).

-

### Final Note

**Document.** *Do it.* It's not only good for others, but also for you when, in 6+ months, you've completely forgotten how to use the site you yourself built (we're all guilty of this).

You can start by removing this &darr; line and everything above it (because if you're not going to update the readme, you're definitely not going to [create a Confluence article](https://confluence.bluestatedigital.com/pages/createpage.action?spaceKey=WPD&fromPageId=29133606)).

---

# Project Name

Production URL: [some URL](#)

BSD Tools URL: [some other URL](#)

Client Slug: [link to client config](#)

Project Documentation: [Confluence article](#)


## Technical details

### Platforms

- BSD Tools
- ExpressionEngine

### Languages

- HTML
- JavaScript
- Compass
- SCSS

### Libraries / Frameworks

- jQuery
- Grunt.js

### Local Development Dependencies

- Compass
- SCSS
- Grunt

### Fonts in Use

Provider:
- [Typekit/Webfonts.com/H&FJ]

Fonts:
- [font names go here]
