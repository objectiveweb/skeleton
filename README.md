# Objectiveweb Skeleton App

The Skeleton App is a full featured Objectiveweb application example, which
presents a collection of recipes and best practices for applications
development using Objectiveweb. The application structure follows the
[Boilerplatejs Reference Architecture](http://boilerplatejs.org), just like
the Objectiveweb console.

There is a list of implemented modules below, which for now showcases a
basic CRUD application.

# Instalation

This is the basic procedure for installing any Objectiveweb-based application.

First, Clone the repository on your project root directory (the directory there objectiveweb/ is also in).

    git://github.com/bravado/skeleton.git

The database schema is defined on the skeleton.sql file and should be imported on the database defined on ow-config.php, then edit ow-config.php and add the line

    register_app('skeleton');

That's it, visit http://your_server/skeleton and enjoy.

# Implemented Modules

## baseModule

* Landing Page
* Main menu

## sample

* Contacts list, reusing metaproject's GridComponent from the Objectiveweb distro
* Module-specific menu, which gets appended to the app interface
* A Contact Editor Component
