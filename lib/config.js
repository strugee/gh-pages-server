/*

Copyright 2016 Alex Jordan <alex@strugee.net>.

This file is part of gh-pages-server.

gh-pages-server is free software: you can redistribute it and/or
modify it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

gh-pages-server is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public
License along with gh-pages-server. If not, see
<http://www.gnu.org/licenses/>.

*/

var agpl_notice = ['Copyright (C) 2016 Alex Jordan <alex@strugee.net>.',
                   'License AGPLv3+: GNU Affero GPL version 3 or later <http://gnu.org/licenses/agpl-3.0.html>.',
                   'This is free software: you are free to change and redistribute it. There is NO WARRANTY, to the extent permitted by law.'].join('\n');

var argv = require('yargs')
	   .usage('Usage: $0 [options]')
	   .alias({'help': 'h', 'config': 'c', 'port': 'p', 'address': 'a', 'path': 'd'})
	   .describe({port: 'Port that the HTTP server will bind to',
	              address: 'Address that the HTTP server will bind to',
	              path: 'Path that the server will clone things to',
	              override: 'Key/value pairs to override directory names'})
	   .default({ config: '/etc/gh-pages-server.json', address: '0.0.0.0', port: 8000, path: '/srv/http', override: {} })
	   .config()
	   .env('GH_PAGES_SERVER')
	   .help()
	   .version()
	   .epilog(agpl_notice)
	   .argv;
module.exports = argv;
