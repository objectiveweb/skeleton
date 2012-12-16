<?php
/**
 * Registers a simple domain, handled by the TableStore handler with { table: 'mytable' } as its parameters
 * This maps all the contents on "mytable" to the objectiveweb/index.php/mytable url where you can GET/POST/PUT/DELETE data
 */
register_domain('contact', array(
    'handler' => 'TableStore',
    'table' => 'contact'));

/**
 * Other options include hasMany and belongsTo associations, which will be documented on further examples
 */