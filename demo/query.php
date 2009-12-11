<?php
	$list = array(
		'paris',
		'london',
		'amsterdam',
		'berlin',
		'brussles',
	);

	$result = array();

	/* if this is a get with a query string */
	if(isset($_GET) && isset($_GET['q'])) {
		$q = $_GET['q'];

		/* lower case search */
		$q = strtolower($q);

		/* walk through the list of values */
		foreach($list as $row) {
			/* if the query is somewhere in this row */
			if(strpos($row, $q) !== false) {
				/* add to the result array */
				$result[] = $row;
			}
		}

		echo json_encode($result);
	}
?>
