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

var path = require('path'),
    express = require('express'),
    compression= require('compression'),
    concat = require('concat-stream'),
    cloneOrPull = require('git-clone-or-pull');

var app = express();

app.use(compression());

app.post('/api/webhook', function(req, res, next) {
	req.pipe(concat(function(buf) {
		// TODO: fix user vs. project pages behavior

		var payload;
		try {
			payload = JSON.parse(buf.toString());
		} catch (e) {
			res.status(400);
			res.end(e.toString());
			return;
		}

		var cloneUrl = payload.repository.clone_url,
		    dir = path.normalize(app.argv.path + '/' + payload.repository.full_name);

		// TODO: should we respond with 202 Accepted if the clone takes too long?
		cloneOrPull(cloneUrl, dir, function(err) {
			if (err) {
				res.status(500);
				res.end(err.toString());
				return;
			}

			res.status(204);
			res.end();
		});
	}));
});

module.exports = app;
