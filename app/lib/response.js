const response = {};

response.ok = (rows, res) => {
	var data = {
		'data': {
			attributes: rows
		}
	};
	res.send(data);
}

response.okWithName = (rows, type, id, res) => {
	var data = {
		'data': {
			type: type,
			id: id,
			'attributes': rows
		}
	};
	res.send(data);
}

response.unprocessable = (rows, res) => {
	var data = {
		'errors': { status: "422", rows }
	};
	res.status(422).send(data);
}

response.notfound = (rows, res) => {
	var data = {
		'errors': { status: "404", rows }
	};
	res.status(404).send(data);
}

response.error = (rows, res) => {
	var data = {
		'errors': { status: "500", rows }
	};
	res.status(500).send(data);
}

response.forbidden = (title, res) => {
	var data = {
		'errors': [{ status: "403", title }]
	};
	res.status(403).json(data);
}

response.custom = (status, data, res) =>{
	if(status != 200){
		data = {
			'error': { status, message: data.message ? data.message : null, code: data.code ? data.code : 0}
		};
	}
	res.status(status).json(data);
}


module.exports = response;