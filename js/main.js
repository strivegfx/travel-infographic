/*jshint devel:true*/
/*global TweenMax: true*/


$(document).ready(function(){

	var $m = {

		s : {}, // settings object...

		genSet : function(){ // generate settings...

			$m.s.sld = $('.slider'); // the slider container

		}, // end of genSet

		init : function(){

			$m.genSet(); // generate settings
			$m.genSld(); // generate slider
			$m.uiLst(); // UI listeners

		}, // end of init fnc

		genSld : function(){ // generate slider...

			var $sld = $m.s.sld; // get slider reference from settings...

			// create slider...
			$sld.slider({
				range: 'min',
				value: 200,
				min: 100,
				max: 300,
				animate: 'true',
			});

		}, // end of genSld fnc

		uiLst : function(){ // create UI listeners

			var $sld = $m.s.sld; // get slider reference from settings...


			$sld
				.on('slidestop', function( event, ui ){

					var $curPos = $sld.slider('value'); // CURRENT handle position

					$m.uiAct.sld.slidestop($curPos); // run the UI action...					

				})
				.on('mouseenter', function(){

					

				})
				.on('mouseleave', function(){

					

				});

		}, // end of uiLst fnc

		uiAct : {

			sld : {

				slidestop : function($curPos){

					console.log('slidestop');
					console.log('$curPos = ' + $curPos);

					var	$sld = $m.s.sld, // get slider reference from settings...
						$sldPos = {
							//curPos : $curPos;
							newPos : $curPos // NEW handle position
						},
						$val = null;

					if($curPos <= 150){

						console.log('-- reset at position 1 --');

						$val = 100;


					}else if($curPos > 150 && $curPos < 250){

						console.log('-- reset at position 2 --');
						
						$val = 200;

					}else{

						console.log('-- reset at position 3 --');
						
						$val = 300;

					}

					TweenMax.to($sldPos, 0.5, {newPos : $val, onUpdate: logData});

					function logData(){
						console.log('$sldPos.newPos = ' + $sldPos.newPos);

						$sld.slider('value', $sldPos.newPos);
					}

				}, // end of slidestop fnc

				mouseenter : function(){

					console.log('mouseenter');

				}, // end of mouseenter fnc

				mouseleave : function(){

					console.log('mouseleave');

				} // end of mouseleave fnc

			} // end of sld obj

		} // end of uiAct obj



	}; // end of $m obj (the module container)

	(function(){

		$m.init(); // initialise module...

	})(); // end of anonymas function

}); // end of document.ready

/*
	// ------------------------------------------------------>

	var $data = {
		'left' : 200
	};

	$('h1').on('click', function(){

		TweenMax.to($data, 2, {'left' : 300, onUpdate: logData});

	});

	function logData(){
		console.log('$data.left = ' + $data.left);

		$sld.slider('value', $data.left);
	}










	// ------------------------------------------------------>

	var $sld = $('.slider'), // the slider container
		$sldHnd = $sld.find('a'); // slider handle

	$sld.slider({
		range: 'min',
		value: 200,
		min: 100,
		max: 300,
		animate: 'true',
		slide: function( event, ui ) {
			console.log('current loc = ' + ui.value);
			//$sldPos = ui.value;
		}
	}).on( "slidestop", function( event, ui ) {

		var $curPos = $sld.slider('value'), // CURRENT handle position
			$newPos = null; // NEW handle position

		if($curPos <= 150){

			console.log('-- reset at position 1 --');

			$newPos = 100;


		}else if($curPos > 150 && $curPos < 250){

			console.log('-- reset at position 2 --');
			
			$newPos = 200;

		}else{

			console.log('-- reset at position 3 --');
			
			$newPos = 300;

		}

	});
*/

/*
	function tweenMe($newPos){

		var $curPos = parseInt($sld.slider('value'), 10),
			$step = 50, // animation steps
			$inc = 1; // positive or negitive increment?

		if($curPos > $newPos){

			$inc = -1;

		}

		console.log(typeof($curPos));

		if($curPos !== $newPos){

			$sld.slider('value', $curPos + ($step * $inc));

			console.log('tweening! >>> cur pos = ' + ($curPos + ($step * $inc)));

			//tweenMe($newPos);
		
		}else{

			return ''; // break function...
		}


	}
*/

/*
	.on('mouseup', function(){
		console.log('mouseup!');

		$sldPos = $sld.slider('option', 'value');

		console.log('{ val = ' + $sldPos + '}');

		if($sldPos <= 150){

			console.log('-- reset at position 1 --');

			// have greensock tween the value!
			$sld.slider({value: 100});

		}else if($sldPos > 150 && $sldPos < 250){

			console.log('-- reset at position 2 --');
			
			// have greensock tween the value!
			$sld.slider({value: 200});

		}else{

			console.log('-- reset at position 3 --');
			
			// have greensock tween the value!
			$sld.slider({value: 300});

		}
	});
*/


/*
	$sld.slider({
		min: 1,
		max: 3,
		create: function( event, ui ) {
			// ???
		},
		slide: function( event, ui ) {
			console.log('current loc = ' + ui.value);
		}
	});
*/