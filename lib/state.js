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

var writeAtomic = require('write-file-atomic');

var state = {};

function set(key, value, func) {
	// TODO state locking? Not sure if that's necessary or not
	state[key] = value;
	writeAtomic('/var/lib/gh-pages-server/state.json', JSON.stringify(state), func);
}

function get(key) {
	return state[key];
}

module.exports.set = set;
module.exports.get = get;
