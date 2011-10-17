<?php 
class user_renderChars {
	var $cObj; // The backReference to the mother cObj object set at call time
	
	/**
	* Call it from a USER cObject with 'userFunc = user_randomImage->main_randomImage'
	*/
	function main($content, $conf) {
		$titleParsed = str_replace(' ', '-', $conf['title']); 
		return $titleParsed;
	}
}
?>