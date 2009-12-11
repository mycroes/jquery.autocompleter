<?php
	$list = array(
		'Paris',
		'London',
		'Amsterdam',
		'Berlin',
		'Brussles',
		'Barcelona',
		'Milano',
		'Rome',
		'Zurich',
		'Mannheim',
		'Rotterdam',
		'Madrid',
	);

	$result = array();

	/* if this is a get with a query string */
	if(isset($_GET) && isset($_GET['q'])) {
		$q = $_GET['q'];

		/* walk through the list of values */
		foreach($list as $row) {
			/* if the query is somewhere in this row */
			if(stripos($row, $q) !== false) {
				/* add to the result array */
				$result[] = $row;
			}
		}

		echo json_encode($result);
	}
?>
