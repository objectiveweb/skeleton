# Objectiveweb Skeleton App

This project will eventually become a full featured Objectiveweb application example, and may serve as a base for other applications.
For now, this is a rough MasterDetail implementation, which uses a custom javascript controller and the Metaproject interface for displaying data.

# Instalation

This is the basic procedure for installing any Objectiveweb-based application.

First, Clone the repository on your project root directory (the directory there objectiveweb/ is also in).

    git://github.com/bravado/skeleton.git

The database schema is defined on the skeleton.sql file and should be imported on the database defined on ow-config.php, then edit ow-config.php and add the line

    register_app('skeleton');

That's it, visit http://your_server/skeleton and enjoy.

# Implemented Components

* Contacts list, using metaproject's GridComponent
* A Contact Component, to edit Contacts