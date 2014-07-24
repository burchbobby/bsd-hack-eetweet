#Read Me!

## EE Login

	user: support
	pass: devpass

## Getting Started

### Upgrading from Grunt <0.4.0

If you currently have an older version of grunt (say the 0.3.x one), you'll need to follow these instructions:

    npm uninstall -g grunt

Then run:

    npm install -g grunt-cli

### After you've got grunt-cli installed

1. Set up `package.json`: replace `giteeup` in the `sites` array with the appropriate info for your site. If you're working with an MSM site, replace the `short_name` with the appropriate short name.
2. Define your Mountee volume in the `Gruntfile.js` around line ~108.
3. Run `npm install` to install the required npm packages.

##MSM Support (now with grunt support!)

These instructions will help you set up a new MSM site locally that has already been created in production.

**This guide also assumes that you are converting a local repo from a single EE site into an MSM install.**

For clarity, we will call the existing site 'site1' (at site1.dev) and the new MSM site 'site2' (at site2.dev).

Before you start, grab a database dump from the production servers.

1. Create a directory called 'htdocs-site2' in your repo
2. Copy these files into your new 'htdocs-site2' directory
```
htdocs/.htaccess
htdocs/admin.php
htdocs/index.php
```
And symlink the `themes` directory from `htdocs/themes` into your new `htdocs-site2` directory (run this from within your new `htdocs-site2` directory):
```
$ ln -s ../htdocs/themes/ themes
```
3. Add these lines to htdocs-site2/admin.php in the 'Multiple Site Manager' section (~line 41)
```php
$assign_to_config['site_name']  = 'site_2_short_name';
$assign_to_config['cp_url'] = 'http://site2.dev/admin.php';
```

4. Add these lines to htdocs-site2/index.php in the 'Multiple Site Manager' section (~line 46)
```php
$assign_to_config['site_name']  = 'site_2_short_name';
$assign_to_config['cp_url'] = 'http://site2.dev/admin.php';
$assign_to_config['site_url'] = 'http://site2.dev';
```

5. Change ~line 29 of config.local.php to 'y' instead of 'n'

6. Update your vhosts config with the new MSM site and restart Apache; use whatever ServerName you wish.
```apache
<VirtualHost *:80>
    ServerAdmin nowhere@loopback.edu
    DocumentRoot "{path-to-your-repo}/htdocs-site2"
    ServerName site2.dev
    ErrorLog "/private/var/log/apache2/site2-error_log"
    CustomLog "/private/var/log/apache2/site2-access_log" common
</VirtualHost>
```

7. Add the site2.dev domain to your `/etc/hosts` file
8. Import the production database into your local environment.
9. Run the database updates in mods.sql (now compatible with MSM builds!)
10. Log into the EE control panel at the primary site on the MSM: `http://site1.dev/admin.php`
11. Switch to site2, and synchronize templates. If you run into an error, run this command in the terminal:
```
chmod 666 path/to/repo/templates
```

12. In your package.json, edit the sites array to reflect the appropriate amount of sites in your MSM.
```json
{
    "name": "Site 1",
    "short_name": "default_site",
    "mountee_volume": "site1.bluestatedigital.com",
    "active": true
},
{
    "name": "Site 2",
    "short_name": "site2",
    "mountee_volume": "site1-site2.bluestatedigital.com",
    "active": false
}
```
13. In the new Gruntfile.js ... SURPRISE, you don't need to do anything! You should now be able to npm install and use grunt tasks for site1 as normal. If you want to run, for example, grunt default, but for site2 instead of site1, you'll need to execute the command like this:
```
grunt default:site2
```
You can also change which site is the "active" site. When no site is specified, the active site will be used for commands. By default, the active site is whichever site object in package.json which has the `active` property set to `true`

## Troubleshooting MSM

If you're having issues with your local MSM, the first things I'd check are:

* Did you make sure to change line 29 of your config.local.php to 'y'?
* If you're cloning down an existing local MSM repo, check out the index.php of each of the MSM's htdocs directories. Your local development domain needs to match whatever's in the `['site_url']` variable. The reason for this standardization is so each local build can share the htdocs index.php and admin.php. Whoever made the project should have also added this information into the document's readme (but sometimes good people do bad things).
