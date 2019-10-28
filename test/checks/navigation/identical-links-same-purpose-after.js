describe('identical-links-same-purpose-after tests', function() {
	'use strict';

	var fixture = document.getElementById('fixture');
	var check = checks['identical-links-same-purpose'];

	afterEach(function() {
		fixture.innerHTML = '';
	});

	it('sets results of check result to `undefined` if native links do not serve identical purpose', function() {
		var nodeOneData = {
			data: {
				name: 'follow us',
				parsedResource: { hostname: 'facebook.com' }
			},
			relatedNodes: ['nodeOne'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'follow us',
				parsedResource: { hostname: 'instagram.com' }
			},
			relatedNodes: ['nodeTwo'],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];

		var results = check.after(checkResults);
		assert.lengthOf(results, 1);

		var result = results[0];
		assert.deepEqual(result.data, nodeOneData.data);
		assert.deepEqual(result.relatedNodes, ['nodeTwo']);
		assert.equal(result.result, undefined);
	});

	it('sets results of check result to `true` if native links serve identical purpose', function() {
		var nodeOneData = {
			data: {
				name: 'Axe Core',
				parsedResource: { hostname: 'deque.com', pathname: 'axe-core' }
			},
			relatedNodes: ['nodeOne'],
			result: true
		};
		var nodeTwoData = {
			data: {
				name: 'Axe Core',
				parsedResource: { hostname: 'deque.com', pathname: 'axe-core' }
			},
			relatedNodes: ['nodeTwo'],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];

		var results = check.after(checkResults);

		assert.lengthOf(results, 1);

		var result = results[0];
		assert.deepEqual(result.data, nodeOneData.data);
		assert.deepEqual(result.relatedNodes, ['nodeTwo']);
		assert.equal(result.result, true);
	});

	it('sets results of check result to `true` if ARIA links have different accessible names', function() {
		var nodeOneData = {
			data: {
				name: 'earth',
				parsedResource: {}
			},
			relatedNodes: ['nodeOne'],
			result: true
		};

		var nodeTwoData = {
			data: {
				name: 'venus',
				parsedResource: {}
			},
			relatedNodes: ['nodeTwo'],
			result: true
		};
		var checkResults = [nodeOneData, nodeTwoData];
		var results = check.after(checkResults);
		assert.lengthOf(results, 2);

		assert.deepEqual(results[0].data, nodeOneData.data);
		assert.deepEqual(results[0].relatedNodes, []);
		assert.equal(results[0].result, true);

		assert.deepEqual(results[1].data, nodeTwoData.data);
		assert.deepEqual(results[1].relatedNodes, []);
		assert.equal(results[1].result, true);
	});
});