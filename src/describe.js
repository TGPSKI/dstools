const Collection = require('..').Collection;
const jStat = require('jstat').jStat;

module.exports = function(field){
	console.assert(typeof field === 'string','Describe must specify a field name');
	let vec = Collection(this).column(field).data();
	console.assert(Array.isArray(vec),'Describe function was called on an object that is not an array');
	let quartiles = jStat.quartiles(vec);
	return [
		{measure:'column',value:field},
		{measure:'count',value:vec.length},
		{measure:'mean',value:jStat.mean(vec)},
		{measure:'std',value:jStat.stdev(vec)},
		{measure:'min',value:jStat.min(vec)},
		{measure:'25%',value:quartiles[0]},
		{measure:'50%',value:quartiles[1]},
		{measure:'75%',value:quartiles[2]},
		{measure:'max',value:jStat.max(vec)}
	];
};
