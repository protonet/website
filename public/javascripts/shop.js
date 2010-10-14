/**
 * Returns the single cost of protonet box for the specified type.
 *
 * @param type
 **/
function getSingleCost(type) {
	return parseInt($('#single_price_' + type).html());
}

/**
 * Returns the selected amount of protonet boxes of the specified type.
 *
 * @param type
 **/
function getSelectedCount(type) {
	return parseInt($('#order_count_' + type).val());
}

/**
 * Returns the total cost for the specified type.
 *
 * @param type
 **/
function getTotalCostType(type) {
	return parseInt($('#total_price_' + type).html());
}

/**
 * Sets the total cost for the specified type.
 *
 * @param cost
 * @param type
 **/
function setTotalCostType(cost, type) {
	cost = cost == null ? 0 : cost;
	$('#total_price_' + type).html(cost);
}

/**
 * Updates the total cost.
 *
 * @param cost
 **/
function setTotalCost(cost) {
	// debugger
	cost = cost == null ? 0 : cost;
	$('#total_price').html(cost);
}

/**
 * Updates the total cost for the specified type.
 *
 * @param type
 **/
function updateTotalCostType(type) {
	// debugger
	var amount = getSelectedCount(type);
	var price = getSingleCost(type);
	var cost = amount * price;
	setTotalCostType(cost, type);
}

/**
 * Updates the total cost over all given types.
 **/
function updateTotalCost(types) {
	// debugger
	var totalCost = 0;

	$.each(types, function(index, value) {
		updateTotalCostType(value);
		var cost = getTotalCostType(value);
		totalCost = totalCost + cost;
	});

	setTotalCost(totalCost);
}

function highlightSpecs(type) {
	$('.highlight_specs').removeClass('highlight_specs');
	$('.' + type).addClass('highlight_specs');
}

$(document).ready(function() {
	//	update the total cost fields after page reload
	updateTotalCost(['basic', 'power', 'extreme']);

	//	update the total cost fields after changing any amount
	$('#order_count_basic').change(function() {
		updateTotalCost(['basic', 'power', 'extreme']);
	});
	$('#order_count_power').change(function() {
		updateTotalCost(['basic', 'power', 'extreme']);
	});
	$('#order_count_extreme').change(function() {
		updateTotalCost(['basic', 'power', 'extreme']);
	});


	$('.order_type').click(function() {
		highlightSpecs($(this).attr('id'));
	});


	$('.tab').click(function() {
		$('.content-tab').hide();
		$('#content-' + $(this).attr('id')).show();
	});
	$('#content-tab-2').hide();
});
